import { createClient } from "@/lib/server/supabase"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Image, Type, Mic2, TrendingUp, Zap, ArrowRight, Plus, FolderOpen } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile: any = null
  let recentThumbnails: any[] = []
  try {
    profile = await prisma.user.findUnique({ where: { id: user!.id } })
    recentThumbnails = await prisma.thumbnail.findMany({ where: { userId: user!.id }, take: 5, orderBy: { createdAt: "desc" } })
  } catch {}

  const name = profile?.name || user?.email?.split("@")[0] || "Creator"
  const plan = profile?.plan || "free"

  const quickActions = [
    { href: "/generate/thumbnails", icon: Image, label: "AI Thumbnails", desc: "Generate viral thumbnails", color: "from-violet-600/20 to-purple-600/10 border-violet-500/20" },
    { href: "/generate/titles", icon: Type, label: "Title Generator", desc: "10 high-CTR titles", color: "from-cyan-600/20 to-blue-600/10 border-cyan-500/20" },
    { href: "/generate/hooks", icon: Mic2, label: "Hook Generator", desc: "Boost video retention", color: "from-pink-600/20 to-rose-600/10 border-pink-500/20" },
  ]

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight">Good morning, {name} 👋</h1>
          <p className="text-sm text-zinc-500 mt-1">Here's what's happening with your content today</p>
        </div>
        <Link href="/generate/thumbnails"><Button className="gap-2"><Plus className="h-4 w-4" /> Generate Thumbnail</Button></Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Thumbnails Created", value: recentThumbnails.length.toString(), color: "text-violet-400" },
          { label: "Avg CTR Boost", value: "+340%", color: "text-cyan-400" },
          { label: "Plan", value: plan.toUpperCase(), color: "text-amber-400", isPlan: true },
          { label: "Credits Today", value: plan === "free" ? `${profile?.credits || 5}/5` : "∞", color: "text-emerald-400" },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 mb-2">{s.label}</p>
            <div className={`font-syne font-black text-2xl ${s.color}`}>
              {s.isPlan ? <Badge variant={plan === "free" ? "free" : plan === "pro" ? "pro" : "business"}>{s.value}</Badge> : s.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="font-syne font-bold text-base mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map(a => (
              <Link key={a.href} href={a.href}>
                <div className={`flex items-center gap-4 p-4 rounded-xl border bg-gradient-to-br ${a.color} hover:scale-[1.02] transition-all cursor-pointer`}>
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/60 flex items-center justify-center flex-shrink-0">
                    <a.icon className="h-5 w-5 text-zinc-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{a.label}</div>
                    <div className="text-xs text-zinc-400">{a.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
          {plan === "free" && (
            <Card className="mt-4 bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-violet-500/20">
              <p className="font-syne font-bold text-sm mb-1">Upgrade to Pro</p>
              <p className="text-xs text-zinc-400 mb-3">Unlimited generations, HD export, no watermark</p>
              <Link href="/billing"><Button size="sm" className="w-full">Upgrade Now</Button></Link>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-syne font-bold text-base">Recent Thumbnails</h2>
            <Link href="/dashboard/projects" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          {recentThumbnails.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <FolderOpen className="h-12 w-12 text-zinc-700 mb-4" />
              <p className="font-semibold text-zinc-400 mb-1">No thumbnails yet</p>
              <p className="text-sm text-zinc-600 mb-4">Create your first AI thumbnail to get started</p>
              <Link href="/generate/thumbnails"><Button size="sm">Generate First Thumbnail</Button></Link>
            </Card>
          ) : (
            <div className="space-y-2">
              {recentThumbnails.map((t: any) => (
                <Card key={t.id} className="flex items-center gap-4 p-4 hover:border-zinc-700 transition-all">
                  <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-violet-900 to-indigo-950 flex-shrink-0 overflow-hidden">
                    {t.imageUrl && <img src={t.imageUrl} alt={t.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{t.title}</p>
                    <p className="text-xs text-zinc-500">{formatDate(t.createdAt)} · {t.niche || "General"}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {t.aiScore && <Badge variant="success" className="text-[10px]">Score {t.aiScore}</Badge>}
                    <Badge variant="cyan" className="text-[10px]">HD</Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
