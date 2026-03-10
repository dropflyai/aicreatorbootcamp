import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
  {
    variants: {
      variant: {
        xp: 'bg-[#BFFF00]/10 text-[#BFFF00] font-mono',
        level: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30',
        streak: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
        skill: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        default: 'bg-white/5 text-white/70 border border-white/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// XP Badge with icon
export function XPBadge({ amount, className }: { amount: number; className?: string }) {
  return (
    <Badge variant="xp" className={className}>
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          fill="currentColor"
        />
      </svg>
      {amount.toLocaleString()} XP
    </Badge>
  )
}

// Streak Badge with fire
export function StreakBadge({ weeks, className }: { weeks: number; className?: string }) {
  return (
    <Badge variant="streak" className={className}>
      <span className="text-base">🔥</span>
      {weeks} week{weeks !== 1 ? 's' : ''}
    </Badge>
  )
}

// Level Badge
export function LevelBadge({ level, className }: { level: number; className?: string }) {
  const levelNames = [
    'Spark', 'Kindling', 'Flame', 'Fire', 'Blaze',
    'Inferno', 'Wildfire', 'Beacon', 'Torch', 'Legend'
  ]

  return (
    <Badge variant="level" className={className}>
      <span className="text-base">⚡</span>
      Level {level}: {levelNames[level - 1] || 'Unknown'}
    </Badge>
  )
}
