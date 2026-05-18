import { NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"
import { createClient } from "@/lib/server/supabase"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { image, folder } = await req.json()
    if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 })

    const result = await uploadImage(image, folder || `thumbai/${user.id}`)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
