"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toaster"
import { Mic2, Sparkles, Copy, CheckCheck } from "lucide-react"

interface HookResult { type: string; hook: string; retention: number }

const typeEmoji: Record<string, string> = { Question:"❓", "Shocking Stat":"📊", Story:"📖", Controversy:"🔥", Promise:"🎯" }
const typeColor: Record<string, string> = {
  Question:"border-violet-500/30 bg-violet-500/5",
  "Shocking Stat":"border-cyan-500/30 bg-cyan-500/5",
  Story:"border-amber-500/30 bg-amber-500/5",
  Controversy:"border-red-500/30 bg-red-500/5",
  Promise:"border-emerald-500/30 bg-emerald-500/5",
}

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [style, setStyle] = useState("Question")
  const [length, setLength] = useState("30s")
  const [loading, setLoading] = useState(false)
  const [hooks, setHooks] = useState<HookResult[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  async function handleGenerate() {
    if (!topic.trim()) { toast("Please enter your video topic", "error"); return }
    setLoading(true); setHooks([])
    try {
      const res = await fetch("/api/ai/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style, length }),
      })
      const data = await res.json()
      if (data.error) { toast(data.error, "error"); return }
      setHooks(data.hooks || [])
      toast(`Generated ${(data.hooks || []).length} powerful hooks!`)
    } catch { toast("Generation failed", "error") }
    finally { setLoading(false) }
  }

  function copyHook(hook: string, i: number) {
    navigator.clipboard.writeText(hook)
    setCopied(i)
    toast("Hook copied to clipboard!")
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight">Hook Generator</h1>
          <p className="text-sm text-zinc-500 mt-1">Craft video openings that retain 80%+ of viewers past 30 seconds</p>
        </div>
        <Badge variant="business" className="gap-1"><Mic2 className="h-3 w-3" />Retention AI</Badge>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <Label className="mb-2 block">Your video topic</Label>
            <Textarea rows={4}
              placeholder="e.g. How I went from broke to making ₹1 Lakh/month as a freelancer in 6 months..."
              value={topic} onChange={e => setTopic(e.target.value)} className="mb-4" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <Label className="mb-1.5 block">Hook Style</Label>
                <Select value={style} onChange={e => setStyle(e.target.value)}>
                  {["Question","Shocking Stat","Story","Controversy","Promise"].map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block">Length</Label>
                <Select value={length} onChange={e => setLength(e.target.value)}>
                  {["15s","30s","60s"].map(l => <option key={l}>{l}</option>)}
                </Select>
              </div>
            </div>
            <Button className="w-full gap-2" loading={loading} onClick={handleGenerate}>
              <Sparkles className="h-4 w-4" /> Generate Hooks
            </Button>
          </Card>

          <Card className="mt-4 bg-gradient-to-br from-pink-500/5 to-transparent border-pink-500/20">
            <p className="font-semibold text-sm mb-2">📈 Why Hooks Matter</p>
            <div className="space-y-2 text-xs text-zinc-400">
              <p>• YouTube's algorithm rewards videos with high audience retention</p>
              <p>• The first 30 seconds determine if viewers stay or leave</p>
              <p>• A strong hook can increase total watch time by 40-60%</p>
              <p>• Higher retention = more algorithm distribution</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {loading && (
            <div className="space-y-4">
              {[0,1].map(i => <div key={i} className="skeleton h-48 w-full rounded-xl" />)}
            </div>
          )}

          {!loading && hooks.length === 0 && (
            <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed">
              <Mic2 className="h-10 w-10 text-zinc-700 mb-4" />
              <p className="font-semibold text-zinc-500">No hooks yet</p>
              <p className="text-sm text-zinc-600 mt-1">Enter your topic and generate powerful video hooks</p>
            </Card>
          )}

          {!loading && hooks.length > 0 && (
            <div className="space-y-4">
              {hooks.map((h, i) => (
                <Card key={i} className={`border ${typeColor[h.type] || "border-zinc-700"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{typeEmoji[h.type] || "🎯"}</span>
                      <span className="font-semibold text-sm">{h.type} Hook</span>
                    </div>
                    <Badge variant={h.retention >= 80 ? "success" : "warning"} className="text-[10px]">
                      Retention {h.retention}%
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed italic mb-4">"{h.hook}"</p>
                  <button onClick={() => copyHook(h.hook, i)}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
                    {copied === i ? <><CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy Hook</>}
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
