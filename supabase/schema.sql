-- ============================================
-- AI CREATOR BOOTCAMP — DATABASE SCHEMA
-- ============================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  username text unique,
  avatar_url text,
  bio text,
  accent_color text default '#BFFF00',
  creator_type text, -- 'entertainer', 'educator', 'storyteller'
  level integer default 1,
  xp integer default 0,
  streak_weeks integer default 0,
  streak_last_active date,
  streak_freeze_available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- CLASSES
-- ============================================

create table public.classes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  code text unique not null, -- join code like 'ABC-123-XYZ'
  instructor_id uuid references public.profiles(id),
  description text,
  start_date date,
  end_date date,
  current_week integer default 1,
  created_at timestamptz default now()
);

alter table public.classes enable row level security;

create policy "Classes are viewable by members"
  on classes for select using (
    exists (
      select 1 from class_members
      where class_members.class_id = classes.id
      and class_members.user_id = auth.uid()
    )
    or instructor_id = auth.uid()
  );

create policy "Instructors can create classes"
  on classes for insert with check (instructor_id = auth.uid());

create policy "Instructors can update their classes"
  on classes for update using (instructor_id = auth.uid());

-- ============================================
-- CLASS MEMBERS
-- ============================================

create table public.class_members (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references public.classes(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text default 'student', -- 'student', 'instructor', 'ta'
  joined_at timestamptz default now(),
  unique(class_id, user_id)
);

alter table public.class_members enable row level security;

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

-- ============================================
-- PROJECTS
-- ============================================

create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  week integer not null,
  title text not null,
  description text,
  media_url text,
  media_type text, -- 'video', 'image'
  thumbnail_url text,
  visibility text default 'class', -- 'class', 'public'

  -- Self assessment
  self_rating_hook integer,
  self_rating_pacing integer,
  self_rating_technical integer,
  self_improvement_notes text,

  -- Techniques used
  techniques text[], -- array of technique tags

  status text default 'draft', -- 'draft', 'submitted', 'featured'
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.projects enable row level security;

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

-- ============================================
-- REACTIONS
-- ============================================

create table public.reactions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  reaction_type text not null, -- 'learned', 'inspired', 'progress', 'bold', 'clean'
  created_at timestamptz default now(),
  unique(project_id, user_id, reaction_type)
);

alter table public.reactions enable row level security;

create policy "Users can view reactions"
  on reactions for select using (true);

create policy "Users can add reactions"
  on reactions for insert with check (user_id = auth.uid());

create policy "Users can remove own reactions"
  on reactions for delete using (user_id = auth.uid());

-- ============================================
-- FEEDBACK
-- ============================================

create table public.feedback (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete cascade,

  -- Structured feedback
  warm_category text, -- 'lighting', 'pacing', 'hook', 'audio', etc.
  warm_quality text, -- 'effective', 'creative', 'clear', etc.
  warm_reason text,

  cool_suggestion text, -- optional

  created_at timestamptz default now()
);

alter table public.feedback enable row level security;

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

-- ============================================
-- XP TRANSACTIONS
-- ============================================

create table public.xp_transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  amount integer not null,
  reason text not null, -- 'project_submitted', 'feedback_given', 'challenge_completed', etc.
  reference_id uuid, -- optional reference to related entity
  created_at timestamptz default now()
);

alter table public.xp_transactions enable row level security;

create policy "Users can view own XP transactions"
  on xp_transactions for select using (user_id = auth.uid());

-- Function to award XP
create or replace function public.award_xp(
  p_user_id uuid,
  p_amount integer,
  p_reason text,
  p_reference_id uuid default null
)
returns void as $$
begin
  -- Insert transaction
  insert into xp_transactions (user_id, amount, reason, reference_id)
  values (p_user_id, p_amount, p_reason, p_reference_id);

  -- Update profile
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
-- BADGES
-- ============================================

create table public.badges (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text,
  icon text,
  category text, -- 'skill', 'character', 'milestone', 'hidden'
  criteria jsonb -- flexible criteria definition
);

create table public.user_badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  badge_id uuid references public.badges(id) on delete cascade,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

create policy "Anyone can view badges"
  on badges for select using (true);

create policy "Users can view earned badges"
  on user_badges for select using (true);

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
  ('Dedicated Creator', 'Maintained streak for entire course', 'flame', 'milestone');

-- ============================================
-- CHALLENGES
-- ============================================

create table public.challenges (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references public.classes(id) on delete cascade,
  title text not null,
  description text,
  requirements jsonb,
  xp_reward integer default 150,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz default now()
);

alter table public.challenges enable row level security;

create policy "Class members can view challenges"
  on challenges for select using (
    exists (
      select 1 from class_members
      where class_members.class_id = challenges.class_id
      and class_members.user_id = auth.uid()
    )
  );

-- ============================================
-- LESSON PROGRESS
-- ============================================

create table public.lesson_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  week integer not null,
  session integer not null,
  segment integer default 0, -- for tracking progress within a session
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, week, session)
);

alter table public.lesson_progress enable row level security;

create policy "Users can view own progress"
  on lesson_progress for select using (user_id = auth.uid());

create policy "Users can update own progress"
  on lesson_progress for insert with check (user_id = auth.uid());

create policy "Users can update own progress"
  on lesson_progress for update using (user_id = auth.uid());

-- ============================================
-- ACTIVITY FEED
-- ============================================

create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references public.classes(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  activity_type text not null, -- 'level_up', 'badge_earned', 'project_submitted', 'feedback_given'
  data jsonb, -- flexible data for the activity
  created_at timestamptz default now()
);

alter table public.activities enable row level security;

create policy "Class members can view activities"
  on activities for select using (
    exists (
      select 1 from class_members
      where class_members.class_id = activities.class_id
      and class_members.user_id = auth.uid()
    )
  );

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

create index idx_projects_class_id on projects(class_id);
create index idx_projects_user_id on projects(user_id);
create index idx_projects_week on projects(week);
create index idx_feedback_project_id on feedback(project_id);
create index idx_reactions_project_id on reactions(project_id);
create index idx_activities_class_id on activities(class_id);
create index idx_activities_created_at on activities(created_at desc);
create index idx_class_members_user_id on class_members(user_id);
create index idx_xp_transactions_user_id on xp_transactions(user_id);
