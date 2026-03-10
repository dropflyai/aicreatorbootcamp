'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/create', icon: Sparkles, label: 'Create' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/90 backdrop-blur-xl border-t border-white/5 px-6 py-2 pb-safe z-50 lg:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 py-2 px-4 transition-colors duration-200',
                isActive ? 'text-[#BFFF00]' : 'text-white/50 hover:text-white/70'
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-[#BFFF00] rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
