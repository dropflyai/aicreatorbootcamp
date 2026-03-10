'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, Link as LinkIcon, X, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

const projectTypes = [
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'image', label: 'Image', icon: '🖼️' },
  { id: 'audio', label: 'Audio', icon: '🎵' },
  { id: 'other', label: 'Other', icon: '✨' },
]

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState<'type' | 'details' | 'upload'>('type')
  const [projectType, setProjectType] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [contentUrl, setContentUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!title.trim() || !contentUrl.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // Get user's class
      const { data: membership } = await supabase
        .from('class_members')
        .select('class_id')
        .eq('user_id', user.id)
        .single()

      // Create project
      const { error: insertError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          class_id: membership?.class_id,
          title: title.trim(),
          description: description.trim(),
          content_url: contentUrl.trim(),
          project_type: projectType,
          status: 'submitted',
        })

      if (insertError) throw insertError

      // Award XP
      await supabase.rpc('award_xp', {
        p_user_id: user.id,
        p_amount: 25,
        p_source: 'project_submitted',
      })

      router.push('/gallery')
    } catch (err: any) {
      setError(err.message || 'Failed to submit project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Create</h1>
          <p className="text-white/60">Share your work with the class</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {['type', 'details', 'upload'].map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-12 bg-[#BFFF00]'
                  : ['type', 'details', 'upload'].indexOf(step) > i
                    ? 'w-8 bg-[#BFFF00]/50'
                    : 'w-8 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Type */}
        {step === 'type' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>What are you creating?</CardTitle>
                <CardDescription>Select the type of content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setProjectType(type.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        projectType === type.id
                          ? 'border-[#BFFF00] bg-[#BFFF00]/10'
                          : 'border-white/10 hover:border-white/20 bg-white/5'
                      }`}
                    >
                      <span className="text-3xl mb-2 block">{type.icon}</span>
                      <span className="font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setStep('details')}
                  disabled={!projectType}
                  className="w-full"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Tell us about your creation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My awesome creation..."
                />
                <div>
                  <label className="block text-sm text-white/60 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's this project about? What did you learn?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#BFFF00]/50 focus:ring-1 focus:ring-[#BFFF00]/50 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep('type')}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep('upload')}
                    disabled={!title.trim()}
                    className="flex-1"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Upload */}
        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Add Your Content</CardTitle>
                <CardDescription>Link to your project or upload a file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Link Input */}
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Content URL (YouTube, TikTok, Drive, etc.)
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="url"
                      value={contentUrl}
                      onChange={(e) => setContentUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#BFFF00]/50 focus:ring-1 focus:ring-[#BFFF00]/50"
                    />
                    {contentUrl && (
                      <button
                        onClick={() => setContentUrl('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <X className="w-4 h-4 text-white/40 hover:text-white" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[#161616] px-4 text-white/40">or</span>
                  </div>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 mb-1">Drop your file here or click to upload</p>
                  <p className="text-sm text-white/40">Max 100MB</p>
                </div>

                {error && (
                  <p className="text-[#FF6B6B] text-sm">{error}</p>
                )}

                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep('details')}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!contentUrl.trim()}
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    Submit Project
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* XP Preview */}
            <Card className="mt-4">
              <CardContent className="py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">XP for submitting</span>
                  <span className="text-[#BFFF00] font-medium">+25 XP</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  )
}
