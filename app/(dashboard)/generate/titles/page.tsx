"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toaster"
import { Type, Sparkles, Copy, CheckCheck } from "lucide-react"

interface TitleResult { title: string; ctrScore: number }

export default function TitleGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [niche, setNiche] = useState("Tech")
  const [tone, setTone] = useState("Shocking")
  const [loading, setLoading] = useState(false)
  const [titles, setTitles] = useState<TitleResult[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  async function handleGenerate() {
    if (!topic.trim()) { toast("Please enter your video topic", "error"); return }
    setLoading(true); setTitles([])
    try {
      const res = await fetch("/api/ai/titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, niche, tone }),
      })
      const data = await res.json()
      if (data.error) { toast(data.error, "error"); return }
      setTitles(data.titles || [])
      toast(`Generated ${(data.titles || []).length} viral titles!`)
    } catch { toast("Generation failed", "error") }
    finally { setLoading(false) }
  }

  function copyTitle(title: string, i: number) {
    navigator.clipboard.writeText(title)
    setCopied(i)
    toast("Title copied!")
    setTimeout(() => setCopied(null), 2000)
  }

  const getBadgeVariant = (score: number) => score >= 88 ? "success" : score >= 75 ? "warning" : "default"

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight">Viral Title Generator</h1>
          <p className="text-sm text-zinc-500 mt-1">Groq LLaMA 3.3 70B · 10 high-CTR titles per prompt</p>
        </div>
        <Badge variant="cyan">Unlimited on Pro</Badge>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <Label className="mb-2 block">What is your video about?</Label>
            <Textarea rows={4}
              placeholder="e.g. I spent 30 days building a SaaS app from scratch with zero coding experience using only AI tools..."
              value={topic} onChange={e => setTopic(e.target.value)} className="mb-4" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <Label className="mb-1.5 block">Tone</Label>
                <Select value={tone} onChange={e => setTone(e.target.value)}>
                  {["Shocking","Curious","Educational","Inspirational","Controversial","Urgent"].map(t => <option key={t}>{t}</option>)}
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block">Niche</Label>
                <Select value={niche} onChange={e => setNiche(e.target.value)}>
                  {["Tech","Gaming","Finance","Vlog","Education","Podcast","Fitness","Business"].map(n => <option key={n}>{n}</option>)}
                </Select>
              </div>
            </div>
            <Button className="w-full gap-2" loading={loading} onClick={handleGenerate}>
              <Sparkles className="h-4 w-4" /> Generate 10 Viral Titles
            </Button>
          </Card>

          <Card className="mt-4 bg-gradient-to-br from-cyan-500/5 to-transparent border-cyan-500/20">
            <p className="font-semibold text-sm mb-2">💡 Pro Tips</p>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>• Include numbers for higher CTR ("7 Ways", "30 Days")</li>
              <li>• Use power words: Secret, Never, Always, Shocking</li>
              <li>• Create curiosity gaps — don't give everything away</li>
              <li>• Target emotion: fear, excitement, curiosity</li>
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {loading && (
            <div className="space-y-3">
              {Array(5).fill(0).map((_, i) => <div key={i} className="skeleton h-16 w-full rounded-xl" />)}
            </div>
          )}

          {!loading && titles.length === 0 && (
            <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed">
              <Type className="h-10 w-10 text-zinc-700 mb-4" />
              <p className="font-semibold text-zinc-500">No titles yet</p>
              <p className="text-sm text-zinc-600 mt-1">Enter your topic and generate 10 viral titles</p>
            </Card>
          )}

          {!loading && titles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-sm text-zinc-400">{titles.length} titles generated</p>
                <Badge variant="success" className="text-[10px]">{titles.length} results</Badge>
              </div>
              <div className="space-y-2">
                {titles.map((t, i) => (
                  <Card key={i} className={`flex items-center gap-4 p-4 hover:border-zinc-700 transition-all ${i === 0 ? "border-violet-500/40 bg-violet-500/5" : ""}`}>
                    <span className="font-syne font-black text-2xl text-zinc-700 min-w-[32px]">{i+1}</span>
                    <p className="flex-1 text-sm font-medium leading-snug">{t.title}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={getBadgeVariant(t.ctrScore)} className="text-[10px]">CTR {t.ctrScore}</Badge>
                      <button onClick={() => copyTitle(t.title, i)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-zinc-400 hover:text-zinc-200">
                        {copied === i ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
