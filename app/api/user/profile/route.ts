import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server/supabase"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    let profile = await prisma.user.findUnique({ where: { id: user.id } })
    if (!profile) {
      profile = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.full_name || user.email?.split("@")[0],
          avatar: user.user_metadata?.avatar_url,
        },
      })
    }
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { name: body.name, avatar: body.avatar },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
export const dynamic = "force-dynamic"
