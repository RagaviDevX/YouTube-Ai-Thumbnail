import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

const categories = ["All","Gaming","Tech","Finance","Vlog","Education","Podcast","Business","Reaction"]

const templates = [
  { name:"Gaming Rage", category:"Gaming", emoji:"🎮", gradient:"from-violet-900 to-indigo-950", premium:true },
  { name:"Tech Review", category:"Tech", emoji:"💻", gradient:"from-slate-900 to-blue-950", premium:false },
  { name:"Finance Bold", category:"Finance", emoji:"💰", gradient:"from-gray-900 to-emerald-950", premium:false },
  { name:"Reaction Shock", category:"Reaction", emoji:"😱", gradient:"from-purple-900 to-rose-950", premium:true },
  { name:"Podcast Pro", category:"Podcast", emoji:"🎙️", gradient:"from-blue-950 to-indigo-950", premium:false },
  { name:"Education Clean", category:"Education", emoji:"📚", gradient:"from-emerald-950 to-blue-950", premium:false },
  { name:"Vlog Lifestyle", category:"Vlog", emoji:"📸", gradient:"from-pink-950 to-violet-950", premium:true },
  { name:"Startup Story", category:"Business", emoji:"🚀", gradient:"from-slate-950 to-indigo-950", premium:true },
  { name:"World Record", category:"Gaming", emoji:"🏆", gradient:"from-amber-950 to-orange-950", premium:true },
  { name:"AI Tutorial", category:"Tech", emoji:"🤖", gradient:"from-cyan-950 to-blue-950", premium:false },
  { name:"Wealth Guide", category:"Finance", emoji:"💎", gradient:"from-yellow-950 to-amber-950", premium:true },
  { name:"Travel Vlog", category:"Vlog", emoji:"✈️", gradient:"from-sky-950 to-cyan-950", premium:false },
]

export default function TemplatesPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">TEMPLATES</p>
          <h1 className="font-syne text-5xl font-black tracking-tight mb-4">50+ Proven Thumbnail Templates</h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">Every template is optimized for high CTR, built by studying the top 1% of viral YouTube thumbnails.</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(c => (
            <button key={c} className="px-4 py-1.5 rounded-full text-sm font-medium border border-zinc-700 text-zinc-400 hover:border-violet-500 hover:text-violet-300 transition-all">
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {templates.map(t => (
            <Link href="/register" key={t.name}>
              <div className="group rounded-xl overflow-hidden border border-zinc-800 hover:border-violet-500 hover:-translate-y-1 transition-all cursor-pointer">
                <div className={`h-28 bg-gradient-to-br ${t.gradient} flex items-center justify-center text-4xl relative`}>
                  {t.emoji}
                  <div className="absolute inset-0 bg-violet-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-white text-sm font-semibold">Use Template →</span>
                  </div>
                  {t.premium && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="warning" className="text-[9px]">PRO</Badge>
                    </div>
                  )}
                </div>
                <div className="bg-zinc-900 p-3">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.category} · {t.premium ? "Premium" : "Free"}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 rounded-2xl p-12">
          <h2 className="font-syne font-black text-3xl mb-3">Get Access to All Templates</h2>
          <p className="text-zinc-400 mb-6">Upgrade to Pro for 50+ templates, unlimited generation, and HD export.</p>
          <Link href="/register"><Button size="lg" className="gap-2"><Sparkles className="h-4 w-4" /> Start Free Trial</Button></Link>
        </div>
      </div>
    </div>
  )
}
