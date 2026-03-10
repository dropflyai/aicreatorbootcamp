'use client'

import Link from 'next/link'
import { User } from 'lucide-react'
import { XPBadge, StreakBadge } from '@/components/ui/badge'

interface HeaderProps {
  user?: {
    name: string
    avatar_url?: string
    xp: number
    streak_weeks: number
  }
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:ml-64">
        {/* Left - Greeting (mobile) or empty (desktop) */}
        <div className="lg:opacity-0">
          {user && (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white/60" />
                )}
              </Link>
              <span className="text-white/70">Hey {user.name.split(' ')[0]} 👋</span>
            </div>
          )}
        </div>

        {/* Right - Stats */}
        {user && (
          <div className="flex items-center gap-2">
            <StreakBadge weeks={user.streak_weeks} />
            <XPBadge amount={user.xp} />
          </div>
        )}
      </div>
    </header>
  )
}
