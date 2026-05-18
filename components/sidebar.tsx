"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase"
import {
  LayoutDashboard, Image, Type, Mic2, FolderOpen,
  LayoutTemplate, CreditCard, User, Settings,
  LogOut, Sparkles, ShieldCheck, Zap
} from "lucide-react"

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
]
const createNav = [
  { href: "/generate/thumbnails", label: "AI Thumbnails", icon: Image },
  { href: "/generate/titles", label: "Title Generator", icon: Type },
  { href: "/generate/hooks", label: "Hook Generator", icon: Mic2 },
]
const manageNav = [
  { href: "/dashboard/projects", label: "My Projects", icon: FolderOpen },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
]
const accountNav = [
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/profile", label: "Profile", icon: User },
]

export function Sidebar({ user, plan = "free", credits = 5 }: { user?: any; plan?: string; credits?: number }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  function NavItem({ href, label, icon: Icon }: { href: string; label: string; icon: any }) {
    const active = pathname === href
    return (
      <Link href={href} className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
        active ? "bg-violet-500/15 text-violet-300 border border-violet-500/20" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
      )}>
        <Icon className="h-4 w-4 flex-shrink-0" />
        {label}
      </Link>
    )
  }

  const maxCredits = plan === "free" ? 5 : 999
  const usedPercent = plan === "free" ? ((maxCredits - credits) / maxCredits) * 100 : 20

  return (
    <aside className="w-60 flex-shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2 font-syne font-black text-base">
          <Sparkles className="h-4 w-4 text-violet-400" />
          <span className="gradient-text">ThumbAI</span>
        </Link>
        <p className="text-[11px] text-zinc-500 mt-1">Creator Studio</p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {mainNav.map(i => <NavItem key={i.href} {...i} />)}

        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 pt-4 pb-2">Create</p>
        {createNav.map(i => <NavItem key={i.href} {...i} />)}

        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 pt-4 pb-2">Manage</p>
        {manageNav.map(i => <NavItem key={i.href} {...i} />)}

        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 pt-4 pb-2">Account</p>
        {accountNav.map(i => <NavItem key={i.href} {...i} />)}

        {user?.role === "admin" && (
          <>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 pt-4 pb-2">Admin</p>
            <NavItem href="/admin" label="Admin Panel" icon={ShieldCheck} />
          </>
        )}
      </nav>

      {/* Credits */}
      <div className="p-3 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-lg p-3 mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
              <Zap className="h-3 w-3 text-violet-400" /> AI Credits
            </span>
            <Badge variant={plan === "free" ? "free" : "pro"} className="text-[10px]">
              {plan === "free" ? "FREE" : "PRO"}
            </Badge>
          </div>
          <Progress value={plan === "free" ? usedPercent : 20} />
          <p className="text-[11px] text-zinc-500 mt-1.5">
            {plan === "free" ? `${credits}/5 left today` : "Unlimited"} ·{" "}
            <Link href="/billing" className="text-violet-400 hover:text-violet-300">Upgrade</Link>
          </p>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  )
}
