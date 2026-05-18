import { redirect } from "next/navigation"
import { createClient } from "@/lib/server/supabase"
import { prisma } from "@/lib/prisma"
import { Sidebar } from "@/components/sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  let profile
  try {
    profile = await prisma.user.findUnique({ where: { id: user.id } })
    if (!profile) {
      profile = await prisma.user.create({
        data: { id: user.id, email: user.email!, name: user.user_metadata?.full_name || user.email?.split("@")[0] },
      })
    }
  } catch { profile = null }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Sidebar user={profile} plan={profile?.plan || "free"} credits={profile?.credits || 5} />
      <main className="flex-1 overflow-y-auto bg-zinc-950">{children}</main>
    </div>
  )
}
