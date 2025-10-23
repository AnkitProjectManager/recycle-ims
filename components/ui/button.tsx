import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ola-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-green-500 text-white shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105 active:scale-95 font-semibold',
        destructive: 'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl hover:scale-105 active:scale-95 font-semibold',
        outline: 'border-2 border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 active:scale-95 font-semibold',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105 active:scale-95 font-semibold',
        ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-xl active:scale-95 font-semibold',
        link: 'text-green-600 underline-offset-4 hover:underline hover:text-green-700 font-semibold',
      },
      size: {
        default: 'h-11 px-6 py-2.5 has-[>svg]:px-5',
        sm: 'h-9 rounded-lg gap-1.5 px-4 text-xs has-[>svg]:px-3',
        lg: 'h-12 rounded-xl px-8 text-base has-[>svg]:px-6',
        icon: 'size-11 rounded-xl',
        'icon-sm': 'size-9 rounded-lg',
        'icon-lg': 'size-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
