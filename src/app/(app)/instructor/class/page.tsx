import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Users, BookOpen, Hash, Calendar, ArrowRight, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'

async function getClassData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

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
    description?: string
    start_date?: string
    end_date?: string
    created_at: string
  } | null

  if (!classData) return { classData: null, studentCount: 0 }

  const { count: studentCount } = await supabase
    .from('class_members')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', classData.id)
    .eq('role', 'student')

  return { classData, studentCount: studentCount || 0 }
}

export default async function ClassSettingsPage() {
  const { classData, studentCount } = await getClassData()

  async function advanceWeek() {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: membership } = await supabase
      .from('class_members')
      .select('class_id')
      .eq('user_id', user.id)
      .eq('role', 'instructor')
      .single()

    if (!membership) return

    // Get current week first
    const { data: cls } = await supabase
      .from('classes')
      .select('current_week')
      .eq('id', membership.class_id)
      .single()

    if (!cls || cls.current_week >= 10) return

    await supabase
      .from('classes')
      .update({ current_week: cls.current_week + 1 })
      .eq('id', membership.class_id)

    revalidatePath('/instructor/class')
    revalidatePath('/instructor')
  }

  if (!classData) {
    return (
      <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">No class found.</p>
          <Link href="/instructor" className="text-[#BFFF00] hover:underline text-sm">
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  const isLastWeek = classData.current_week >= 10

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold">Class Settings</span>
          <span className="text-xs text-[#BFFF00] bg-[#BFFF00]/10 px-2 py-1 rounded-full font-mono">INSTRUCTOR</span>
        </div>
      </header>

      <main className="px-4 py-6 lg:px-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Link href="/instructor" className="text-white/40 hover:text-white/70 text-sm transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-white/30" />
          <span className="text-sm text-white/70">Class Settings</span>
        </div>
        <div className="flex items-center justify-between mb-8 mt-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{classData.name}</h1>
              <span className="text-xs text-[#BFFF00] bg-[#BFFF00]/10 px-2 py-1 rounded-full font-mono hidden lg:inline">INSTRUCTOR</span>
            </div>
            <p className="text-white/50">Manage your class details and progress</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Week Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#BFFF00]" />
                Current Week
              </CardTitle>
              <CardDescription>Advance the class to the next week when ready</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-bold text-[#BFFF00] mb-1">
                    Week {classData.current_week}
                  </div>
                  <p className="text-white/50 text-sm">of 10 weeks</p>
                  {/* Progress bar */}
                  <div className="mt-4 w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#BFFF00] rounded-full transition-all duration-500"
                      style={{ width: `${(classData.current_week / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <form action={advanceWeek}>
                  <button
                    type="submit"
                    disabled={isLastWeek}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                      isLastWeek
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90 active:scale-95'
                    }`}
                  >
                    {isLastWeek ? (
                      'Course Complete'
                    ) : (
                      <>
                        Advance to Week {classData.current_week + 1}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
              {!isLastWeek && (
                <p className="text-white/30 text-xs mt-4">
                  This will move all students to Week {classData.current_week + 1}. This action cannot be undone.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Class Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Class Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Hash className="w-4 h-4 text-blue-400" />
                  Class Code
                </CardTitle>
                <CardDescription>Share this code so students can join</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="font-mono text-2xl font-bold text-white tracking-wider bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-1 text-center">
                    {classData.code}
                  </div>
                </div>
                <p className="text-white/30 text-xs mt-3 text-center">
                  Students enter this at signup or join page
                </p>
              </CardContent>
            </Card>

            {/* Student Count */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="w-4 h-4 text-purple-400" />
                  Enrollment
                </CardTitle>
                <CardDescription>Students currently in your class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-white mb-1">{studentCount}</div>
                <p className="text-white/50 text-sm">
                  {studentCount === 1 ? 'student enrolled' : 'students enrolled'}
                </p>
                <Link
                  href="/instructor/students"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-[#BFFF00] hover:underline"
                >
                  View all students
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Class Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                Class Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <dt className="text-sm text-white/50">Class Name</dt>
                  <dd className="text-sm font-medium text-white">{classData.name}</dd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <dt className="text-sm text-white/50">Class Code</dt>
                  <dd className="text-sm font-mono font-medium text-white">{classData.code}</dd>
                </div>
                {classData.description && (
                  <div className="flex items-start justify-between py-2 border-b border-white/5 gap-4">
                    <dt className="text-sm text-white/50 flex-shrink-0">Description</dt>
                    <dd className="text-sm text-white/80 text-right">{classData.description}</dd>
                  </div>
                )}
                {classData.start_date && (
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <dt className="text-sm text-white/50">Start Date</dt>
                    <dd className="text-sm font-medium text-white">
                      {new Date(classData.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </dd>
                  </div>
                )}
                {classData.end_date && (
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <dt className="text-sm text-white/50">End Date</dt>
                    <dd className="text-sm font-medium text-white">
                      {new Date(classData.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <dt className="text-sm text-white/50">Created</dt>
                  <dd className="text-sm font-medium text-white">
                    {new Date(classData.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
