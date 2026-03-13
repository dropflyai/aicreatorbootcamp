import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check instructor role
  const { data: membership } = await supabase
    .from('class_members')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'instructor')
    .limit(1)
    .single()

  if (!membership) {
    redirect('/home')
  }

  return <>{children}</>
}
