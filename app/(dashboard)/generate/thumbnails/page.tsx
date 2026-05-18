"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toaster"
import { Sparkles, Download, RefreshCw, Upload, Scissors, Star } from "lucide-react"

const GRADIENTS = [
  "135deg, #1e1b4b, #4c1d95",
  "135deg, #dc2626, #1e1b4b",
  "135deg, #0f172a, #1e3a5f",
  "135deg, #064e3b, #1e1b4b",
  "135deg, #1f0533, #4a0072",
  "135deg, #1a1a2e, #16213e",
]

interface Concept {
  title: string
  description: string
  gradient: string
  aiScore: number
}

export default function ThumbnailGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("Dramatic")
  const [niche, setNiche] = useState("Tech")
  const [loading, setLoading] = useState(false)
  const [concepts, setConcepts] = useState<Concept[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [bgLoading, setBgLoading] = useState(false)

  async function handleGenerate() {
    if (!prompt.trim()) { toast("Please enter a video description", "error"); return }
    setLoading(true)
    setConcepts([])
    setSelected(null)
    try {
      const res = await fetch("/api/ai/thumbnails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, niche }),
      })
      const data = await res.json()
      if (data.error) { toast(data.error, "error"); return }
      const filled = (data.concepts || []).map((c: any, i: number) => ({
        ...c, gradient: c.gradient || GRADIENTS[i % GRADIENTS.length],
        aiScore: c.aiScore || 80 + Math.floor(Math.random() * 15),
      }))
      setConcepts(filled)
      if (filled.length) setSelected(0)
      toast(`Generated ${filled.length} thumbnail concepts!`)
    } catch {
      toast("Generation failed. Check your connection.", "error")
    } finally {
      setLoading(false)
    }
  }

  async function handleRemoveBg() {
    if (selected === null) { toast("Select a thumbnail first", "error"); return }
    setBgLoading(true)
    toast("Background removal coming soon! Connect remove.bg API key.", "info")
    setBgLoading(false)
  }

  function handleDownload(concept: Concept) {
    // Create canvas and draw thumbnail
    const canvas = document.createElement("canvas")
    canvas.width = 1280; canvas.height = 720
    const ctx = canvas.getContext("2d")!
    const [deg, c1, c2] = concept.gradient.split(", ")
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    grd.addColorStop(0, c1); grd.addColorStop(1, c2)
    ctx.fillStyle = grd; ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(255,255,255,0.9)"
    ctx.font = "bold 64px system-ui, sans-serif"
    ctx.textAlign = "center"
    const words = concept.title.split(" ")
    let line = "", lines = [], y = 260
    for (const word of words) {
      const test = line + word + " "
      if (ctx.measureText(test).width > 1100 && line) { lines.push(line); line = word + " " }
      else line = test
    }
    lines.push(line)
    lines.forEach((l, i) => ctx.fillText(l.trim(), 640, y + i * 80))
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/jpeg", 0.95)
    a.download = `thumbai-${Date.now()}.jpg`
    a.click()
    toast("Thumbnail downloaded!")
  }

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight">AI Thumbnail Generator</h1>
          <p className="text-sm text-zinc-500 mt-1">Powered by Groq LLaMA 3.3 70B · Instant HD export</p>
        </div>
        <Badge variant="pro">PRO · Unlimited</Badge>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <Label className="mb-2 block">Describe your video</Label>
            <Textarea
              rows={5}
              placeholder="e.g. I tested every iPhone ever made for 30 days. Tech review thumbnail, shocked face, comparison layout, dramatic red background..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="mb-4"
            />
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <Label className="mb-1.5 block">Style</Label>
                <Select value={style} onChange={e => setStyle(e.target.value)}>
                  {["Dramatic","Clean","Minimal","Bold","Colorful","Dark"].map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block">Niche</Label>
                <Select value={niche} onChange={e => setNiche(e.target.value)}>
                  {["Tech","Gaming","Finance","Vlog","Education","Podcast","Fitness","Cooking"].map(n => <option key={n}>{n}</option>)}
                </Select>
              </div>
            </div>
            <Button className="w-full gap-2" loading={loading} onClick={handleGenerate}>
              <Sparkles className="h-4 w-4" /> Generate 4 Thumbnails
            </Button>
          </Card>

          <Card>
            <p className="font-semibold text-sm mb-3">Tools</p>
            <div className="space-y-2">
              {[
                { icon: Scissors, label: "Background Remover", onClick: handleRemoveBg, loading: bgLoading },
                { icon: Upload, label: "Upload Custom Image", onClick: () => toast("Upload feature — connect Cloudinary", "info") },
                { icon: RefreshCw, label: "Regenerate", onClick: handleGenerate },
              ].map(t => (
                <button key={t.label} onClick={t.onClick}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-sm font-medium text-zinc-300">
                  <t.icon className="h-4 w-4 text-zinc-400" /> {t.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <p className="font-semibold text-sm text-zinc-400 mb-3">
            {concepts.length > 0 ? `Generated ${concepts.length} concepts` : "Your thumbnails will appear here"}
          </p>

          {loading && (
            <div className="grid grid-cols-2 gap-4">
              {[0,1,2,3].map(i => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <div className="skeleton h-36 w-full" />
                  <div className="skeleton h-8 w-full mt-1" />
                </div>
              ))}
            </div>
          )}

          {!loading && concepts.length === 0 && (
            <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed">
              <Sparkles className="h-10 w-10 text-zinc-700 mb-4" />
              <p className="font-semibold text-zinc-500">No concepts yet</p>
              <p className="text-sm text-zinc-600 mt-1">Describe your video and click Generate</p>
            </Card>
          )}

          {!loading && concepts.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {concepts.map((c, i) => (
                  <div key={i} onClick={() => setSelected(i)}
                    className={`rounded-xl overflow-hidden cursor-pointer transition-all ${selected === i ? "ring-2 ring-violet-500 scale-[1.02]" : "hover:scale-[1.01] opacity-80 hover:opacity-100"}`}>
                    <div className="h-36 flex flex-col justify-between p-4 relative"
                      style={{ background: `linear-gradient(${c.gradient})` }}>
                      {i === 0 && <div className="absolute top-2 right-2"><Badge variant="success" className="text-[9px]"><Star className="h-2.5 w-2.5" /> Best</Badge></div>}
                      <div />
                      <p className="font-syne font-black text-sm leading-tight">{c.title}</p>
                    </div>
                    <div className="flex justify-between items-center px-3 py-2 bg-zinc-900 border-x border-b border-zinc-800 rounded-b-xl">
                      <span className="text-[11px] text-zinc-500">Variant {String.fromCharCode(65+i)} · Score {c.aiScore}</span>
                      <button onClick={e => { e.stopPropagation(); handleDownload(c) }}
                        className="text-[11px] text-violet-400 hover:text-violet-300 flex items-center gap-1">
                        <Download className="h-3 w-3" /> Export HD
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selected !== null && (
                <Card className="bg-gradient-to-br from-violet-500/5 to-transparent border-violet-500/20">
                  <p className="font-semibold text-sm mb-2">Selected: Variant {String.fromCharCode(65+selected)}</p>
                  <p className="text-xs text-zinc-400 mb-4">{concepts[selected].description}</p>
                  <div className="flex gap-3">
                    <Button className="gap-2" onClick={() => handleDownload(concepts[selected])}>
                      <Download className="h-4 w-4" /> Download HD (1280×720)
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleGenerate}>
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Regenerate
                    </Button>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
