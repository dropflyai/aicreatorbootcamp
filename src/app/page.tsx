'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Film, BookOpen, MessageCircle, Play } from 'lucide-react'
import { isDemoMode } from '@/lib/demo'
import { createClient } from '@/lib/supabase/client'

const creatorTypes = [
  {
    id: 'entertainer',
    icon: Film,
    label: 'Entertainer',
    description: 'I make people laugh and feel',
  },
  {
    id: 'educator',
    icon: BookOpen,
    label: 'Educator',
    description: 'I teach and explain things',
  },
  {
    id: 'storyteller',
    icon: MessageCircle,
    label: 'Storyteller',
    description: 'I share experiences and stories',
  },
]

export default function LandingPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [demoLoading, setDemoLoading] = useState(false)
  const demoMode = isDemoMode()

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    // Store in localStorage for onboarding
    if (typeof window !== 'undefined') {
      localStorage.setItem('creatorType', type)
    }
    // Navigate to first win experience with creator type as query param
    router.push(`/start?type=${type}`)
  }

  const handleDemoLogin = async () => {
    setDemoLoading(true)

    try {
      // Call the demo login API to setup/get demo user
      const response = await fetch('/api/demo/login', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Demo login failed')
      }

      // Sign in with the demo credentials
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.credentials.email,
        password: data.credentials.password,
      })

      if (authError) throw authError

      router.push('/home')
    } catch (err: any) {
      console.error('Demo login error:', err)
      alert('Demo login failed. Please try again.')
    } finally {
      setDemoLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#1a1a2e]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BFFF00]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#BFFF00] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-black" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI Creator Bootcamp
        </h1>

        <p className="text-xl text-white/60 mb-12">
          🎬 10 weeks to creator mastery
        </p>

        {/* Creator type selection */}
        <div className="glass rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            What kind of creator are you?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {creatorTypes.map((type) => {
              const Icon = type.icon
              const isSelected = selectedType === type.id

              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`
                    p-6 rounded-2xl border transition-all duration-200 text-left
                    ${isSelected
                      ? 'bg-[#BFFF00]/10 border-[#BFFF00]/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                    }
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4
                    ${isSelected ? 'bg-[#BFFF00] text-black' : 'bg-white/10 text-white/60'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{type.label}</h3>
                  <p className="text-sm text-white/50">{type.description}</p>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Demo Mode Button */}
        {demoMode && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDemoLogin}
            disabled={demoLoading}
            className="w-full max-w-md mb-6 p-4 rounded-2xl bg-[#BFFF00]/10 border border-[#BFFF00]/30 hover:bg-[#BFFF00]/20 transition-all duration-200 flex items-center justify-center gap-2 text-[#BFFF00] font-medium disabled:opacity-50"
          >
            {demoLoading ? (
              <span className="animate-pulse">Loading demo...</span>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Try Demo - No Signup Required
              </>
            )}
          </motion.button>
        )}

        {/* Already have account */}
        <p className="text-white/40">
          Already have an account?{' '}
          <Link href="/login" className="text-[#BFFF00] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
