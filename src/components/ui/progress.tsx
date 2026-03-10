'use client'

import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  variant?: 'default' | 'xp' | 'streak'
}

export function Progress({
  value,
  max = 100,
  className,
  showLabel = false,
  variant = 'default',
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>{value.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      )}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            {
              'bg-white/30': variant === 'default',
              'bg-gradient-to-r from-[#BFFF00] to-[#00FF88]': variant === 'xp',
              'bg-gradient-to-r from-orange-500 to-red-500': variant === 'streak',
            }
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Week dots for streak visualization
interface WeekDotsProps {
  completed: number
  total?: number
  className?: string
}

export function WeekDots({ completed, total = 10, className }: WeekDotsProps) {
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-3 h-3 rounded-full transition-colors',
            i < completed ? 'bg-[#BFFF00]' : 'bg-white/10'
          )}
        />
      ))}
    </div>
  )
}
