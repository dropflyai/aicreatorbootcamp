import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendFeedbackNotification } from '@/lib/email'
import { checkAndAwardBadges } from '@/lib/badges'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { projectId, warmCategory, warmQuality, warmReason, coolSuggestion } = body as {
    projectId?: string
    warmCategory?: string
    warmQuality?: string
    warmReason?: string
    coolSuggestion?: string
  }

  if (!projectId) {
    return NextResponse.json({ error: 'Missing projectId' }, { status: 400 })
  }

  // Limit text field lengths to prevent abuse
  if ((warmReason && warmReason.length > 1000) || (coolSuggestion && coolSuggestion.length > 1000)) {
    return NextResponse.json({ error: 'Feedback text too long (max 1000 chars)' }, { status: 400 })
  }

  // Insert feedback
  const { error: feedbackError } = await supabase
    .from('feedback')
    .insert({
      project_id: projectId,
      author_id: user.id,
      warm_category: warmCategory,
      warm_quality: warmQuality,
      warm_reason: warmReason,
      cool_suggestion: coolSuggestion,
    })

  if (feedbackError) {
    return NextResponse.json({ error: feedbackError.message }, { status: 500 })
  }

  // Increment feedback_count on project
  const { data: projectData } = await supabase.from('projects').select('feedback_count').eq('id', projectId).single()
  if (projectData) {
    await supabase.from('projects').update({ feedback_count: (projectData.feedback_count || 0) + 1 }).eq('id', projectId)
  }

  // Award XP to feedback giver
  await supabase.rpc('award_xp', {
    p_user_id: user.id,
    p_amount: 10,
    p_source: 'feedback_given',
    p_reference_id: null,
  })

  // Check and award any newly earned badges to the feedback giver (fire-and-forget)
  checkAndAwardBadges(supabase, user.id).catch(() => {})

  // Send email notification to project owner (fire-and-forget)
  supabase
    .from('projects')
    .select('title, user_id, profiles!projects_user_id_fkey(email, name)')
    .eq('id', projectId)
    .single()
    .then(({ data: project }) => {
      if (!project) return

      // Get feedback author name
      supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single()
        .then(({ data: authorProfile }) => {
          const ownerProfile = (Array.isArray(project.profiles) ? project.profiles[0] : project.profiles) as { email: string; name: string } | null
          if (!ownerProfile?.email) return
          // Don't notify if the owner is giving feedback on their own project
          if (project.user_id === user.id) return

          sendFeedbackNotification(
            ownerProfile.email,
            authorProfile?.name ?? 'A classmate',
            project.title,
            warmReason ?? warmQuality ?? warmCategory ?? '',
            coolSuggestion ?? ''
          ).catch((err) => console.error('[feedback] email notification error:', err))
        })
    })

  return NextResponse.json({ success: true })
}
