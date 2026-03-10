'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Sparkles, Images, Trophy, User, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { XPBadge, StreakBadge } from '@/components/ui/badge'

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/create', icon: Sparkles, label: 'Create' },
  { href: '/gallery', icon: Images, label: 'Gallery' },
  { href: '/challenges', icon: Trophy, label: 'Challenges' },
]

interface SidebarProps {
  user?: {
    name: string
    avatar_url?: string
    level: number
    xp: number
    streak_weeks: number
  }
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0D0D0D] border-r border-white/5 flex-col hidden lg:flex z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#BFFF00] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <span className="font-bold text-lg">Creator Bootcamp</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-[#BFFF00]/10 text-[#BFFF00]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User section */}
      {user && (
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-white/60" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{user.name}</p>
              <p className="text-sm text-white/50">Level {user.level}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <StreakBadge weeks={user.streak_weeks} className="text-xs" />
            <XPBadge amount={user.xp} className="text-xs" />
          </div>

          <div className="flex gap-2">
            <Link
              href="/profile/settings"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              className="flex items-center justify-center px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
