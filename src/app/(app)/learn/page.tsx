import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Play, Lock, CheckCircle, Clock, Trophy } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const curriculum = [
  {
    week: 1,
    title: 'Video That Stops the Scroll',
    description: 'Master hooks, patterns, and what makes content irresistible',
    sessions: [
      { id: '1-1', title: 'What Makes People Stop Scrolling', duration: '25 min', xp: 50 },
      { id: '1-2', title: 'Filming & Editing Basics', duration: '30 min', xp: 50 },
    ],
    challenge: '60-Second Banger',
  },
  {
    week: 2,
    title: 'Voice & Audio That Vibes',
    description: 'Sound design, voiceovers, and the audio that hooks viewers',
    sessions: [
      { id: '2-1', title: 'Audio Fundamentals', duration: '25 min', xp: 50 },
      { id: '2-2', title: 'Voice Techniques', duration: '25 min', xp: 50 },
    ],
    challenge: 'Audio Story Challenge',
  },
  {
    week: 3,
    title: 'AI Image Generation',
    description: 'Create stunning visuals with AI tools',
    sessions: [
      { id: '3-1', title: 'Prompt Engineering Basics', duration: '30 min', xp: 50 },
      { id: '3-2', title: 'Style & Consistency', duration: '25 min', xp: 50 },
    ],
    challenge: 'Visual Story',
  },
  {
    week: 4,
    title: 'Storytelling That Sticks',
    description: 'Narrative structures that keep viewers watching',
    sessions: [
      { id: '4-1', title: 'Story Structures', duration: '25 min', xp: 50 },
      { id: '4-2', title: 'Emotional Hooks', duration: '25 min', xp: 50 },
    ],
    challenge: 'Mini Documentary',
  },
  {
    week: 5,
    title: 'Building Your Brand',
    description: 'Create a recognizable creator identity',
    sessions: [
      { id: '5-1', title: 'Brand Foundations', duration: '25 min', xp: 50 },
      { id: '5-2', title: 'Visual Identity', duration: '25 min', xp: 50 },
    ],
    challenge: 'Brand Kit Creation',
  },
  {
    week: 6,
    title: 'Content Strategy',
    description: 'Plan content that grows your audience',
    sessions: [
      { id: '6-1', title: 'Content Pillars', duration: '25 min', xp: 50 },
      { id: '6-2', title: 'Posting Strategy', duration: '25 min', xp: 50 },
    ],
    challenge: 'Content Calendar',
  },
  {
    week: 7,
    title: 'Advanced AI Tools',
    description: 'Level up with cutting-edge AI capabilities',
    sessions: [
      { id: '7-1', title: 'AI Video Generation', duration: '30 min', xp: 75 },
      { id: '7-2', title: 'AI Workflows', duration: '30 min', xp: 75 },
    ],
    challenge: 'AI Mashup',
  },
  {
    week: 8,
    title: 'Collaboration & Community',
    description: 'Build connections and collaborate effectively',
    sessions: [
      { id: '8-1', title: 'Collaboration Strategies', duration: '25 min', xp: 50 },
      { id: '8-2', title: 'Community Building', duration: '25 min', xp: 50 },
    ],
    challenge: 'Collab Project',
  },
  {
    week: 9,
    title: 'Monetization Basics',
    description: 'Turn your content into opportunities',
    sessions: [
      { id: '9-1', title: 'Revenue Streams', duration: '25 min', xp: 50 },
      { id: '9-2', title: 'Brand Partnerships', duration: '25 min', xp: 50 },
    ],
    challenge: 'Pitch Deck',
  },
  {
    week: 10,
    title: 'Final Showcase',
    description: 'Put it all together in your capstone project',
    sessions: [
      { id: '10-1', title: 'Project Planning', duration: '25 min', xp: 75 },
      { id: '10-2', title: 'Showcase Prep', duration: '30 min', xp: 75 },
    ],
    challenge: 'Capstone Project',
  },
]

async function getLearnData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: membership } = await supabase
    .from('class_members')
    .select('class:classes(*)')
    .eq('user_id', user.id)
    .single()

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', user.id)

  const classData = membership?.class as { current_week?: number } | null
  const currentWeek = classData?.current_week || 1

  return {
    currentWeek,
    completedLessons: progress?.filter((p: { completed: boolean }) => p.completed).map((p: { lesson_id: string }) => p.lesson_id) || [],
  }
}

export default async function LearnPage() {
  const { currentWeek, completedLessons } = await getLearnData()

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Learn</h1>
          <p className="text-white/60">10 weeks to level up your creator game</p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-white/60">Overall Progress</p>
                <p className="text-2xl font-bold">{Math.round((completedLessons.length / 20) * 100)}%</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Trophy className="w-4 h-4 text-[#BFFF00]" />
                <span>{completedLessons.length}/20 lessons</span>
              </div>
            </div>
            <Progress value={(completedLessons.length / 20) * 100} variant="xp" />
          </CardContent>
        </Card>

        {/* Curriculum */}
        <div className="space-y-4">
          {curriculum.map((week) => {
            const isUnlocked = week.week <= currentWeek
            const weekLessons = week.sessions.map(s => s.id)
            const completedInWeek = weekLessons.filter(id => completedLessons.includes(id)).length
            const isComplete = completedInWeek === weekLessons.length

            return (
              <Card
                key={week.week}
                variant={isUnlocked ? 'interactive' : 'default'}
                className={!isUnlocked ? 'opacity-60' : ''}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isComplete
                          ? 'bg-[#BFFF00]/20 text-[#BFFF00]'
                          : isUnlocked
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-white/40'
                      }`}>
                        {isComplete ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : isUnlocked ? (
                          <Play className="w-5 h-5" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <CardDescription>WEEK {week.week}</CardDescription>
                        <CardTitle>{week.title}</CardTitle>
                        <p className="text-sm text-white/50 mt-1">{week.description}</p>
                      </div>
                    </div>
                    {isUnlocked && (
                      <span className="text-sm text-white/40">
                        {completedInWeek}/{weekLessons.length}
                      </span>
                    )}
                  </div>
                </CardHeader>
                {isUnlocked && (
                  <CardContent>
                    <div className="space-y-3">
                      {week.sessions.map((session) => {
                        const isCompleted = completedLessons.includes(session.id)
                        return (
                          <Link
                            key={session.id}
                            href={`/learn/${session.id}`}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isCompleted ? 'bg-[#BFFF00]/20' : 'bg-white/10'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-[#BFFF00]" />
                                ) : (
                                  <Play className="w-3 h-3" />
                                )}
                              </div>
                              <span className={isCompleted ? 'text-white/60' : ''}>{session.title}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-white/40">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{session.duration}</span>
                              </div>
                              <span className="text-[#BFFF00]/60">+{session.xp} XP</span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    {/* Week Challenge */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <Link
                        href={`/challenges/${week.week}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#BFFF00]" />
                          <span className="text-white/60">Weekly Challenge:</span>
                          <span>{week.challenge}</span>
                        </div>
                        <span className="text-[#BFFF00]">+150 XP</span>
                      </Link>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
