import { NextRequest, NextResponse } from "next/server"
import { generateTitles } from "@/lib/groq"
import { createClient } from "@/lib/server/supabase"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { topic, niche = "General", tone = "Engaging" } = await req.json()
    if (!topic) return NextResponse.json({ error: "Topic is required" }, { status: 400 })

    const titles = await generateTitles(topic, niche, tone)
    const withScores = titles.map((title: string, i: number) => ({
      title,
      ctrScore: Math.max(60, 95 - i * 3 + Math.floor(Math.random() * 5)),
    }))

    return NextResponse.json({ titles: withScores })
  } catch (error) {
    console.error("Title generation error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
export const dynamic = "force-dynamic"
