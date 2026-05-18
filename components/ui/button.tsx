import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg shadow-violet-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30",
        secondary: "bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:border-zinc-600",
        ghost: "bg-transparent border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-600",
        outline: "bg-transparent border border-violet-500 text-violet-400 hover:bg-violet-500/10",
        destructive: "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20",
        success: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20",
        cyan: "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>{children}</>
        ) : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
