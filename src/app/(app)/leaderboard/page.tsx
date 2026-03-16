import { redirect } from 'next/navigation'
import { Trophy } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { LeaderboardList } from '@/components/leaderboard/leaderboard-list'

async function getLeaderboardData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get user's class membership
  const { data: membership } = await supabase
    .from('class_members')
    .select('class:classes(*)')
    .eq('user_id', user.id)
    .single()

  const classData = (Array.isArray(membership?.class) ? membership.class[0] : membership?.class) as { id?: string; name?: string } | null
  const classId = classData?.id
  const className = classData?.name || 'Your Class'

  if (!classId) {
    return { entries: [], currentUserId: user.id, className }
  }

  // Get all class members with their profiles
  const { data: members } = await supabase
    .from('class_members')
    .select('user_id, user:profiles(id, name, avatar_url, level, xp)')
    .eq('class_id', classId)

  // Get badge counts for all members
  const memberIds = (members || []).map((m: any) => m.user_id)
  const { data: badgeCounts } = await supabase
    .from('user_badges')
    .select('user_id')
    .in('user_id', memberIds)

  // Count badges per user
  const badgeMap: Record<string, number> = {}
  ;(badgeCounts || []).forEach((b: any) => {
    badgeMap[b.user_id] = (badgeMap[b.user_id] || 0) + 1
  })

  // Build and sort entries
  const entries = (members || [])
    .map((m: any) => {
      const profile = Array.isArray(m.user) ? m.user[0] : m.user
      return {
        userId: m.user_id,
        name: profile?.name || 'Unknown',
        level: profile?.level || 1,
        xp: profile?.xp || 0,
        badgeCount: badgeMap[m.user_id] || 0,
      }
    })
    .sort((a: any, b: any) => b.xp - a.xp)
    .map((entry: any, i: number) => ({ ...entry, rank: i + 1 }))

  return { entries, currentUserId: user.id, className }
}

export default async function LeaderboardPage() {
  const { entries, currentUserId, className } = await getLeaderboardData()

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#BFFF00]" />
              Leaderboard
            </h1>
            <p className="text-white/60">{className}</p>
          </div>
        </div>

        <LeaderboardList entries={entries} currentUserId={currentUserId} />
      </main>
    </div>
  )
}
