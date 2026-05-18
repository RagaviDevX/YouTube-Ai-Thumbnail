import { cn } from "@/lib/utils"

interface ProgressProps { value: number; className?: string; barClassName?: string }
export function Progress({ value, className, barClassName }: ProgressProps) {
  return (
    <div className={cn("h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-500", barClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
