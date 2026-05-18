"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/toaster"
import { createClient } from "@/lib/supabase"
import { Sparkles, Check } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { toast("Password must be at least 8 characters", "error"); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name }, emailRedirectTo: `${location.origin}/auth/callback` },
    })
    if (error) { toast(error.message, "error") }
    else { toast("Account created! Check your email to confirm."); router.push("/dashboard") }
    setLoading(false)
  }

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/auth/callback` } })
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 font-syne font-black text-2xl mb-2">
          <Sparkles className="h-6 w-6 text-violet-400" />
          <span className="gradient-text">ThumbAI</span>
        </Link>
        <h1 className="font-syne font-black text-2xl mt-2">Create your account</h1>
        <p className="text-sm text-zinc-400 mt-1">Start generating viral thumbnails for free</p>
      </div>
      <Card className="border-zinc-800">
        <div className="flex flex-col gap-2 mb-5">
          {["5 free thumbnail generations/day","AI title & hook generator","Basic templates included"].map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-zinc-400">
              <Check className="h-3.5 w-3.5 text-emerald-400" />{f}
            </div>
          ))}
        </div>
        <button onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-all text-sm font-medium mb-5">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-xs text-zinc-600">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div><Label className="mb-1.5 block">Full Name</Label>
            <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required /></div>
          <div><Label className="mb-1.5 block">Email Address</Label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div><Label className="mb-1.5 block">Password</Label>
            <Input type="password" placeholder="Min 8 characters" value={password} onChange={e => setPassword(e.target.value)} required /></div>
          <Button type="submit" className="w-full" loading={loading}>Create Free Account →</Button>
        </form>
        <p className="text-center text-sm text-zinc-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">Sign in</Link>
        </p>
      </Card>
    </div>
  )
}
