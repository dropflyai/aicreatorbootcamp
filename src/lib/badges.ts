/**
 * Badge awarding utility
 *
 * Called after key milestone events to check and award any newly earned badges.
 * Uses server-side Supabase client so it can be called from API routes and
 * server actions.
 */

import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Check all badge criteria for a user and award any that haven't been earned yet.
 *
 * Returns the list of badge names that were newly awarded this call.
 */
export async function checkAndAwardBadges(
  supabase: SupabaseClient,
  userId: string
): Promise<string[]> {
  // Fetch all badge definitions
  const { data: allBadges } = await supabase
    .from('badges')
    .select('id, name, category')

  if (!allBadges || allBadges.length === 0) return []

  // Fetch badges the user already has
  const { data: earned } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedIds = new Set((earned || []).map((e) => e.badge_id))
  const unearnedBadges = allBadges.filter((b) => !earnedIds.has(b.id))

  if (unearnedBadges.length === 0) return []

  // Fetch data needed for criteria evaluation
  const [
    { count: submittedProjectCount },
    { count: feedbackGivenCount },
    { data: completedLessons },
  ] = await Promise.all([
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'submitted'),
    supabase
      .from('feedback')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId),
    supabase
      .from('lesson_progress')
      .select('lesson_id, week')
      .eq('user_id', userId)
      .eq('completed', true),
  ])

  const projectCount = submittedProjectCount ?? 0
  const feedbackCount = feedbackGivenCount ?? 0
  const completedLessonList = completedLessons ?? []

  // Weeks 1-5 have 2 sessions each → 10 lessons total
  const week1to5LessonIds = new Set([
    '1-1', '1-2',
    '2-1', '2-2',
    '3-1', '3-2',
    '4-1', '4-2',
    '5-1', '5-2',
  ])
  const completedInWeeks1to5 = completedLessonList.filter((l) =>
    week1to5LessonIds.has(l.lesson_id)
  ).length
  const completedHalfwayCourse = completedInWeeks1to5 >= 10

  // All 20 lessons (weeks 1-10, 2 sessions each)
  const allLessonIds = new Set([
    '1-1', '1-2',
    '2-1', '2-2',
    '3-1', '3-2',
    '4-1', '4-2',
    '5-1', '5-2',
    '6-1', '6-2',
    '7-1', '7-2',
    '8-1', '8-2',
    '9-1', '9-2',
    '10-1', '10-2',
  ])
  const completedAllLessons =
    completedLessonList.filter((l) => allLessonIds.has(l.lesson_id)).length >= 20

  /**
   * Criteria map — keys must exactly match badge names in the DB.
   * Returns true if the user has met the criteria.
   */
  const criteria: Record<string, () => boolean> = {
    'First Frame': () => projectCount >= 1,
    'Helpful Hand': () => feedbackCount >= 5,
    'Feedback Guru': () => feedbackCount >= 10,
    'Halfway There': () => completedHalfwayCourse,
    'Dedicated Creator': () => completedAllLessons,
  }

  const newlyAwarded: string[] = []

  for (const badge of unearnedBadges) {
    const check = criteria[badge.name]
    if (check && check()) {
      const { error } = await supabase.from('user_badges').insert({
        user_id: userId,
        badge_id: badge.id,
      })
      if (!error) {
        newlyAwarded.push(badge.name)
      }
    }
  }

  return newlyAwarded
}
