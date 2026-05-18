import { createClient } from "@/lib/server/supabase"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FolderOpen, Plus, Image } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let thumbnails: any[] = []
  try {
    thumbnails = await prisma.thumbnail.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
    })
  } catch {}

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight">My Projects</h1>
          <p className="text-sm text-zinc-500 mt-1">{thumbnails.length} thumbnails created</p>
        </div>
        <Link href="/generate/thumbnails">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Thumbnail</Button>
        </Link>
      </div>

      {thumbnails.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-24 text-center border-dashed">
          <FolderOpen className="h-14 w-14 text-zinc-700 mb-5" />
          <p className="font-syne font-bold text-lg mb-2">No projects yet</p>
          <p className="text-sm text-zinc-500 mb-6">Create your first AI thumbnail to see it here</p>
          <Link href="/generate/thumbnails"><Button className="gap-2"><Plus className="h-4 w-4" /> Generate First Thumbnail</Button></Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {thumbnails.map((t: any) => (
            <Card key={t.id} className="p-0 overflow-hidden hover:border-zinc-700 hover:-translate-y-1 transition-all">
              <div className="h-32 bg-gradient-to-br from-violet-900 to-indigo-950 relative overflow-hidden">
                {t.imageUrl ? (
                  <img src={t.imageUrl} alt={t.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="h-8 w-8 text-zinc-700" />
                  </div>
                )}
                {t.aiScore && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="success" className="text-[9px]">Score {t.aiScore}</Badge>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm leading-tight mb-1 truncate">{t.title}</p>
                <p className="text-xs text-zinc-500">{formatDate(t.createdAt)}</p>
                {t.niche && <Badge className="mt-2 text-[9px]" variant="pro">{t.niche}</Badge>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
