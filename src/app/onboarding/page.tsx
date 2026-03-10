'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Video, Mic, PenTool, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

const creatorTypes = [
  {
    id: 'entertainer',
    title: 'The Entertainer',
    icon: Video,
    description: 'You make people laugh, react, and hit that share button',
    color: '#FF6B6B',
  },
  {
    id: 'educator',
    title: 'The Educator',
    icon: PenTool,
    description: 'You break down complex stuff so anyone can understand',
    color: '#4ECDC4',
  },
  {
    id: 'storyteller',
    title: 'The Storyteller',
    icon: Mic,
    description: 'You captivate audiences with narratives that stick',
    color: '#A855F7',
  },
]

const interests = [
  'Gaming', 'Music', 'Sports', 'Fashion', 'Tech', 'Food',
  'Travel', 'Fitness', 'Art', 'Comedy', 'Science', 'DIY',
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 5
          ? [...prev, interest]
          : prev
    )
  }

  const handleComplete = async () => {
    setLoading(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        await supabase
          .from('profiles')
          .update({
            creator_type: selectedType,
            interests: selectedInterests,
            onboarding_complete: true,
          })
          .eq('id', user.id)
      }

      router.push('/home')
    } catch (error) {
      console.error('Error saving onboarding data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#BFFF00]/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-12 bg-[#BFFF00]'
                  : s < step
                    ? 'w-8 bg-[#BFFF00]/50'
                    : 'w-8 bg-white/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Creator Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold mb-2">What type of creator are you?</h1>
              <p className="text-white/60 mb-8">Pick the one that resonates most</p>

              <div className="grid gap-4 mb-8">
                {creatorTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`glass rounded-2xl p-6 text-left transition-all duration-200 border-2 ${
                      selectedType === type.id
                        ? 'border-[#BFFF00] scale-[1.02]'
                        : 'border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${type.color}20` }}
                      >
                        <type.icon className="w-6 h-6" style={{ color: type.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{type.title}</h3>
                          {selectedType === type.id && (
                            <div className="w-6 h-6 rounded-full bg-[#BFFF00] flex items-center justify-center">
                              <Check className="w-4 h-4 text-black" />
                            </div>
                          )}
                        </div>
                        <p className="text-white/60 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!selectedType}
                className="min-w-[200px]"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold mb-2">What are you into?</h1>
              <p className="text-white/60 mb-8">Pick up to 5 interests</p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${
                      selectedInterests.includes(interest)
                        ? 'bg-[#BFFF00] text-black font-medium'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={selectedInterests.length === 0}
                  className="min-w-[200px]"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Welcome */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                className="w-24 h-24 rounded-2xl bg-[#BFFF00] flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-12 h-12 text-black" />
              </motion.div>

              <h1 className="text-3xl font-bold mb-2">You&apos;re all set!</h1>
              <p className="text-white/60 mb-2">Welcome to AI Creator Bootcamp</p>
              <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
                Over the next 10 weeks, you&apos;ll learn to create scroll-stopping content
                using AI tools. Complete challenges, earn XP, and level up your creator game.
              </p>

              <div className="glass rounded-2xl p-6 mb-8 max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60">Starting XP</span>
                  <span className="text-[#BFFF00] font-bold">+50 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Current Level</span>
                  <span className="text-white font-bold">Level 1</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  loading={loading}
                  className="min-w-[200px]"
                >
                  Let&apos;s Go!
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
