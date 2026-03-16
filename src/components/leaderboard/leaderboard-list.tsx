'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

const levelNames = [
  'Spark', 'Kindling', 'Flame', 'Fire', 'Blaze',
  'Inferno', 'Wildfire', 'Beacon', 'Torch', 'Legend'
]

interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  level: number
  xp: number
  badgeCount: number
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
  if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
  return <span className="text-sm font-mono text-white/40 w-5 text-center">{rank}</span>
}

function rankStyles(rank: number): string {
  if (rank === 1) return 'bg-yellow-400/10 border border-yellow-400/20'
  if (rank === 2) return 'bg-gray-300/5 border border-gray-300/10'
  if (rank === 3) return 'bg-amber-600/10 border border-amber-600/20'
  return 'bg-white/5'
}

export function LeaderboardList({
  entries,
  currentUserId,
}: {
  entries: LeaderboardEntry[]
  currentUserId: string
}) {
  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.userId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
            rankStyles(entry.rank),
            entry.userId === currentUserId && 'ring-1 ring-[#BFFF00]/50 bg-[#BFFF00]/5'
          )}
        >
          {/* Rank */}
          <div className="flex items-center justify-center w-8 flex-shrink-0">
            <RankIcon rank={entry.rank} />
          </div>

          {/* Avatar initial */}
          <div
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
              entry.rank === 1
                ? 'bg-yellow-400/20 text-yellow-400'
                : entry.rank === 2
                ? 'bg-gray-300/20 text-gray-300'
                : entry.rank === 3
                ? 'bg-amber-600/20 text-amber-500'
                : 'bg-white/10 text-white/70'
            )}
          >
            {entry.name?.[0]?.toUpperCase() || '?'}
          </div>

          {/* Name + Level */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'font-medium truncate',
                  entry.userId === currentUserId && 'text-[#BFFF00]'
                )}
              >
                {entry.name}
              </span>
              {entry.userId === currentUserId && (
                <span className="text-xs text-[#BFFF00]/60 flex-shrink-0">you</span>
              )}
            </div>
            <p className="text-xs text-white/40">
              {levelNames[entry.level - 1] || 'Unknown'}
            </p>
          </div>

          {/* XP */}
          <div className="text-right flex-shrink-0">
            <div className="text-sm font-mono font-bold text-[#BFFF00]">
              {entry.xp.toLocaleString()}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">XP</div>
          </div>

          {/* Badge count */}
          <div className="flex items-center gap-1 flex-shrink-0 min-w-[40px] justify-end">
            <span className="text-base">🏅</span>
            <span className="text-xs text-white/50">{entry.badgeCount}</span>
          </div>
        </motion.div>
      ))}

      {entries.length === 0 && (
        <div className="text-center py-16 text-white/40">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No classmates yet. Be the first to earn XP!</p>
        </div>
      )}
    </div>
  )
}
