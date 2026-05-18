import { NextResponse } from "next/server"
import { createClient } from "@/lib/server/supabase"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
    if (dbUser?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const [totalUsers, proUsers, totalPayments, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { plan: { in: ["pro", "business"] } } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "paid" } }),
      prisma.user.findMany({ take: 10, orderBy: { createdAt: "desc" }, select: { id: true, email: true, name: true, plan: true, createdAt: true } }),
    ])

    return NextResponse.json({
      totalUsers,
      proUsers,
      totalRevenue: (totalPayments._sum.amount || 0) / 100,
      recentUsers,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
export const dynamic = "force-dynamic"
