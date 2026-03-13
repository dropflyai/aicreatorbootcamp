'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Share2, Sparkles, X, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface GalleryProject {
  id: string
  title: string
  description: string
  thumbnail_url?: string
  challenge_id?: string
  week?: number
  feedback_count?: number
  user: {
    id: string
    name: string
    avatar_url?: string
    level?: number
  }
  reactions: Array<{ emoji: string; user_id: string }>
}

interface GalleryCardProps {
  project: GalleryProject
  currentUserId: string
}

export function GalleryCard({ project, currentUserId }: GalleryCardProps) {
  const [reactions, setReactions] = useState(project.reactions || [])
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackCount, setFeedbackCount] = useState(project.feedback_count || 0)
  const [submittingReaction, setSubmittingReaction] = useState(false)
  const [submittingFeedback, setSubmittingFeedback] = useState(false)

  // Feedback form state
  const [warmCategory, setWarmCategory] = useState('')
  const [warmReason, setWarmReason] = useState('')
  const [coolSuggestion, setCoolSuggestion] = useState('')

  const fireCount = reactions.filter(r => r.emoji === '🔥').length
  const hasUserReacted = reactions.some(r => r.user_id === currentUserId && r.emoji === '🔥')

  const toggleReaction = async () => {
    if (submittingReaction) return
    setSubmittingReaction(true)

    // Optimistic update
    if (hasUserReacted) {
      setReactions(prev => prev.filter(r => !(r.user_id === currentUserId && r.emoji === '🔥')))
    } else {
      setReactions(prev => [...prev, { emoji: '🔥', user_id: currentUserId }])
    }

    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id, emoji: '🔥' }),
      })
    } catch {
      // Revert on error
      setReactions(project.reactions)
    } finally {
      setSubmittingReaction(false)
    }
  }

  const submitFeedback = async () => {
    if (!warmCategory || !warmReason) return
    setSubmittingFeedback(true)

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          warmCategory,
          warmQuality: 'good',
          warmReason,
          coolSuggestion,
        }),
      })

      if (res.ok) {
        setFeedbackCount(prev => prev + 1)
        setShowFeedback(false)
        setWarmCategory('')
        setWarmReason('')
        setCoolSuggestion('')
      }
    } finally {
      setSubmittingFeedback(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: project.title, text: project.description })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <>
      <Card variant="interactive" className="overflow-hidden">
        {/* Thumbnail */}
        <div className="aspect-video bg-white/5 relative">
          {project.thumbnail_url ? (
            <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white/20" />
            </div>
          )}
          {project.challenge_id && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-full bg-[#BFFF00]/20 text-[#BFFF00] text-xs font-medium">
                Week {project.week} Challenge
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Creator Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
              {project.user?.avatar_url ? (
                <Image src={project.user.avatar_url} alt={project.user.name} width={32} height={32} className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs">
                  {project.user?.name?.[0] || '?'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{project.user?.name}</p>
              <p className="text-xs text-white/40">Level {project.user?.level || 1}</p>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="font-semibold mb-1 truncate">{project.title}</h3>
          <p className="text-sm text-white/60 line-clamp-2 mb-4">{project.description}</p>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleReaction}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  hasUserReacted ? 'text-[#FF6B6B]' : 'text-white/60 hover:text-[#FF6B6B]'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasUserReacted ? 'fill-current' : ''}`} />
                <span>{fireCount}</span>
              </button>
              <button
                onClick={() => setShowFeedback(true)}
                className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{feedbackCount}</span>
              </button>
            </div>
            <button onClick={handleShare} className="text-white/40 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">Give Feedback</h3>
                <p className="text-white/40 text-sm truncate">{project.title}</p>
              </div>
              <button onClick={() => setShowFeedback(false)} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Warm Feedback Category */}
              <div>
                <label className="block text-sm text-white/60 mb-2">What worked well?</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Hook', 'Editing', 'Audio', 'Story', 'Visuals', 'Energy'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setWarmCategory(cat)}
                      className={`py-2 px-3 rounded-lg text-sm transition-all ${
                        warmCategory === cat
                          ? 'bg-[#BFFF00]/20 border border-[#BFFF00]/50 text-[#BFFF00]'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Warm Reason */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Tell them why ✨</label>
                <textarea
                  value={warmReason}
                  onChange={(e) => setWarmReason(e.target.value)}
                  placeholder="What specifically stood out? Be specific..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#BFFF00]/50 focus:ring-1 focus:ring-[#BFFF00]/50 resize-none text-sm"
                />
              </div>

              {/* Cool Suggestion */}
              <div>
                <label className="block text-sm text-white/60 mb-2">One thing to try next time (optional)</label>
                <textarea
                  value={coolSuggestion}
                  onChange={(e) => setCoolSuggestion(e.target.value)}
                  placeholder="A constructive suggestion..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#BFFF00]/50 focus:ring-1 focus:ring-[#BFFF00]/50 resize-none text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" onClick={() => setShowFeedback(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={submitFeedback}
                loading={submittingFeedback}
                disabled={!warmCategory || !warmReason.trim()}
                className="flex-1"
              >
                <Send className="w-4 h-4" />
                Send Feedback
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
