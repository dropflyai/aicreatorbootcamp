'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function JoinPage() {
  const router = useRouter()
  const [step, setStep] = useState<'code' | 'signup'>('code')
  const [classCode, setClassCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCodeSubmit = async () => {
    if (classCode.trim()) {
      // Validate class code exists
      const supabase = createClient()
      const { data, error } = await supabase
        .from('classes')
        .select('id, name')
        .eq('code', classCode.toUpperCase())
        .single()

      if (error || !data) {
        setError('Invalid class code. Please check with your instructor.')
        return
      }

      // Store for later
      if (typeof window !== 'undefined') {
        localStorage.setItem('pendingClassId', data.id)
        localStorage.setItem('pendingClassName', data.name)
      }

      setStep('signup')
      setError('')
    }
  }

  const handleSignup = async () => {
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      // Sign up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Join the class
        const classId = typeof window !== 'undefined' ? localStorage.getItem('pendingClassId') : null

        if (classId) {
          await supabase.from('class_members').insert({
            class_id: classId,
            user_id: authData.user.id,
            role: 'student',
          })

          localStorage.removeItem('pendingClassId')
          localStorage.removeItem('pendingClassName')
        }

        router.push('/onboarding')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#BFFF00]/5 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        {/* Back button */}
        <Link
          href={step === 'signup' ? '#' : '/'}
          onClick={(e) => {
            if (step === 'signup') {
              e.preventDefault()
              setStep('code')
            }
          }}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#BFFF00] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <span className="font-bold text-xl text-white">Join AI Creator Bootcamp</span>
        </div>

        <div className="glass rounded-2xl p-6">
          {step === 'code' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Input
                label="Class Code (from your instructor)"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                placeholder="ABC-123-XYZ"
                error={error}
                className="mb-6 uppercase"
                onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
              />

              <Button onClick={handleCodeSubmit} className="w-full">
                Continue
              </Button>
            </motion.div>
          )}

          {step === 'signup' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Input
                label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
              />

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@school.edu"
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                error={error}
              />

              <Button
                onClick={handleSignup}
                loading={loading}
                className="w-full"
              >
                Create Account
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#161616] px-4 text-white/40">or</span>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  // TODO: Google OAuth
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </motion.div>
          )}
        </div>

        <p className="text-center text-white/40 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#BFFF00] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
