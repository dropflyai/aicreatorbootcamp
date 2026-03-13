-- Allow authenticated users to insert their own activities
create policy "Users can insert own activities"
  on activities for insert with check (user_id = auth.uid());
