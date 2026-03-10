import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive' | 'featured'
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        {
          'bg-[#161616] border border-white/5': variant === 'default',
          'bg-white/[0.03] backdrop-blur-xl border border-white/10': variant === 'glass',
          'bg-[#161616] border border-white/5 cursor-pointer transition-all duration-200 hover:border-white/20 hover:bg-[#1A1A1A] hover:-translate-y-1': variant === 'interactive',
          'bg-[#161616] border border-[#BFFF00]/20 shadow-[0_0_30px_rgba(191,255,0,0.1)]': variant === 'featured',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-xl font-semibold text-white', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-white/60 text-sm mt-1', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-4 pt-4 border-t border-white/5', className)} {...props} />
}
