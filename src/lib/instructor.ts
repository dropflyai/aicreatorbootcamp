import { createClient } from '@/lib/supabase/server'

/**
 * Check if the current authenticated user is an instructor in any class.
 * Returns the class they instruct, or null if they are not an instructor.
 */
export async function getInstructorClass() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('class_members')
    .select(`
      role,
      class:classes(*)
    `)
    .eq('user_id', user.id)
    .eq('role', 'instructor')
    .single()

  if (!data || data.role !== 'instructor') return null
  return (Array.isArray(data.class) ? data.class[0] : data.class) as Record<string, unknown> | null
}

/**
 * Check if a given userId is an instructor in any class.
 */
export async function isInstructor(userId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('class_members')
    .select('id')
    .eq('user_id', userId)
    .eq('role', 'instructor')
    .limit(1)
    .single()

  return !!data
}
