"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { useState } from "react"
import { Sparkles, Menu, X } from "lucide-react"

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

export function Navbar({ user }: { user?: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-syne font-black text-lg tracking-tight">
          <Sparkles className="h-5 w-5 text-violet-400" />
          <span className="gradient-text">ThumbAI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${pathname === l.href ? "text-zinc-100 bg-zinc-800" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard"><Button variant="ghost" size="sm">Dashboard</Button></Link>
              <Button variant="secondary" size="sm" onClick={handleSignOut}>Sign out</Button>
            </>
          ) : (
            <>
              <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
              <Link href="/register"><Button size="sm">Get Started Free</Button></Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden p-2 text-zinc-400" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 flex flex-col gap-2">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800">
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            {user ? (
              <><Link href="/dashboard"><Button className="w-full" variant="ghost" size="sm">Dashboard</Button></Link>
              <Button className="w-full" variant="secondary" size="sm" onClick={handleSignOut}>Sign out</Button></>
            ) : (
              <><Link href="/login"><Button className="w-full" variant="ghost" size="sm">Sign in</Button></Link>
              <Link href="/register"><Button className="w-full" size="sm">Get Started Free</Button></Link></>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
