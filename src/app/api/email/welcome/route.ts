import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendWelcomeEmail } from '@/lib/email'

// POST /api/email/welcome
// Called after a student successfully signs up and joins a class.
// Body: { classId: string }
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { classId } = await request.json()

  if (!classId) {
    return NextResponse.json({ error: 'Missing classId' }, { status: 400 })
  }

  // Fetch class details and user profile in parallel
  const [classResult, profileResult] = await Promise.all([
    supabase.from('classes').select('name, code').eq('id', classId).single(),
    supabase.from('profiles').select('name, email').eq('id', user.id).single(),
  ])

  const classData = classResult.data
  const profileData = profileResult.data

  if (!classData || !profileData?.email) {
    // Not enough data to send — return success anyway so signup isn't blocked
    return NextResponse.json({ success: true })
  }

  await sendWelcomeEmail(
    profileData.email,
    profileData.name ?? user.email ?? 'Creator',
    classData.name,
    classData.code
  )

  return NextResponse.json({ success: true })
}
