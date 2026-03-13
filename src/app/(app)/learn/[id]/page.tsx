'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Play, Clock, Trophy, BookOpen, Lightbulb, Target } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const curriculum = [
  {
    week: 1, title: 'Video That Stops the Scroll',
    sessions: [
      {
        id: '1-1', title: 'What Makes People Stop Scrolling', duration: '25 min', xp: 50,
        description: 'Understand the psychology behind viral content and what triggers people to pause and watch.',
        keyPoints: [
          'Pattern interrupts: how to break autopilot scrolling',
          'The 1-second hook rule: you have less time than you think',
          'Emotional triggers that stop thumbs: surprise, curiosity, relatability',
          'Visual vs. audio hooks — when to use each',
        ],
        exercise: 'Scroll through your favorite platform for 10 minutes. Note every video that made you stop. What did they have in common?',
        tools: ['CapCut', 'TikTok Analytics', 'YouTube Studio'],
      },
      {
        id: '1-2', title: 'Filming & Editing Basics', duration: '30 min', xp: 50,
        description: 'Master the fundamentals of filming and editing that separate professional-looking content from amateur work.',
        keyPoints: [
          'Rule of thirds: frame your shots like a pro',
          'Lighting setups: 3-point lighting on a budget',
          'Camera settings: resolution, frame rate, stabilization',
          'Editing rhythm: cuts, transitions, pacing to music',
        ],
        exercise: 'Film a 60-second video using at least 3 different shot types. Edit it to music.',
        tools: ['CapCut', 'DaVinci Resolve (free)', 'iPhone/Android camera app'],
      },
    ],
  },
  {
    week: 2, title: 'Voice & Audio That Vibes',
    sessions: [
      {
        id: '2-1', title: 'Audio Fundamentals', duration: '25 min', xp: 50,
        description: 'Great content with bad audio gets scrolled past. Learn to capture and mix audio that hooks listeners.',
        keyPoints: [
          'Microphone types and which to use for different formats',
          'Room treatment on a budget: where to record',
          'Gain staging: no clipping, no hiss',
          'Noise removal and audio cleanup in free tools',
        ],
        exercise: 'Record the same 30-second clip in 3 different locations. Compare the audio quality.',
        tools: ['Rode Wireless Go', 'Audacity', 'Adobe Podcast (free AI cleanup)'],
      },
      {
        id: '2-2', title: 'Voice Techniques', duration: '25 min', xp: 50,
        description: 'Your voice is your brand. Learn to use it with confidence, energy, and authority.',
        keyPoints: [
          'Vocal energy and how to project without shouting',
          'Pacing and pauses: the power of silence',
          'Tone matching your audience and platform',
          'Warm-up exercises used by professional voice actors',
        ],
        exercise: 'Record a 1-minute voiceover at 3 different energy levels. Which feels most authentic?',
        tools: ['Eleven Labs (AI voice)', 'Audacity', 'Voice Memos'],
      },
    ],
  },
  {
    week: 3, title: 'AI Image Generation',
    sessions: [
      {
        id: '3-1', title: 'Prompt Engineering Basics', duration: '30 min', xp: 50,
        description: 'Learn to speak the language of AI image models to generate exactly what you visualize.',
        keyPoints: [
          'Anatomy of a great prompt: subject, style, lighting, composition',
          'Negative prompts: telling AI what NOT to create',
          'Model differences: Midjourney vs. DALL-E vs. Stable Diffusion',
          'Iterating on prompts to get closer to your vision',
        ],
        exercise: 'Generate 10 variations of the same concept by changing one prompt element at a time.',
        tools: ['Midjourney', 'DALL-E 3', 'Leonardo AI'],
      },
      {
        id: '3-2', title: 'Style & Consistency', duration: '25 min', xp: 50,
        description: 'Create a recognizable visual signature using AI that you can apply across all your content.',
        keyPoints: [
          'Style references: how to train AI on your aesthetic',
          'Color palette consistency across generated images',
          'Creating character sheets for consistent characters',
          'Combining AI-generated assets with your own photography',
        ],
        exercise: 'Create 5 images for an imaginary brand using the same style reference. They should look like a cohesive collection.',
        tools: ['Midjourney --sref', 'Adobe Firefly', 'Canva AI'],
      },
    ],
  },
  {
    week: 4, title: 'Storytelling That Sticks',
    sessions: [
      {
        id: '4-1', title: 'Story Structures', duration: '25 min', xp: 50,
        description: 'Every viral piece of content follows a story structure. Learn the formulas that keep people watching.',
        keyPoints: [
          'The hero\'s journey compressed to 60 seconds',
          'Problem-Agitate-Solution: the copywriter\'s framework',
          'Story loops: open a loop, close it at the end',
          'The before/after transformation arc',
        ],
        exercise: 'Take one of your past content ideas and rewrite it using the Problem-Agitate-Solution structure.',
        tools: ['Notion', 'ChatGPT for brainstorming'],
      },
      {
        id: '4-2', title: 'Emotional Hooks', duration: '25 min', xp: 50,
        description: 'Facts tell, emotions sell. Learn to manufacture emotional resonance that makes content shareable.',
        keyPoints: [
          'The 7 universal emotions and how to trigger each',
          'Nostalgia, aspiration, and belonging — the big three',
          'Vulnerability and authenticity as a hook',
          'Contrast: the fastest way to create emotional tension',
        ],
        exercise: 'Watch 3 viral videos and identify which emotion each one triggers in the first 3 seconds.',
        tools: ['Emotional Intensity Scale worksheet'],
      },
    ],
  },
  {
    week: 5, title: 'Building Your Brand',
    sessions: [
      {
        id: '5-1', title: 'Brand Foundations', duration: '25 min', xp: 50,
        description: 'Build a creator brand that is instantly recognizable and magnetically attracts your ideal audience.',
        keyPoints: [
          'Niche down to win: the riches are in the niches',
          'Brand voice: how to sound like yourself at scale',
          'Your origin story: the content that explains why you create',
          'The brand triangle: values, personality, promise',
        ],
        exercise: 'Write your creator manifesto in 3 sentences. Who are you, who do you serve, what do you promise?',
        tools: ['Notion Brand Doc template', 'ChatGPT brand coach prompt'],
      },
      {
        id: '5-2', title: 'Visual Identity', duration: '25 min', xp: 50,
        description: 'Create a visual system that makes your content unmistakable even without your name attached.',
        keyPoints: [
          'Logo and icon: when you need one and when you don\'t',
          'Color psychology: what your palette says about you',
          'Typography choices and how to use them in thumbnails',
          'Template systems: create once, use forever',
        ],
        exercise: 'Create a simple brand kit: 3 colors, 2 fonts, 1 icon. Design 3 social templates.',
        tools: ['Canva Pro', 'Figma (free)', 'Coolors.co'],
      },
    ],
  },
  {
    week: 6, title: 'Content Strategy',
    sessions: [
      {
        id: '6-1', title: 'Content Pillars', duration: '25 min', xp: 50,
        description: 'Build a sustainable content system around 3-5 pillars that give your audience a reason to follow.',
        keyPoints: [
          'Defining your content pillars: education, entertainment, inspiration',
          'The 80/20 content rule: value vs. promotion',
          'Content series: the subscription model for creators',
          'Evergreen vs. trending content: when to create each',
        ],
        exercise: 'Define 3 content pillars for your channel. Brainstorm 10 video ideas for each pillar.',
        tools: ['Notion content planner', 'TubeBuddy', 'Keywords Everywhere'],
      },
      {
        id: '6-2', title: 'Posting Strategy', duration: '25 min', xp: 50,
        description: 'Master the algorithm — not by gaming it, but by understanding what it rewards.',
        keyPoints: [
          'Platform-specific optimal posting times and frequencies',
          'Batch filming: how to create a month of content in a weekend',
          'Content recycling: one idea, seven platforms',
          'Analytics that actually matter: watch time, saves, shares',
        ],
        exercise: 'Create a 4-week content calendar with at least 3 posts per week.',
        tools: ['Buffer', 'Later', 'Notion content calendar'],
      },
    ],
  },
  {
    week: 7, title: 'Advanced AI Tools',
    sessions: [
      {
        id: '7-1', title: 'AI Video Generation', duration: '30 min', xp: 75,
        description: 'Use cutting-edge AI video tools to create content that would have required a film crew just years ago.',
        keyPoints: [
          'Text-to-video: Sora, Kling, and RunwayML compared',
          'AI B-roll: generate perfect cutaway shots',
          'Lip sync and avatar tools for faceless content',
          'AI upscaling and enhancement for low-quality footage',
        ],
        exercise: 'Create a 30-second video using at least 3 different AI video tools. Blend them seamlessly.',
        tools: ['RunwayML', 'Kling', 'HeyGen', 'Topaz Video AI'],
      },
      {
        id: '7-2', title: 'AI Workflows', duration: '30 min', xp: 75,
        description: 'Build automated AI pipelines that let you produce more content in less time without sacrificing quality.',
        keyPoints: [
          'Prompt libraries: build a personal AI swipe file',
          'Chaining AI tools: output from one becomes input for another',
          'AI scripting assistants: Claude and ChatGPT for creators',
          'Automation with Make and Zapier for distribution',
        ],
        exercise: 'Build a workflow that takes a single idea and produces: script, images, and social captions automatically.',
        tools: ['Claude AI', 'Make (formerly Integromat)', 'Notion AI'],
      },
    ],
  },
  {
    week: 8, title: 'Collaboration & Community',
    sessions: [
      {
        id: '8-1', title: 'Collaboration Strategies', duration: '25 min', xp: 50,
        description: 'Strategic collabs are the fastest growth hack available to creators. Learn how to land them.',
        keyPoints: [
          'The value exchange: what you offer vs. what they offer',
          'Finding collab partners: size, niche, and audience overlap',
          'Pitch templates that actually get responses',
          'Collab formats: joint videos, takeovers, podcast swaps',
        ],
        exercise: 'Write 3 collab pitches to creators in your niche at different audience sizes.',
        tools: ['Hunter.io (find emails)', 'LinkedIn', 'Instagram DMs'],
      },
      {
        id: '8-2', title: 'Community Building', duration: '25 min', xp: 50,
        description: 'Turn followers into a community — the difference between a creator and a movement.',
        keyPoints: [
          'Comment sections as content: how to foster discussion',
          'Discord and Circle: when to launch a community platform',
          'Super fans: identifying and nurturing your top 100',
          'Community rituals: weekly traditions that build belonging',
        ],
        exercise: 'Identify your top 10 most engaged followers. Send each a genuine personal reply.',
        tools: ['Discord', 'Circle', 'Beehiiv for newsletters'],
      },
    ],
  },
  {
    week: 9, title: 'Monetization Basics',
    sessions: [
      {
        id: '9-1', title: 'Revenue Streams', duration: '25 min', xp: 50,
        description: 'Diversify your creator income across multiple streams so no single platform can sink you.',
        keyPoints: [
          'Platform monetization: eligibility, CPM rates, what to expect',
          'Digital products: courses, presets, templates, ebooks',
          'Affiliate marketing: choosing partnerships that align with values',
          'Memberships and subscriptions: recurring revenue basics',
        ],
        exercise: 'Map out 5 possible revenue streams for your niche. Research average earnings for each.',
        tools: ['Gumroad', 'Stan Store', 'Patreon', 'LTK'],
      },
      {
        id: '9-2', title: 'Brand Partnerships', duration: '25 min', xp: 50,
        description: 'Brand deals can 10x your income overnight. Learn to attract, negotiate, and execute them.',
        keyPoints: [
          'Media kit: what to include and how to design it',
          'Pricing your rates: CPM model vs. flat fee vs. revenue share',
          'FTC compliance: what you must disclose and how',
          'Relationship management: how to turn one deal into many',
        ],
        exercise: 'Create a one-page media kit with your stats, niche, audience demographics, and rate card.',
        tools: ['Canva media kit templates', 'Passionfroot', 'Grapevine'],
      },
    ],
  },
  {
    week: 10, title: 'Final Showcase',
    sessions: [
      {
        id: '10-1', title: 'Project Planning', duration: '25 min', xp: 75,
        description: 'Plan your capstone project — a piece of content that demonstrates everything you\'ve learned.',
        keyPoints: [
          'Concept development: choosing your best idea',
          'Production planning: timeline, resources, team',
          'Applying every skill from the 10 weeks',
          'Success metrics: how will you measure if it worked?',
        ],
        exercise: 'Write a 1-page project brief for your capstone. Include concept, production plan, and success criteria.',
        tools: ['Notion project brief template'],
      },
      {
        id: '10-2', title: 'Showcase Prep', duration: '30 min', xp: 75,
        description: 'Polish your final project and prepare to present it to the class.',
        keyPoints: [
          'Final review checklist: hook, audio, visuals, CTA',
          'Presentation tips: how to talk about your creative choices',
          'Receiving feedback gracefully and applying it quickly',
          'Your creator journey: before and after',
        ],
        exercise: 'Share your capstone with a trusted person and get 3 specific pieces of feedback before submitting.',
        tools: ['Your full toolkit from 10 weeks'],
      },
    ],
  },
]

