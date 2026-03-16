-- Security fixes for AI Creator Bootcamp
-- This app handles data for minors — all fixes are critical.

-- Fix 1: Restrict profile visibility to classmates only
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Classmates can view profiles"
ON profiles FOR SELECT TO authenticated
USING (
  id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM class_members cm1
    JOIN class_members cm2 ON cm1.class_id = cm2.class_id
    WHERE cm1.user_id = auth.uid() AND cm2.user_id = profiles.id
  )
);

-- Fix 2: Remove "Anyone can view classes by code" — too permissive
DROP POLICY IF EXISTS "Anyone can view classes by code" ON classes;
-- Allow lookup by code for joining (server-side validated)
CREATE POLICY "Authenticated users can view classes they belong to or by code lookup"
ON classes FOR SELECT TO authenticated
USING (
  instructor_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM class_members
    WHERE class_members.class_id = classes.id
    AND class_members.user_id = auth.uid()
  )
);
-- Service role can look up classes by code for join flow
CREATE POLICY "Service role full access to classes"
ON classes FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- Fix 3: Restrict class_members role to student only on insert
DROP POLICY IF EXISTS "Users can join classes" ON class_members;
CREATE POLICY "Users can join classes as student only"
ON class_members FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND role = 'student');

-- Fix 4: Add CHECK constraint on role column
ALTER TABLE class_members DROP CONSTRAINT IF EXISTS class_members_role_check;
ALTER TABLE class_members ADD CONSTRAINT class_members_role_check CHECK (role IN ('student', 'instructor'));

-- Fix 5: Make storage bucket private
UPDATE storage.buckets SET public = false WHERE id = 'project-media';

-- Fix 6: Restrict award_xp to self only
CREATE OR REPLACE FUNCTION public.award_xp(
  p_user_id uuid,
  p_amount integer,
  p_source text,
  p_reference_id uuid default null
)
RETURNS void AS $$
BEGIN
  -- Only allow awarding XP to self (unless called by service_role)
  IF p_user_id != auth.uid() AND current_setting('role') != 'service_role' THEN
    RAISE EXCEPTION 'Cannot award XP to other users';
  END IF;

  INSERT INTO xp_transactions (user_id, amount, source, reference_id)
  VALUES (p_user_id, p_amount, p_source, p_reference_id);

  UPDATE profiles
  SET
    xp = xp + p_amount,
    level = CASE
      WHEN xp + p_amount >= 5700 THEN 10
      WHEN xp + p_amount >= 4500 THEN 9
      WHEN xp + p_amount >= 3500 THEN 8
      WHEN xp + p_amount >= 2700 THEN 7
      WHEN xp + p_amount >= 2000 THEN 6
      WHEN xp + p_amount >= 1400 THEN 5
      WHEN xp + p_amount >= 900 THEN 4
      WHEN xp + p_amount >= 500 THEN 3
      WHEN xp + p_amount >= 200 THEN 2
      ELSE 1
    END,
    updated_at = now()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
