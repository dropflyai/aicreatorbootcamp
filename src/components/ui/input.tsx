'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-white/70 mb-2">{label}</label>
        )}
        <input
          type={type}
          className={cn(
            'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3',
            'text-white placeholder:text-white/30',
            'focus:outline-none focus:ring-2 focus:ring-[#BFFF00]/50 focus:border-[#BFFF00]/50',
            'transition-all duration-200',
            'min-h-[48px]',
            error && 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
