import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, FolderOpen, Trophy, Settings, BookOpen, TrendingUp, Clock, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

async function getInstructorDashboardData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get instructor's class
  const { data: membership } = await supabase
    .from('class_members')
    .select(`class:classes(*)`)
    .eq('user_id', user.id)
    .eq('role', 'instructor')
    .single()

  const classData = (Array.isArray(membership?.class) ? membership.class[0] : membership?.class) as {
    id: string
    name: string
    code: string
    current_week: number
    start_date?: string
    end_date?: string
  } | null

  if (!classData) return { classData: null, stats: null, recentProjects: [], profile: null }

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, avatar_url')
    .eq('id', user.id)
    .single()

  // Get total students
  const { count: studentCount } = await supabase
    .from('class_members')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', classData.id)
    .eq('role', 'student')

  // Get all student user_ids
  const { data: studentMembers } = await supabase
    .from('class_members')
    .select('user_id')
    .eq('class_id', classData.id)
    .eq('role', 'student')

  const studentIds = (studentMembers || []).map((m: { user_id: string }) => m.user_id)

  // Get avg XP
  let avgXP = 0
  if (studentIds.length > 0) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('xp')
      .in('id', studentIds)
    if (profiles && profiles.length > 0) {
      avgXP = Math.round(profiles.reduce((sum: number, p: { xp: number }) => sum + (p.xp || 0), 0) / profiles.length)
    }
  }

  // Get submitted projects count
  const { count: submittedCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', classData.id)
    .eq('status', 'submitted')

  // Get projects pending feedback (no feedback yet)
  const { data: recentProjects } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      project_type,
      submitted_at,
      feedback_count,
      week,
      user:profiles!projects_user_id_fkey(name, avatar_url)
    `)
    .eq('class_id', classData.id)
    .eq('status', 'submitted')
    .order('submitted_at', { ascending: false })
    .limit(5)

  // Active this week (submitted in last 7 days)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const { count: activeCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', classData.id)
    .gte('submitted_at', oneWeekAgo.toISOString())

  return {
    classData,
    profile,
    stats: {
      studentCount: studentCount || 0,
      avgXP,
      submittedCount: submittedCount || 0,
      activeCount: activeCount || 0,
    },
    recentProjects: recentProjects || [],
  }
}

const quickLinks = [
  { href: '/instructor/students', icon: Users, label: 'Students', description: 'View all students & progress' },
  { href: '/gallery', icon: FolderOpen, label: 'Projects', description: 'Review submissions in gallery' },
  { href: '/challenges', icon: Trophy, label: 'Challenges', description: 'View weekly challenges' },
  { href: '/instructor/class', icon: Settings, label: 'Class Settings', description: 'Edit class details' },
]

export default async function InstructorDashboard() {
  const { classData, stats, recentProjects, profile } = await getInstructorDashboardData()

  if (!classData || !stats) {
    return (
      <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">No class found. Create a class to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold">Instructor Panel</span>
          <span className="text-xs text-[#BFFF00] bg-[#BFFF00]/10 px-2 py-1 rounded-full font-mono">INSTRUCTOR</span>
        </div>
      </header>

      <main className="px-4 py-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
              <span className="text-xs text-[#BFFF00] bg-[#BFFF00]/10 px-2 py-1 rounded-full font-mono hidden lg:inline">INSTRUCTOR</span>
            </div>
            <p className="text-white/50">{classData.name} &middot; Week {classData.current_week} of 10</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.studentCount}</div>
              <div className="text-sm text-white/50">Total Students</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#BFFF00]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#BFFF00]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.avgXP.toLocaleString()}</div>
              <div className="text-sm text-white/50">Avg XP</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.submittedCount}</div>
              <div className="text-sm text-white/50">Projects Submitted</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.activeCount}</div>
              <div className="text-sm text-white/50">Active This Week</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Submissions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#BFFF00]" />
                    Recent Submissions
                  </CardTitle>
                  <Link href="/gallery" className="text-sm text-[#BFFF00] hover:underline">
                    View all →
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {recentProjects.length > 0 ? (
                  <div className="space-y-4">
                    {recentProjects.map((project: any) => (
                      <div key={project.id} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {(project.user?.name?.[0] || '?').toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{project.title}</p>
                          <p className="text-xs text-white/40">
                            {project.user?.name} &middot; Week {project.week} &middot; {project.feedback_count} feedback
                          </p>
                        </div>
                        {project.feedback_count === 0 && (
                          <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                            Needs feedback
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/40 text-center py-8">No submissions yet this week.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#BFFF00]" />
                  Current Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-[#BFFF00] mb-1">Week {classData.current_week}</div>
                <p className="text-white/50 text-sm">of 10</p>
                <Link
                  href="/instructor/class"
                  className="mt-3 block text-center text-sm text-white/60 bg-white/5 hover:bg-white/10 transition-colors rounded-lg px-3 py-2"
                >
                  Advance week →
                </Link>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {quickLinks.map(({ href, icon: Icon, label, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#161616] border border-white/5 hover:border-white/20 hover:bg-[#1A1A1A] transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#BFFF00]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#BFFF00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-white/40 truncate">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
