import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { StudentsTable } from './students-table'

async function getStudentsData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get instructor's class
  const { data: membership } = await supabase
    .from('class_members')
    .select(`class:classes(id, name, current_week)`)
    .eq('user_id', user.id)
    .eq('role', 'instructor')
    .single()

  const classData = (Array.isArray(membership?.class) ? membership.class[0] : membership?.class) as { id: string; name: string; current_week: number } | null
  if (!classData) return { classData: null, students: [] }

  // Get all students in class
  const { data: studentMembers } = await supabase
    .from('class_members')
    .select(`
      user_id,
      joined_at,
      profile:profiles(id, name, avatar_url, creator_type, xp, level, streak_weeks, updated_at)
    `)
    .eq('class_id', classData.id)
    .eq('role', 'student')

  if (!studentMembers || studentMembers.length === 0) {
    return { classData, students: [] }
  }

  const studentIds = studentMembers.map((m: any) => m.user_id)

  // Get project counts per student
  const { data: projects } = await supabase
    .from('projects')
    .select('user_id')
    .eq('class_id', classData.id)
    .eq('status', 'submitted')
    .in('user_id', studentIds)

  const projectCountMap: Record<string, number> = {}
  for (const p of projects || []) {
    projectCountMap[p.user_id] = (projectCountMap[p.user_id] || 0) + 1
  }

  // Get lesson completion counts per student
  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('user_id')
    .in('user_id', studentIds)
    .eq('completed', true)

  const lessonCountMap: Record<string, number> = {}
  for (const lp of lessonProgress || []) {
    lessonCountMap[lp.user_id] = (lessonCountMap[lp.user_id] || 0) + 1
  }

  const students = studentMembers.map((m: any) => ({
    ...m.profile,
    joined_at: m.joined_at,
    projects_submitted: projectCountMap[m.user_id] || 0,
    lessons_completed: lessonCountMap[m.user_id] || 0,
  }))

  return { classData, students }
}

export default async function StudentsPage() {
  const { classData, students } = await getStudentsData()

  if (!classData) {
    return (
      <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64 flex items-center justify-center">
        <p className="text-white/60">No class found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold">Students</span>
          <span className="text-xs text-[#BFFF00] bg-[#BFFF00]/10 px-2 py-1 rounded-full font-mono">INSTRUCTOR</span>
        </div>
      </header>

      <main className="px-4 py-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Students</h1>
            <p className="text-white/50">{classData.name} &middot; {students.length} enrolled</p>
          </div>
        </div>

        <StudentsTable students={students} classCurrentWeek={classData.current_week} />
      </main>
    </div>
  )
}
