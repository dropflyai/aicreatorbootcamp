import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWeeklyProgressEmail } from '@/lib/email'

// POST /api/email/weekly-digest
// Intended to be called by a cron job or scheduled task.
// Requires the Authorization header to contain the service role key:
//   Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey || authHeader !== `Bearer ${serviceRoleKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Fetch all profiles that have onboarding complete (active students)
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email, name, xp, level, streak_weeks')
    .eq('onboarding_complete', true)
    .not('email', 'is', null)

  if (error) {
    console.error('[weekly-digest] Failed to fetch profiles:', error)
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }

  if (!profiles || profiles.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  // Fetch completed lesson counts per user in a single query
  const userIds = profiles.map((p) => p.id)

  const { data: lessonCounts } = await supabase
    .from('lesson_progress')
    .select('user_id')
    .in('user_id', userIds)
    .eq('completed', true)

  const completedByUser: Record<string, number> = {}
  for (const row of lessonCounts ?? []) {
    completedByUser[row.user_id] = (completedByUser[row.user_id] ?? 0) + 1
  }

  // Send emails, collecting errors but not failing fast
  const results = await Promise.allSettled(
    profiles.map((profile) =>
      sendWeeklyProgressEmail(
        profile.email as string,
        profile.name ?? 'Creator',
        profile.xp ?? 0,
        profile.level ?? 1,
        completedByUser[profile.id] ?? 0,
        profile.streak_weeks ?? 0
      )
    )
  )

  const failed = results.filter((r) => r.status === 'rejected').length
  const sent = results.length - failed

  console.log(`[weekly-digest] Sent ${sent}/${results.length} emails (${failed} failed)`)

  return NextResponse.json({ sent, failed, total: results.length })
}
