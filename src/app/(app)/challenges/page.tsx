import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Trophy, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const weekChallenges = [
  {
    week: 1,
    title: '60-Second Banger',
    description: 'Create a short-form video with a scroll-stopping hook that grabs attention in the first 3 seconds.',
    xp: 150,
    requirements: ['Under 60 seconds', 'Strong hook in first 3 sec', 'Clear call-to-action'],
  },
  {
    week: 2,
    title: 'Audio Story',
    description: 'Create a piece of content where audio is the star. Voiceover, sound design, or music-driven.',
    xp: 150,
    requirements: ['High-quality audio', 'Emotional arc', 'Original or properly licensed sound'],
  },
  {
    week: 3,
    title: 'AI Visual Story',
    description: 'Use AI image generation to create a visual narrative. 5+ images that tell a cohesive story.',
    xp: 175,
    requirements: ['5+ AI-generated images', 'Consistent style', 'Clear narrative'],
  },
  {
    week: 4,
    title: 'Mini Documentary',
    description: 'Create a 2-3 minute documentary-style video about something you care about.',
    xp: 200,
    requirements: ['2-3 minutes', 'Documentary structure', 'B-roll footage'],
  },
  {
    week: 5,
    title: 'Brand Kit',
    description: 'Design your personal creator brand kit with logo, colors, fonts, and brand voice guidelines.',
    xp: 150,
    requirements: ['Logo design', 'Color palette', 'Typography choices', 'Brand voice doc'],
  },
  {
    week: 6,
    title: 'Content Calendar',
    description: 'Plan out 2 weeks of content with a strategic content calendar.',
    xp: 125,
    requirements: ['14 days planned', 'Mix of content types', 'Platform-specific strategy'],
  },
  {
    week: 7,
    title: 'AI Mashup',
    description: 'Create content that combines multiple AI tools in creative ways.',
    xp: 200,
    requirements: ['Use 3+ AI tools', 'Seamless integration', 'Original creative concept'],
  },
  {
    week: 8,
    title: 'Collab Project',
    description: 'Partner with a classmate to create something together.',
    xp: 200,
    requirements: ['2+ creators', 'Both contribute equally', 'Combined strengths'],
  },
  {
    week: 9,
    title: 'Brand Pitch',
    description: 'Create a pitch deck for a hypothetical brand partnership.',
    xp: 175,
    requirements: ['5-10 slide deck', 'Media kit', 'Rate card'],
  },
  {
    week: 10,
    title: 'Capstone Project',
    description: 'Your final showcase piece that demonstrates everything you\'ve learned.',
    xp: 500,
    requirements: ['3-5 minute video', 'Full production value', 'Original concept'],
  },
]

async function getChallengesData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: membership } = await supabase
    .from('class_members')
    .select('class:classes(*)')
    .eq('user_id', user.id)
    .single()

  const { data: submissions } = await supabase
    .from('projects')
    .select('week, challenge_id')
    .eq('user_id', user.id)
    .not('challenge_id', 'is', null)

  const classData = membership?.class as { current_week?: number } | null
  const currentWeek = classData?.current_week || 1

  return {
    currentWeek,
    submittedWeeks: submissions?.map((s: { week: number }) => s.week) || [],
  }
}

export default async function ChallengesPage() {
  const { currentWeek, submittedWeeks } = await getChallengesData()

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Weekly Challenges</h1>
          <p className="text-white/60">Complete challenges to earn bonus XP and badges</p>
        </div>

        {/* Current Week Challenge */}
        {currentWeek <= 10 && (
          <Card variant="featured" className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2 text-[#BFFF00] text-sm mb-2">
                <Trophy className="w-4 h-4" />
                THIS WEEK&apos;S CHALLENGE
              </div>
              <CardTitle className="text-2xl">{weekChallenges[currentWeek - 1].title}</CardTitle>
              <CardDescription className="text-base">
                {weekChallenges[currentWeek - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h4 className="text-sm text-white/60 mb-3">Requirements:</h4>
                <ul className="space-y-2">
                  {weekChallenges[currentWeek - 1].requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BFFF00]" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Due Friday</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>12 submitted</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#BFFF00] font-bold">+{weekChallenges[currentWeek - 1].xp} XP</span>
                  {submittedWeeks.includes(currentWeek) ? (
                    <div className="flex items-center gap-2 text-[#4ECDC4]">
                      <CheckCircle className="w-5 h-5" />
                      <span>Submitted</span>
                    </div>
                  ) : (
                    <Link href="/create">
                      <Button>
                        Submit
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Challenges */}
        <div className="space-y-4">
          {weekChallenges.map((challenge, index) => {
            const week = index + 1
            const isUnlocked = week <= currentWeek
            const isSubmitted = submittedWeeks.includes(week)
            const isCurrent = week === currentWeek

            if (isCurrent) return null // Already shown above

            return (
              <Card
                key={week}
                variant={isUnlocked ? 'interactive' : 'default'}
                className={!isUnlocked ? 'opacity-50' : ''}
              >
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSubmitted
                        ? 'bg-[#4ECDC4]/20 text-[#4ECDC4]'
                        : isUnlocked
                          ? 'bg-[#BFFF00]/10 text-[#BFFF00]'
                          : 'bg-white/5 text-white/40'
                    }`}>
                      {isSubmitted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Trophy className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/40">WEEK {week}</span>
                        {isSubmitted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#4ECDC4]/20 text-[#4ECDC4]">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <p className="text-sm text-white/50 truncate">{challenge.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-medium ${isSubmitted ? 'text-white/40' : 'text-[#BFFF00]'}`}>
                        +{challenge.xp} XP
                      </span>
                      {isUnlocked && !isSubmitted && (
                        <Link href="/create">
                          <Button size="sm" variant="secondary">
                            Submit
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