function findLesson(id: string) {
  for (const week of curriculum) {
    for (const session of week.sessions) {
      if (session.id === id) {
        return { week, session }
      }
    }
  }
  return null
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string

  const [isCompleted, setIsCompleted] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [loading, setLoading] = useState(true)

  const found = findLesson(lessonId)

  useEffect(() => {
    async function checkProgress() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        const { data } = await supabase
          .from('lesson_progress')
          .select('completed')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
          .single()

        if (data?.completed) setIsCompleted(true)
      } finally {
        setLoading(false)
      }
    }
    checkProgress()
  }, [lessonId, router])

  const handleComplete = async () => {
    if (isCompleted || completing || !found) return
    setCompleting(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Upsert lesson progress
      await supabase.from('lesson_progress').upsert({
        user_id: user.id,
        lesson_id: lessonId,
        week: found.week.week,
        session: parseInt(lessonId.split('-')[1]),
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,lesson_id' })

      // Award XP
      await supabase.rpc('award_xp', {
        p_user_id: user.id,
        p_amount: found.session.xp,
        p_source: 'lesson_complete',
        p_reference_id: null,
      })

      // Log activity
      const { data: membership } = await supabase
        .from('class_members')
        .select('class_id')
        .eq('user_id', user.id)
        .single()

      if (membership?.class_id) {
        await supabase.from('activities').insert({
          user_id: user.id,
          class_id: membership.class_id,
          activity_type: 'lesson_completed',
          data: {
            lesson_id: lessonId,
            lesson_title: found.session.title,
            week: found.week.week,
            xp: found.session.xp,
          },
        })
      }

      // Check and award any newly earned badges (fire-and-forget)
      fetch('/api/badges', { method: 'POST' }).catch(() => {})

      setIsCompleted(true)
    } finally {
      setCompleting(false)
    }
  }

  if (!found) {
    return (
      <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
        <main className="px-4 py-6 lg:px-8 max-w-3xl mx-auto">
          <Link href="/learn" className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>
          <p className="text-white/60">Lesson not found.</p>
        </main>
      </div>
    )
  }

  const { week, session } = found

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-3xl mx-auto">
        {/* Back */}
        <Link href="/learn" className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Learn
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Week {week.week} · {week.title}</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">{session.title}</h1>
          <p className="text-white/60 text-lg leading-relaxed">{session.description}</p>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Clock className="w-4 h-4" />
              <span>{session.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#BFFF00]/70">
              <Trophy className="w-4 h-4" />
              <span>+{session.xp} XP on completion</span>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 text-sm text-[#BFFF00]">
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Key Points */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="w-5 h-5 text-[#BFFF00]" />
                Key Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {session.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#BFFF00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#BFFF00] text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-white/80 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exercise */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-6" variant="featured">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-[#BFFF00]" />
                Practice Exercise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed">{session.exercise}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Play className="w-5 h-5 text-[#BFFF00]" />
                Recommended Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {session.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Complete Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          {loading ? (
            <div className="h-14 rounded-xl bg-white/5 animate-pulse" />
          ) : isCompleted ? (
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#BFFF00]/10 border border-[#BFFF00]/20">
              <CheckCircle className="w-5 h-5 text-[#BFFF00]" />
              <span className="text-[#BFFF00] font-semibold">Lesson Complete! +{session.xp} XP earned</span>
            </div>
          ) : (
            <Button
              className="w-full h-14 text-base"
              onClick={handleComplete}
              loading={completing}
            >
              <CheckCircle className="w-5 h-5" />
              Mark as Complete · +{session.xp} XP
            </Button>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <Link href="/learn" className="text-sm text-white/40 hover:text-white transition-colors">
            ← Back to all lessons
          </Link>
        </div>
      </main>
    </div>
  )
}
