'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Check, Film, BookOpen, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type CreatorType = 'entertainer' | 'educator' | 'storyteller'

interface CreatorConfig {
  icon: typeof Film
  tagline: string
  hookPrompt: string
  hookPrefix: string
  placeholder: string
  feedbackTitle: string
  feedbackPoints: string[]
  improvementTip: string
  accentColor: string
}

const creatorConfigs: Record<CreatorType, CreatorConfig> = {
  entertainer: {
    icon: Film,
    tagline: "Entertainers make people stop scrolling.",
    hookPrompt: "Let's try your first hook. What would make someone stop and watch YOUR video?",
    hookPrefix: "POV: You finally",
    placeholder: "understand why your alarm clock hates you",
    feedbackTitle: "Not bad for your first hook!",
    feedbackPoints: [
      "Relatable situation that triggers emotion",
      "POV format (proven viral performer)",
      "Creates instant curiosity"
    ],
    improvementTip: "Add a time pressure or unexpected twist to make it even more irresistible",
    accentColor: "#BFFF00"
  },
  educator: {
    icon: BookOpen,
    tagline: "Educators turn complexity into clarity.",
    hookPrompt: "Let's craft your first teaching hook. What's something you know that others desperately need to understand?",
    hookPrefix: "Nobody taught you this, but",
    placeholder: "compound interest works against you until you're 30",
    feedbackTitle: "That's a powerful knowledge hook!",
    feedbackPoints: [
      "Highlights a knowledge gap most people have",
      "'Nobody taught you' creates instant intrigue",
      "Promises valuable insight"
    ],
    improvementTip: "Add a specific number or timeframe to make your claim more credible and shareable",
    accentColor: "#60A5FA"
  },
  storyteller: {
    icon: MessageCircle,
    tagline: "Storytellers make people feel something unforgettable.",
    hookPrompt: "Let's write your first story hook. What moment would pull someone into your world?",
    hookPrefix: "I'll never forget the day",
    placeholder: "a stranger's words changed my entire life direction",
    feedbackTitle: "That's a captivating story opener!",
    feedbackPoints: [
      "Creates emotional anticipation",
      "Personal stakes = instant connection",
      "Promises a meaningful journey"
    ],
    improvementTip: "Add a sensory detail (what you saw, heard, or felt) to make the moment vivid and immersive",
    accentColor: "#A855F7"
  }
}

function StartPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<'hook' | 'feedback'>('hook')
  const [hookText, setHookText] = useState('')
  const [creatorType, setCreatorType] = useState<CreatorType>('entertainer')

  useEffect(() => {
    // Get creator type from URL param first, then localStorage as fallback
    const urlType = searchParams.get('type') as CreatorType
    const storedType = typeof window !== 'undefined'
      ? localStorage.getItem('creatorType') as CreatorType
      : null

    const finalType = urlType || storedType || 'entertainer'

    // Validate the type
    if (['entertainer', 'educator', 'storyteller'].includes(finalType)) {
      setCreatorType(finalType)
      // Sync to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('creatorType', finalType)
      }
    }
  }, [searchParams])

  const config = creatorConfigs[creatorType]
  const Icon = config.icon

  const handleSubmitHook = () => {
    if (hookText.trim()) {
      setStep('feedback')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[128px] pointer-events-none"
        style={{ backgroundColor: `${config.accentColor}10` }}
      />

      <AnimatePresence mode="wait">
        {step === 'hook' && (
          <motion.div
            key="hook"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-lg mx-auto text-center"
          >
            {/* Creator type indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${config.accentColor}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: config.accentColor }} />
              </div>
              <span className="text-white/60 capitalize">{creatorType}</span>
            </div>

            <p className="text-white/60 mb-4">
              Nice! {config.tagline}
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {config.hookPrompt}
            </h1>

            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-white/60 whitespace-nowrap pt-3">
                  &quot;{config.hookPrefix}
                </span>
                <Input
                  value={hookText}
                  onChange={(e) => setHookText(e.target.value)}
                  placeholder={config.placeholder}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitHook()}
                />
                <span className="text-white/60 pt-3">&quot;</span>
              </div>
            </div>

            <Button
              onClick={handleSubmitHook}
              disabled={!hookText.trim()}
              className="w-full md:w-auto"
              style={{
                backgroundColor: config.accentColor,
                color: '#000'
              }}
            >
              See the magic
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 'feedback' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-lg mx-auto"
          >
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                style={{ backgroundColor: `${config.accentColor}20` }}
              >
                <Sparkles className="w-8 h-8" style={{ color: config.accentColor }} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {config.feedbackTitle}
              </h1>
            </div>

            <div className="glass rounded-2xl p-6 mb-6">
              <p className="text-lg text-white mb-6">
                &quot;{config.hookPrefix} {hookText}&quot;
              </p>

              <div className="border-t border-white/10 pt-4 space-y-3">
                {config.feedbackPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">{point}</span>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${config.accentColor}20` }}
                  >
                    <span style={{ color: config.accentColor }} className="text-xs">*</span>
                  </div>
                  <span className="text-white/70">
                    Try: {config.improvementTip}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 mb-8 text-center">
              <p className="text-white/60 mb-2">
                This is just the beginning of your {creatorType} journey.
              </p>
              <p className="text-white/60">
                Want to save your progress and join your class?
              </p>
            </div>

            <Button
              onClick={() => router.push(`/join?type=${creatorType}`)}
              className="w-full"
              style={{
                backgroundColor: config.accentColor,
                color: '#000'
              }}
            >
              Create account & continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function StartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <div className="text-white/60">Loading...</div>
      </div>
    }>
      <StartPageContent />
    </Suspense>
  )
}
