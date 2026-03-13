'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!password) {
      setError('Please enter a new password')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) throw updateError

      setSuccess(true)

      // Redirect to home after a short delay
      setTimeout(() => {
        router.push('/home')
      }, 2500)
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Please try again.')
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
          <span className="font-bold text-xl text-white">Set new password</span>
        </div>

        <div className="glass rounded-2xl p-6">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-4 gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">Password updated</p>
                <p className="text-white/50 text-sm">
                  Your password has been changed. Redirecting you now...
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <p className="text-white/50 text-sm mb-2">
                Choose a strong password for your account.
              </p>

              <Input
                label="New password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />

              <Input
                label="Confirm new password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                error={error}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />

              <Button
                onClick={handleSubmit}
                loading={loading}
                className="w-full"
              >
                Update password
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
