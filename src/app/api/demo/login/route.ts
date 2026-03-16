import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { DEMO_MODE, DEMO_CREDENTIALS, DEMO_CLASS } from '@/lib/demo'

/**
 * Demo Login API Route
 *
 * This route handles demo user creation and authentication.
 * Only works when NEXT_PUBLIC_DEMO_MODE=true
 *
 * POST /api/demo/login
 *
 * Returns: { success: true, redirect: '/home' } or { error: string }
 */
export async function POST() {
  // Check if demo mode is enabled
  if (!DEMO_MODE) {
    return NextResponse.json(
      { error: 'Demo mode is not enabled' },
      { status: 403 }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  // Use service role client to create/manage demo user
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    let userId: string
    let userCreated = false

    // Try to create demo user - this is idempotent
    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email: DEMO_CREDENTIALS.email,
        password: DEMO_CREDENTIALS.password,
        email_confirm: true,
        user_metadata: {
          name: DEMO_CREDENTIALS.name,
        },
      })

    if (createError) {
      // If user already exists, that's fine - get their ID
      if (createError.code === 'email_exists') {
        // User exists, get by email
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
        const demoUser = existingUsers?.users?.find(
          (u) => u.email === DEMO_CREDENTIALS.email
        )

        if (demoUser) {
          userId = demoUser.id
        } else {
          // Fallback: user likely exists, return success
          return NextResponse.json({
            success: true,
            message: 'Demo login successful',
          })
        }
      } else {
        console.error('Error creating demo user:', createError)
        return NextResponse.json(
          { error: 'Failed to create demo user' },
          { status: 500 }
        )
      }
    } else {
      userId = newUser.user.id
      userCreated = true
    }

    // Only setup class membership for newly created users
    if (userCreated) {

      // Ensure demo class exists
      const { data: existingClass } = await supabaseAdmin
        .from('classes')
        .select('id')
        .eq('code', DEMO_CLASS.code)
        .single()

      let classId: string | undefined

      if (!existingClass) {
        // Create demo class
        const { data: newClass, error: classError } = await supabaseAdmin
          .from('classes')
          .insert({
            name: DEMO_CLASS.name,
            code: DEMO_CLASS.code,
            current_week: 1,
          })
          .select('id')
          .single()

        if (classError) {
          console.error('Error creating demo class:', classError)
        } else {
          classId = newClass.id
        }
      } else {
        classId = existingClass.id
      }

      // Add demo user to demo class
      if (classId) {
        await supabaseAdmin.from('class_members').upsert(
          {
            class_id: classId,
            user_id: userId,
            role: 'student',
          },
          { onConflict: 'class_id,user_id' }
        )
      }

      // Mark onboarding as complete for demo user
      await supabaseAdmin
        .from('profiles')
        .update({
          onboarding_complete: true,
          creator_type: 'explorer',
          interests: ['video', 'content'],
        })
        .eq('id', userId)
    }

    // Return success - client will use local credentials to sign in
    return NextResponse.json({
      success: true,
      message: 'Demo login successful',
    })
  } catch (error) {
    console.error('Demo login error:', error)
    return NextResponse.json(
      { error: 'Failed to setup demo user' },
      { status: 500 }
    )
  }
}
