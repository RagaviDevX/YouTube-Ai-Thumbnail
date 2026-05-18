import { cn } from "@/lib/utils"

interface BadgeProps { children: React.ReactNode; variant?: "default"|"pro"|"business"|"free"|"success"|"warning"|"danger"|"cyan"; className?: string }

const variants: Record<string, string> = {
  default: "bg-zinc-800 text-zinc-300 border-zinc-700",
  pro: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  business: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  free: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  danger: "bg-red-500/15 text-red-300 border-red-500/30",
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border", variants[variant], className)}>
      {children}
    </span>
  )
}
