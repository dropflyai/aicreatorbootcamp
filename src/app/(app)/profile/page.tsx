import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Settings, Award, Flame, Star, ChevronRight, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LevelBadge } from '@/components/ui/badge'

const levelXP = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4500, 5700]

async function getProfileData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: badges } = await supabase
    .from('user_badges')
    .select(`
      *,
      badge:badges(*)
    `)
    .eq('user_id', user.id)

  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'submitted')

  const { data: recentXP } = await supabase
    .from('xp_transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return {
    profile,
    badges: badges || [],
    projectCount: projectCount || 0,
    recentXP: recentXP || [],
  }
}

export default async function ProfilePage() {
  const { profile, badges, projectCount, recentXP } = await getProfileData()

  const currentLevelXP = levelXP[profile?.level - 1] || 0
  const nextLevelXP = levelXP[profile?.level] || levelXP[9]
  const progressToNextLevel = ((profile?.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Link href="/profile/settings" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5 text-white/60" />
          </Link>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {profile?.name?.[0] || '?'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profile?.name}</h2>
                <p className="text-white/60 capitalize">The {profile?.creator_type || 'Creator'}</p>
                <div className="flex items-center gap-3 mt-2">
                  <LevelBadge level={profile?.level || 1} />
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Level {profile?.level || 1}</span>
                <span>{profile?.xp?.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
              </div>
              <Progress value={progressToNextLevel} variant="xp" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-[#BFFF00]">{profile?.xp || 0}</div>
                <div className="text-xs text-white/60 mt-1">Total XP</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold">{profile?.streak_weeks || 0}</div>
                <div className="text-xs text-white/60 mt-1">Week Streak</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold">{projectCount}</div>
                <div className="text-xs text-white/60 mt-1">Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#BFFF00]" />
                Badges
              </CardTitle>
              <span className="text-sm text-white/40">{badges.length} earned</span>
            </div>
          </CardHeader>
          <CardContent>
            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {badges.map((userBadge: any) => (
                  <div
                    key={userBadge.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5"
                    title={userBadge.badge?.description}
                  >
                    <span className="text-xl">{userBadge.badge?.icon}</span>
                    <span className="text-sm">{userBadge.badge?.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-center py-4">
                Complete challenges to earn badges!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent XP */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#BFFF00]" />
              Recent XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentXP.length > 0 ? (
              <div className="space-y-3">
                {recentXP.map((tx: any) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#BFFF00]/10 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-[#BFFF00]" />
                      </div>
                      <span className="text-sm text-white/80">
                        {tx.source.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </span>
                    </div>
                    <span className="text-[#BFFF00] font-medium">+{tx.amount} XP</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-center py-4">
                Start earning XP by completing lessons!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          <Link
            href="/profile/settings"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-white/60" />
              <span>Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </Link>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-[#FF6B6B]" />
                <span className="text-[#FF6B6B]">Sign Out</span>
              </div>
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
