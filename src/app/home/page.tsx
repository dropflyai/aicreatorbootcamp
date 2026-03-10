import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Play, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { XPBadge, StreakBadge, LevelBadge } from '@/components/ui/badge'

async function getHomeData() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get class membership
  const { data: membership } = await supabase
    .from('class_members')
    .select(`
      class:classes(*)
    `)
    .eq('user_id', user.id)
    .single()

  const classData = membership?.class as { id?: string; current_week?: number } | null

  // Get recent activities
  const { data: activities } = await supabase
    .from('activities')
    .select(`
      *,
      user:profiles(name, avatar_url)
    `)
    .eq('class_id', classData?.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get project count
  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'submitted')

  return {
    profile,
    class: classData,
    activities: activities || [],
    projectCount: projectCount || 0,
  }
}

// XP required for each level
const levelXP = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4500, 5700]

export default async function HomePage() {
  const { profile, class: classData, activities, projectCount } = await getHomeData()

  const currentLevelXP = levelXP[profile?.level - 1] || 0
  const nextLevelXP = levelXP[profile?.level] || levelXP[9]
  const progressToNextLevel = ((profile?.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      {/* Header area for mobile */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/60">
                  {profile?.name?.[0] || '?'}
                </div>
              )}
            </div>
            <span className="text-white/70">Hey {profile?.name?.split(' ')[0]} 👋</span>
          </div>
          <div className="flex items-center gap-2">
            <StreakBadge weeks={profile?.streak_weeks || 0} />
            <XPBadge amount={profile?.xp || 0} />
          </div>
        </div>
      </header>

      <main className="px-4 py-6 lg:px-8 max-w-4xl mx-auto">
        {/* Week Progress */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardDescription>WEEK {classData?.current_week || 1}</CardDescription>
                <CardTitle>Video That Stops the Scroll</CardTitle>
              </div>
              <LevelBadge level={profile?.level || 1} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Progress to Level {(profile?.level || 1) + 1}</span>
                <span>{profile?.xp?.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
              </div>
              <Progress value={progressToNextLevel} variant="xp" />
            </div>
          </CardContent>
        </Card>

        {/* Next Up */}
        <Card variant="featured" className="mb-6">
          <CardHeader>
            <CardDescription>NEXT UP</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-[#BFFF00]" />
              Session 2: Filming & Editing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/60 mb-4">
              Learn phone filming basics, lighting, and CapCut editing essentials.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Users className="w-4 h-4" />
                <span>3/25 classmates have started</span>
              </div>
              <Button size="sm">
                Start
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Challenge */}
        <Card className="mb-6">
          <CardHeader>
            <CardDescription>WEEKLY CHALLENGE</CardDescription>
            <CardTitle>&quot;60-Second Banger&quot;</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/60 mb-4">
              Create a short-form video with a scroll-stopping hook.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40">12/25 submitted</span>
                <span className="text-sm text-white/40">Due: Friday</span>
              </div>
              <Link href="/gallery" className="text-sm text-[#BFFF00] hover:underline">
                View Gallery →
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity: any) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs overflow-hidden flex-shrink-0">
                      {activity.user?.avatar_url ? (
                        <img src={activity.user.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        activity.user?.name?.[0] || '?'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white/60">
                        {activity.activity_type === 'level_up' && (
                          <>🟢 <span className="text-white">{activity.user?.name}</span> just hit Level {activity.data?.level}</>
                        )}
                        {activity.activity_type === 'project_submitted' && (
                          <>✨ <span className="text-white">{activity.user?.name}</span> submitted a new project</>
                        )}
                        {activity.activity_type === 'badge_earned' && (
                          <>🏆 <span className="text-white">{activity.user?.name}</span> earned {activity.data?.badge_name}</>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-center py-8">
                No activity yet. Be the first to do something! 🚀
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
