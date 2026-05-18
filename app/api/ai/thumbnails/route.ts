import { NextRequest, NextResponse } from "next/server"
import { generateThumbnailIdeas } from "@/lib/groq"
import { createClient } from "@/lib/server/supabase"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { prompt, style = "Dramatic", niche = "Tech" } = await req.json()
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 })

    const concepts = await generateThumbnailIdeas(prompt, style, niche)
    const withScores = concepts.map((c: any, i: number) => ({
      ...c,
      aiScore: Math.max(70, 96 - i * 4 + Math.floor(Math.random() * 6)),
    }))

    return NextResponse.json({ concepts: withScores })
  } catch (error) {
    console.error("Thumbnail generation error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
export const dynamic = "force-dynamic"
