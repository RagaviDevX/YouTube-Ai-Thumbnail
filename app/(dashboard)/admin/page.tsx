import { redirect } from "next/navigation"
import { createClient } from "@/lib/server/supabase"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatCurrency, getInitials } from "@/lib/utils"
import { Users, TrendingUp, CreditCard, Zap, ShieldCheck } from "lucide-react"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  let dbUser: any = null
  let stats = { totalUsers: 0, proUsers: 0, totalRevenue: 0, recentUsers: [] as any[] }

  try {
    dbUser = await prisma.user.findUnique({ where: { id: user.id } })
    if (dbUser?.role !== "admin") redirect("/dashboard")

    const [totalUsers, proUsers, payments, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { plan: { in: ["pro", "business"] } } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "paid" } }),
      prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: { id: true, email: true, name: true, plan: true, createdAt: true, role: true },
      }),
    ])
    stats = { totalUsers, proUsers, totalRevenue: (payments._sum.amount || 0) / 100, recentUsers }
  } catch {
    redirect("/dashboard")
  }

  const metricCards = [
    { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "text-cyan-400" },
    { label: "Pro Subscribers", value: stats.proUsers.toLocaleString(), icon: Zap, color: "text-violet-400" },
    { label: "Total Revenue", value: formatCurrency(stats.totalRevenue), icon: CreditCard, color: "text-emerald-400" },
    { label: "Conversion Rate", value: `${stats.totalUsers > 0 ? ((stats.proUsers / stats.totalUsers) * 100).toFixed(1) : 0}%`, icon: TrendingUp, color: "text-pink-400" },
  ]

  const planColors: Record<string, any> = { free: "free", pro: "pro", business: "business" }

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-red-400" /> Admin Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Platform overview · Real-time analytics</p>
        </div>
        <Badge variant="danger">🔴 Admin Access</Badge>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricCards.map(m => (
          <Card key={m.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-600">{m.label}</p>
              <m.icon className={`h-4 w-4 ${m.color}`} />
            </div>
            <p className={`font-syne font-black text-2xl ${m.color}`}>{m.value}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Cards */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        {[
          { plan: "Pro Plan", users: stats.proUsers, mrr: stats.proUsers * 999, color: "from-violet-500/10 to-transparent border-violet-500/20" },
          { plan: "Business Plan", users: 0, mrr: 0, color: "from-amber-500/10 to-transparent border-amber-500/20" },
          { plan: "Free Plan", users: stats.totalUsers - stats.proUsers, mrr: 0, color: "from-zinc-800/30 to-transparent" },
        ].map(r => (
          <Card key={r.plan} className={`bg-gradient-to-br ${r.color}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 mb-2">{r.plan}</p>
            <p className="font-syne font-black text-2xl mb-1">{r.users.toLocaleString()}</p>
            <p className="text-xs text-zinc-500">subscribers</p>
            {r.mrr > 0 && (
              <p className="text-sm font-semibold text-emerald-400 mt-2">
                MRR: {formatCurrency(r.mrr)}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-zinc-800">
          <p className="font-syne font-bold text-base">Recent Users</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                {["User","Email","Plan","Joined","Role"].map(h => (
                  <th key={h} className="text-left text-xs font-bold uppercase tracking-wide text-zinc-600 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recentUsers.map((u: any) => (
                <tr key={u.id} className="border-b border-zinc-800/60 hover:bg-zinc-900/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {getInitials(u.name || u.email)}
                      </div>
                      <span className="text-sm font-medium">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-400">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={planColors[u.plan] || "default"} className="text-[10px]">
                      {(u.plan || "free").toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-500">{formatDate(u.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={u.role === "admin" ? "danger" : "default"} className="text-[10px]">
                      {(u.role || "user").toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
              {stats.recentUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-zinc-600">No users yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
