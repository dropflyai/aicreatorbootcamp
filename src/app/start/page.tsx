'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function StartPage() {
  const router = useRouter()
  const [step, setStep] = useState<'hook' | 'feedback'>('hook')
  const [hookText, setHookText] = useState('')

  const handleSubmitHook = () => {
    if (hookText.trim()) {
      setStep('feedback')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#BFFF00]/5 rounded-full blur-[128px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 'hook' && (
          <motion.div
            key="hook"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-lg mx-auto text-center"
          >
            <p className="text-white/60 mb-4">
              Nice! Entertainers make people stop scrolling.
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Let&apos;s try your first hook. What would make someone stop and watch YOUR video?
            </h1>

            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-white/60 whitespace-nowrap pt-3">
                  &quot;POV: You finally
                </span>
                <Input
                  value={hookText}
                  onChange={(e) => setHookText(e.target.value)}
                  placeholder="understand why your alarm clock hates you"
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#BFFF00]/20 text-[#BFFF00] mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Not bad for your first hook!
              </h1>
            </div>

            <div className="glass rounded-2xl p-6 mb-6">
              <p className="text-lg text-white mb-6">
                &quot;POV: You finally {hookText}&quot;
              </p>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Relatable situation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">POV format (proven performer)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#BFFF00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#BFFF00] text-xs">💡</span>
                  </div>
                  <span className="text-white/70">
                    Try: Add a time pressure or specific detail to make it more vivid
                  </span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 mb-8 text-center">
              <p className="text-white/60 mb-4">
                This is just the beginning. Want to save your progress and join your class?
              </p>
            </div>

            <Button
              onClick={() => router.push('/join')}
              className="w-full"
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
