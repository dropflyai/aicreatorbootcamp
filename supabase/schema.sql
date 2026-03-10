-- ============================================
-- AI CREATOR BOOTCAMP — DATABASE SCHEMA
-- ============================================
-- Using gen_random_uuid() which is built into PostgreSQL 13+

-- ============================================
-- STEP 1: CREATE ALL TABLES
-- ============================================

-- PROFILES (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  username text unique,
  avatar_url text,
  bio text,
  accent_color text default '#BFFF00',
  creator_type text,
  interests text[],
  onboarding_complete boolean default false,
  level integer default 1,
  xp integer default 0,
  streak_weeks integer default 0,
  streak_last_active date,
  streak_freeze_available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CLASSES
create table if not exists public.classes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  code text unique not null,
  instructor_id uuid references public.profiles(id),
  description text,
  start_date date,
  end_date date,
  current_week integer default 1,
  created_at timestamptz default now()
);

-- CLASS MEMBERS
create table if not exists public.class_members (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text default 'student',
  joined_at timestamptz default now(),
  unique(class_id, user_id)
);

-- PROJECTS
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  challenge_id uuid,
  week integer default 1,
  title text not null,
  description text,
  content_url text,
  project_type text,
  media_url text,
  media_type text,
  thumbnail_url text,
  visibility text default 'class',
  self_rating_hook integer,
  self_rating_pacing integer,
  self_rating_technical integer,
  self_improvement_notes text,
  techniques text[],
  status text default 'draft',
  feedback_count integer default 0,
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- REACTIONS
create table if not exists public.reactions (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  emoji text not null,
  reaction_type text,
  created_at timestamptz default now(),
  unique(project_id, user_id, emoji)
);

-- FEEDBACK
create table if not exists public.feedback (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete cascade,
  warm_category text,
  warm_quality text,
  warm_reason text,
  cool_suggestion text,
  created_at timestamptz default now()
);

-- XP TRANSACTIONS
create table if not exists public.xp_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  amount integer not null,
  source text not null,
  reason text,
  reference_id uuid,
  created_at timestamptz default now()
);

-- BADGES
create table if not exists public.badges (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  description text,
  icon text,
  category text,
  criteria jsonb
);

-- USER BADGES
create table if not exists public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  badge_id uuid references public.badges(id) on delete cascade,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- CHALLENGES
create table if not exists public.challenges (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes(id) on delete cascade,
  title text not null,
  description text,
  requirements jsonb,
  xp_reward integer default 150,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz default now()
);

-- LESSON PROGRESS
create table if not exists public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_id text not null,
  week integer not null,
  session integer not null,
  segment integer default 0,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- ACTIVITY FEED
create table if not exists public.activities (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  activity_type text not null,
  data jsonb,
  created_at timestamptz default now()
);

-- ============================================
-- STEP 2: ENABLE RLS ON ALL TABLES
-- ============================================

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.projects enable row level security;
alter table public.reactions enable row level security;
alter table public.feedback enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.challenges enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.activities enable row level security;

-- ============================================
-- STEP 3: CREATE ALL POLICIES
-- ============================================

-- Profile policies
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Classes policies
create policy "Classes are viewable by members"
  on classes for select using (
    exists (
      select 1 from class_members
      where class_members.class_id = classes.id
      and class_members.user_id = auth.uid()
    )
    or instructor_id = auth.uid()
  );

create policy "Anyone can view classes by code"
  on classes for select using (true);

create policy "Instructors can create classes"
  on classes for insert with check (instructor_id = auth.uid() or instructor_id is null);

create policy "Instructors can update their classes"
  on classes for update using (instructor_id = auth.uid());

-- Class members policies
create policy "Members can view their class members"
  on class_members for select using (
    exists (
      select 1 from class_members cm
      where cm.class_id = class_members.class_id
      and cm.user_id = auth.uid()
    )
  );

create policy "Users can join classes"
  on class_members for insert with check (user_id = auth.uid());

-- Projects policies
create policy "Users can view class projects"
  on projects for select using (
    user_id = auth.uid()
    or exists (
      select 1 from class_members
      where class_members.class_id = projects.class_id
      and class_members.user_id = auth.uid()
    )
  );

create policy "Users can create own projects"
  on projects for insert with check (user_id = auth.uid());

create policy "Users can update own projects"
  on projects for update using (user_id = auth.uid());

create policy "Users can delete own projects"
  on projects for delete using (user_id = auth.uid());

-- Reactions policies
create policy "Users can view reactions"
  on reactions for select using (true);

create policy "Users can add reactions"
  on reactions for insert with check (user_id = auth.uid());

create policy "Users can remove own reactions"
  on reactions for delete using (user_id = auth.uid());

-- Feedback policies
create policy "Users can view feedback on accessible projects"
  on feedback for select using (
    exists (
      select 1 from projects
      where projects.id = feedback.project_id
      and (
        projects.user_id = auth.uid()
        or exists (
          select 1 from class_members
          where class_members.class_id = projects.class_id
          and class_members.user_id = auth.uid()
        )
      )
    )
  );

