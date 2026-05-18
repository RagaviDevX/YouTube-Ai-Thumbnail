import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

function Separator({ className, orientation = "horizontal", ...props }: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      className={cn(orientation === "horizontal" ? "h-px w-full bg-zinc-800" : "h-full w-px bg-zinc-800", className)}
      {...props}
    />
  )
}
export { Separator }
