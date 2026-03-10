'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none min-h-[48px] px-6',
  {
    variants: {
      variant: {
        primary: 'bg-[#BFFF00] text-black hover:bg-[#D4FF4D] hover:shadow-[0_0_20px_rgba(191,255,0,0.3)]',
        secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
        ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
        destructive: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
        outline: 'bg-transparent text-white border border-white/20 hover:bg-white/5',
      },
      size: {
        sm: 'min-h-[36px] px-4 text-sm rounded-lg',
        md: 'min-h-[48px] px-6 text-base',
        lg: 'min-h-[56px] px-8 text-lg',
        icon: 'min-h-[48px] min-w-[48px] p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
