'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (resetError) throw resetError

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#A855F7]/5 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        {/* Back button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#BFFF00] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <span className="font-bold text-xl text-white">Reset password</span>
        </div>

        <div className="glass rounded-2xl p-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-4 gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">Check your email</p>
                <p className="text-white/50 text-sm">
                  We sent a password reset link to{' '}
                  <span className="text-white/80">{email}</span>
                </p>
              </div>
              <p className="text-white/30 text-xs mt-2">
                Didn&apos;t get it? Check your spam folder or{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#BFFF00] hover:underline"
                >
                  try again
                </button>
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <p className="text-white/50 text-sm mb-2">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@school.edu"
                error={error}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />

              <Button
                onClick={handleSubmit}
                loading={loading}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send reset link
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-white/40 mt-6">
          Remember your password?{' '}
          <Link href="/login" className="text-[#BFFF00] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
