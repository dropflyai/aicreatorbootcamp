import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { projectId?: string; emoji?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { projectId, emoji } = body

  if (!projectId || !emoji) {
    return NextResponse.json({ error: 'Missing projectId or emoji' }, { status: 400 })
  }

  // Validate emoji is a known safe value
  const allowedEmojis = ['🔥', '❤️', '👏', '🎉', '💯', '✨']
  if (!allowedEmojis.includes(emoji)) {
    return NextResponse.json({ error: 'Invalid emoji' }, { status: 400 })
  }

  // Check if reaction already exists
  const { data: existing } = await supabase
    .from('reactions')
    .select('id')
    .eq('project_id', projectId)
    .eq('user_id', user.id)
    .eq('emoji', emoji)
    .single()

  if (existing) {
    // Remove reaction
    await supabase
      .from('reactions')
      .delete()
      .eq('id', existing.id)

    return NextResponse.json({ action: 'removed' })
  } else {
    // Add reaction
    await supabase
      .from('reactions')
      .insert({ project_id: projectId, user_id: user.id, emoji })

    return NextResponse.json({ action: 'added' })
  }
}
