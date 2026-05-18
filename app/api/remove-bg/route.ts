import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server/supabase"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { imageUrl } = await req.json()
    if (!imageUrl) return NextResponse.json({ error: "No image URL" }, { status: 400 })

    const formData = new FormData()
    formData.append("image_url", imageUrl)
    formData.append("size", "auto")

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": process.env.REMOVE_BG_API_KEY! },
      body: formData,
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: `Remove.bg error: ${err}` }, { status: 400 })
    }

    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    return NextResponse.json({ image: `data:image/png;base64,${base64}` })
  } catch (error) {
    console.error("BG remove error:", error)
    return NextResponse.json({ error: "BG removal failed" }, { status: 500 })
  }
}
