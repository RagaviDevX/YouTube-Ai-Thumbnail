import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Image, Type, Mic2, Scissors, Cloud, CreditCard, Check } from "lucide-react"

const features = [
  {
    icon: Image, title: "AI Thumbnail Generator", tag: "Core Feature", tagVariant: "pro" as const,
    desc: "Describe your video and get 4 stunning thumbnail concepts in under 10 seconds. Our AI understands YouTube aesthetics, emotional triggers, and niche-specific design patterns.",
    bullets: ["Prompt-based generation with style controls","50+ premium niche-specific templates","Real-time canvas editor","1280×720 HD export","AI quality score (0–100)","Batch generation for A/B testing"],
    gradient: "from-violet-500/10 to-transparent border-violet-500/20",
  },
  {
    icon: Type, title: "Viral Title Generator", tag: "LLaMA 3.3 70B", tagVariant: "cyan" as const,
    desc: "Generate 10 high-CTR YouTube titles using proven viral formulas. Each title uses curiosity gaps, power words, emotional triggers, and niche-specific language patterns.",
    bullets: ["10 title variations per prompt","Predicted CTR score (0–100)","6 tone options: shocking, curious, educational...","Niche-optimized language","One-click copy to clipboard","A/B testing ready"],
    gradient: "from-cyan-500/10 to-transparent border-cyan-500/20",
  },
  {
    icon: Mic2, title: "Hook Generator", tag: "Retention AI", tagVariant: "business" as const,
    desc: "Craft compelling video openings that hook viewers in the first 15 seconds. Higher retention signals better algorithm ranking — more views, more growth.",
    bullets: ["5 hook styles: Question, Story, Stat, Controversy, Promise","Estimated retention percentage","15s, 30s, 60s length options","Script outline integration","Copy with one click"],
    gradient: "from-pink-500/10 to-transparent border-pink-500/20",
  },
  {
    icon: Scissors, title: "Background Remover", tag: "Remove.bg API", tagVariant: "success" as const,
    desc: "Upload any photo and remove the background in under 1 second. Perfect for creator face cutouts — the staple ingredient of viral thumbnails.",
    bullets: ["Pixel-perfect AI edge detection","PNG transparent export","Auto-place cutout on thumbnail","Batch processing for Pro users","Works on any image format"],
    gradient: "from-emerald-500/10 to-transparent border-emerald-500/20",
  },
]

export default function FeaturesPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">FEATURES</p>
          <h1 className="font-syne text-5xl font-black tracking-tight mb-4">Everything Built for<br />YouTube Domination</h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">A complete AI toolkit designed to help creators grow their channels faster with data-driven thumbnails and titles.</p>
        </div>

        <div className="space-y-6">
          {features.map((f, i) => (
            <Card key={f.title} className={`bg-gradient-to-br ${f.gradient} grid md:grid-cols-2 gap-8 p-8`}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <Badge variant={f.tagVariant}>{f.tag}</Badge>
                </div>
                <h2 className="font-syne font-black text-2xl mb-3">{f.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
              <ul className="space-y-2.5">
                {f.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />{b}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/register">
            <Button size="xl" className="gap-2">
              <Sparkles className="h-5 w-5" /> Start Free — No Credit Card Required
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
