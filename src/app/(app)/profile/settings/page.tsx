'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const creatorTypes = [
  { id: 'entertainer', label: 'Entertainer', emoji: '🎭' },
  { id: 'educator', label: 'Educator', emoji: '📚' },
  { id: 'storyteller', label: 'Storyteller', emoji: '📖' },
]

export default function SettingsPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [creatorType, setCreatorType] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('name, bio, creator_type')
        .eq('id', user.id)
        .single()

      if (profile) {
        setName(profile.name || '')
        setBio(profile.bio || '')
        setCreatorType(profile.creator_type || '')
      }
      setLoading(false)
    }
    loadProfile()
  }, [router])

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          bio: bio.trim(),
          creator_type: creatorType,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
        <main className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
          <div className="h-8 w-32 bg-white/5 rounded animate-pulse mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/profile" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Profile Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-5 h-5 text-[#BFFF00]" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

            <div>
              <label className="block text-sm text-white/60 mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell your classmates about yourself..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#BFFF00]/50 focus:ring-1 focus:ring-[#BFFF00]/50 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-3">Creator Type</label>
              <div className="grid grid-cols-3 gap-3">
                {creatorTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setCreatorType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      creatorType === type.id
                        ? 'border-[#BFFF00] bg-[#BFFF00]/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{type.emoji}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <p className="text-[#FF6B6B] text-sm mb-4">{error}</p>
        )}

        {saved && (
          <p className="text-[#BFFF00] text-sm mb-4">Changes saved!</p>
        )}

        <Button
          className="w-full"
          onClick={handleSave}
          loading={saving}
        >
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </main>
    </div>
  )
}
