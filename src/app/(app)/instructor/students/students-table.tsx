'use client'

import { useState, Fragment } from 'react'
import { ChevronDown, ChevronRight, User, TrendingUp, BookOpen, FolderOpen, Flame } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Student {
  id: string
  name: string
  avatar_url?: string
  creator_type?: string
  xp: number
  level: number
  streak_weeks: number
  projects_submitted: number
  lessons_completed: number
  updated_at?: string
  joined_at?: string
}

interface StudentsTableProps {
  students: Student[]
  classCurrentWeek: number
}

function formatRelativeDate(dateStr?: string) {
  if (!dateStr) return 'Never'
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

function getLevelColor(level: number) {
  if (level >= 8) return 'text-purple-400'
  if (level >= 5) return 'text-blue-400'
  if (level >= 3) return 'text-[#BFFF00]'
  return 'text-white/60'
}

export function StudentsTable({ students, classCurrentWeek }: StudentsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'xp' | 'projects' | 'lessons'>('xp')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  function handleSort(col: typeof sortBy) {
    if (sortBy === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(col)
      setSortDir('desc')
    }
  }

  const sorted = [...students].sort((a, b) => {
    let valA: number | string, valB: number | string
    if (sortBy === 'name') { valA = a.name || ''; valB = b.name || '' }
    else if (sortBy === 'xp') { valA = a.xp; valB = b.xp }
    else if (sortBy === 'projects') { valA = a.projects_submitted; valB = b.projects_submitted }
    else { valA = a.lessons_completed; valB = b.lessons_completed }

    if (typeof valA === 'string') return sortDir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA)
    return sortDir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number)
  })

  function SortHeader({ col, label }: { col: typeof sortBy; label: string }) {
    return (
      <button
        onClick={() => handleSort(col)}
        className={cn(
          'flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors',
          sortBy === col ? 'text-[#BFFF00]' : 'text-white/40 hover:text-white/70'
        )}
      >
        {label}
        {sortBy === col && (
          <ChevronDown className={cn('w-3 h-3 transition-transform', sortDir === 'asc' && 'rotate-180')} />
        )}
      </button>
    )
  }

  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <User className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No students enrolled yet.</p>
          <p className="text-white/30 text-sm mt-1">Share your class code so students can join.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {/* Table header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4">
                <SortHeader col="name" label="Student" />
              </th>
              <th className="text-left px-4 py-4 hidden md:table-cell">
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">Type</span>
              </th>
              <th className="text-right px-4 py-4">
                <SortHeader col="xp" label="XP" />
              </th>
              <th className="text-right px-4 py-4 hidden sm:table-cell">
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">Level</span>
              </th>
              <th className="text-right px-4 py-4 hidden lg:table-cell">
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">Streak</span>
              </th>
              <th className="text-right px-4 py-4 hidden md:table-cell">
                <SortHeader col="projects" label="Projects" />
              </th>
              <th className="text-right px-4 py-4 hidden lg:table-cell">
                <SortHeader col="lessons" label="Lessons" />
              </th>
              <th className="text-right px-4 py-4 hidden xl:table-cell">
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">Last Active</span>
              </th>
              <th className="px-4 py-4 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((student) => (
              <Fragment key={student.id}>
                <tr
                  onClick={() => setExpandedId(expandedId === student.id ? null : student.id)}
                  className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors">

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium flex-shrink-0 overflow-hidden">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          (student.name?.[0] || '?').toUpperCase()
                        )}
                      </div>
                      <span className="font-medium text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-white/50 capitalize">{student.creator_type || '—'}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-mono text-[#BFFF00] font-medium">{(student.xp || 0).toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-4 text-right hidden sm:table-cell">
                    <span className={cn('text-sm font-medium', getLevelColor(student.level))}>
                      {student.level}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right hidden lg:table-cell">
                    <div className="flex items-center justify-end gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-sm text-white/60">{student.streak_weeks || 0}w</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    <span className="text-sm text-white/70">{student.projects_submitted}</span>
                  </td>
                  <td className="px-4 py-4 text-right hidden lg:table-cell">
                    <span className="text-sm text-white/70">{student.lessons_completed}</span>
                  </td>
                  <td className="px-4 py-4 text-right hidden xl:table-cell">
                    <span className="text-xs text-white/40">{formatRelativeDate(student.updated_at)}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 text-white/30 transition-transform ml-auto',
                        expandedId === student.id && 'rotate-90 text-[#BFFF00]'
                      )}
                    />
                  </td>
                </tr>

                {expandedId === student.id && (
                  <tr className="bg-white/[0.015]">
                    <td colSpan={9} className="px-6 py-6">
                      <StudentDetail student={student} classCurrentWeek={classCurrentWeek} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function StudentDetail({ student, classCurrentWeek }: { student: Student; classCurrentWeek: number }) {
  const levelXP = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4500, 5700]
  const currentLevelXP = levelXP[student.level - 1] || 0
  const nextLevelXP = levelXP[student.level] || levelXP[9]
  const progress = Math.round(((student.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-[#BFFF00]" />
          <span className="text-xs text-white/50 uppercase tracking-wider">XP Progress</span>
        </div>
        <div className="text-2xl font-bold text-[#BFFF00] mb-1">{(student.xp || 0).toLocaleString()}</div>
        <div className="text-xs text-white/40 mb-2">Level {student.level} → {student.level + 1}</div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#BFFF00] rounded-full transition-all"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <div className="text-xs text-white/30 mt-1">{progress}%</div>
      </div>

      <div className="p-4 rounded-xl bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <FolderOpen className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-white/50 uppercase tracking-wider">Projects</span>
        </div>
        <div className="text-2xl font-bold mb-1">{student.projects_submitted}</div>
        <div className="text-xs text-white/40">submitted</div>
      </div>

      <div className="p-4 rounded-xl bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-white/50 uppercase tracking-wider">Lessons</span>
        </div>
        <div className="text-2xl font-bold mb-1">{student.lessons_completed}</div>
        <div className="text-xs text-white/40">completed</div>
      </div>

      <div className="p-4 rounded-xl bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-white/50 uppercase tracking-wider">Streak</span>
        </div>
        <div className="text-2xl font-bold mb-1">{student.streak_weeks || 0}</div>
        <div className="text-xs text-white/40">weeks</div>
      </div>
    </div>
  )
}
