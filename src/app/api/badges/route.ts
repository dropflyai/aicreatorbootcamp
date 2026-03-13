import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkAndAwardBadges } from '@/lib/badges'

/**
 * POST /api/badges
 *
 * Checks and awards any badges the authenticated user has newly earned.
 * Call this after any milestone event (lesson complete, project submit, etc.).
 *
 * Returns:
 *   { awarded: string[] }  — names of badges awarded in this call (may be empty)
 */
export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const awarded = await checkAndAwardBadges(supabase, user.id)

  return NextResponse.json({ awarded })
}
