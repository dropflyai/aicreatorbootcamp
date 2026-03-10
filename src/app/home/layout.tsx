import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/layout/sidebar'
import { BottomNav } from '@/components/layout/bottom-nav'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <>
      <Sidebar
        user={profile ? {
          name: profile.name || 'Creator',
          avatar_url: profile.avatar_url,
          level: profile.level || 1,
          xp: profile.xp || 0,
          streak_weeks: profile.streak_weeks || 0,
        } : undefined}
      />
      {children}
      <BottomNav />
    </>
  )
}
