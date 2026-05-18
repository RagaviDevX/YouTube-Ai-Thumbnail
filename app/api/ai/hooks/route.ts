import { NextRequest, NextResponse } from "next/server"
import { generateHooks } from "@/lib/groq"
import { createClient } from "@/lib/server/supabase"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { topic, style = "Question", length = "30s" } = await req.json()
    if (!topic) return NextResponse.json({ error: "Topic is required" }, { status: 400 })

    const hooks = await generateHooks(topic, style, length)
    return NextResponse.json({ hooks })
  } catch (error) {
    console.error("Hook generation error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
export const dynamic = "force-dynamic"
