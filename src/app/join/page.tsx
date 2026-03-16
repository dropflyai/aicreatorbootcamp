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
  const [parentEmail, setParentEmail] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)
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
            ...(parentEmail.trim() && { parent_guardian_email: parentEmail.trim() }),
            parental_consent: true,
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

              {/* Parental/Guardian Consent */}
              <div className="border border-white/10 rounded-xl p-4 space-y-3 bg-white/[0.02]">
                <p className="text-sm text-white/60 font-medium">Parent/Guardian Consent</p>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-[#BFFF00] focus:ring-[#BFFF00] focus:ring-offset-0 accent-[#BFFF00]"
                  />
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                    I confirm that my parent/guardian has reviewed and approved my enrollment in this program
                  </span>
                </label>

                <Input
                  label="Parent/Guardian Email (optional — for progress updates)"
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="parent@email.com"
                />

                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-[#BFFF00] hover:underline"
                >
                  View our Privacy Policy
                </a>
              </div>

              <Button
                onClick={handleSignup}
                loading={loading}
                disabled={!consentChecked}
                className="w-full"
              >
                Create Account
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