create policy "Users can give feedback"
  on feedback for insert with check (author_id = auth.uid());

-- XP transactions policies
create policy "Users can view own XP transactions"
  on xp_transactions for select using (user_id = auth.uid());

-- Badges policies
create policy "Anyone can view badges"
  on badges for select using (true);

create policy "Users can view earned badges"
  on user_badges for select using (true);

-- Challenges policies
create policy "Class members can view challenges"
  on challenges for select using (
    exists (
      select 1 from class_members
      where class_members.class_id = challenges.class_id
      and class_members.user_id = auth.uid()
    )
  );

-- Lesson progress policies
create policy "Users can view own progress"
  on lesson_progress for select using (user_id = auth.uid());

create policy "Users can insert own progress"
  on lesson_progress for insert with check (user_id = auth.uid());

create policy "Users can update own progress"
  on lesson_progress for update using (user_id = auth.uid());

-- Activities policies
create policy "Class members can view activities"
  on activities for select using (
    exists (
      select 1 from class_members
      where class_members.class_id = activities.class_id
      and class_members.user_id = auth.uid()
    )
  );

-- ============================================
-- STEP 4: CREATE FUNCTIONS AND TRIGGERS
-- ============================================

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to award XP
create or replace function public.award_xp(
  p_user_id uuid,
  p_amount integer,
  p_source text,
  p_reference_id uuid default null
)
returns void as $$
begin
  insert into xp_transactions (user_id, amount, source, reference_id)
  values (p_user_id, p_amount, p_source, p_reference_id);

  update profiles
  set
    xp = xp + p_amount,
    level = case
      when xp + p_amount >= 5700 then 10
      when xp + p_amount >= 4500 then 9
      when xp + p_amount >= 3500 then 8
      when xp + p_amount >= 2700 then 7
      when xp + p_amount >= 2000 then 6
      when xp + p_amount >= 1400 then 5
      when xp + p_amount >= 900 then 4
      when xp + p_amount >= 500 then 3
      when xp + p_amount >= 200 then 2
      else 1
    end,
    updated_at = now()
  where id = p_user_id;
end;
$$ language plpgsql security definer;

-- ============================================
-- STEP 5: INSERT DEFAULT DATA
-- ============================================

-- Insert default badges
insert into badges (name, description, icon, category) values
  ('Lighting Pro', 'Demonstrated mastery of lighting techniques in 3+ projects', 'lightbulb', 'skill'),
  ('Audio Master', 'Clean audio quality rated by 3 peers', 'waveform', 'skill'),
  ('Hook Expert', 'High engagement on 3 hooks', 'magnet', 'skill'),
  ('Edit Wizard', 'Technical editing praised in peer review', 'wand', 'skill'),
  ('Helpful Hand', 'Helped 5 classmates', 'handshake', 'character'),
  ('Feedback Guru', 'Gave 10+ quality reviews', 'message-circle', 'character'),
  ('First Frame', 'Completed first project', 'film', 'milestone'),
  ('Halfway There', 'Completed week 5', 'flag', 'milestone'),
  ('Dedicated Creator', 'Maintained streak for entire course', 'flame', 'milestone')
on conflict (name) do nothing;

-- ============================================
-- DEMO MODE SETUP
-- ============================================
-- Demo Class for testing without requiring signup
-- When NEXT_PUBLIC_DEMO_MODE=true, users can login as demo user
-- Demo credentials: demo@aicreatorbootcamp.test / demo123456
--
-- The demo user is created dynamically via /api/demo/login
-- when someone clicks "Try Demo" button (only if DEMO_MODE is enabled)

-- Insert demo class for development/testing
insert into classes (name, code, current_week, description) values
  ('Demo Class', 'DEMO-2024', 1, 'Demo class for testing the app without signup. Join code: DEMO-2024')
on conflict (code) do nothing;

-- Insert additional test classes for development
insert into classes (name, code, current_week, description) values
  ('Test Class Alpha', 'TEST-ALPHA', 2, 'Test class for development'),
  ('Test Class Beta', 'TEST-BETA', 3, 'Another test class for development')
on conflict (code) do nothing;

-- ============================================
-- STEP 6: CREATE INDEXES
-- ============================================

create index if not exists idx_projects_class_id on projects(class_id);
create index if not exists idx_projects_user_id on projects(user_id);
create index if not exists idx_projects_week on projects(week);
create index if not exists idx_feedback_project_id on feedback(project_id);
create index if not exists idx_reactions_project_id on reactions(project_id);
create index if not exists idx_activities_class_id on activities(class_id);
create index if not exists idx_activities_created_at on activities(created_at desc);
create index if not exists idx_class_members_user_id on class_members(user_id);
create index if not exists idx_xp_transactions_user_id on xp_transactions(user_id);
