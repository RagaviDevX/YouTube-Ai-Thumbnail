import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, Type, Mic2, Scissors, Cloud, CreditCard, ArrowRight, Star, Check, ChevronDown } from "lucide-react"

const features = [
  { icon: Sparkles, title: "AI Thumbnail Generator", desc: "Describe your video and get 4 stunning, click-worthy thumbnail concepts in under 10 seconds.", tag: "Groq AI", tagColor: "pro" as const },
  { icon: Type, title: "Viral Title Generator", desc: "Generate 10 high-CTR titles using proven viral formulas — curiosity gaps, power words, emotional triggers.", tag: "LLaMA 3.3 70B", tagColor: "cyan" as const },
  { icon: Mic2, title: "Hook Generator", desc: "Craft video openings that retain 80%+ of viewers past the critical 30-second mark.", tag: "Retention AI", tagColor: "business" as const },
  { icon: Scissors, title: "Background Remover", desc: "One-click background removal using Remove.bg API. Perfect for creator face cutouts.", tag: "Remove.bg", tagColor: "success" as const },
  { icon: Cloud, title: "Cloud Storage", desc: "All projects saved automatically to Cloudinary. Access your thumbnails anywhere, anytime.", tag: "Cloudinary", tagColor: "warning" as const },
  { icon: CreditCard, title: "Razorpay Payments", desc: "Seamless subscriptions with Razorpay. UPI, cards, net banking. Instant premium unlock.", tag: "Razorpay", tagColor: "pro" as const },
]

const testimonials = [
  { name: "Rahul Kumar", role: "Tech YouTuber · 240K subs", avatar: "RK", color: "from-violet-600 to-purple-500", quote: "ThumbAI literally 3x'd my CTR in the first week. The AI thumbnail generator knows exactly what makes people click." },
  { name: "Priya Sharma", role: "Finance Creator · 89K subs", avatar: "PS", color: "from-pink-600 to-rose-500", quote: "I was spending 3 hours per thumbnail in Photoshop. Now it takes 2 minutes and the quality is honestly better." },
  { name: "Arjun Mehta", role: "Gaming Creator · 1.2M subs", avatar: "AM", color: "from-cyan-600 to-blue-500", quote: "The title generator alone is worth the Pro subscription. My last 5 videos all hit 100K+ views." },
]

const faqs = [
  { q: "How does the AI thumbnail generator work?", a: "Describe your video concept, pick a style and niche, and our AI (powered by Groq's LLaMA 3.3 70B) generates stunning thumbnail concepts tailored to your content. You can then edit, add text overlays, remove backgrounds, and export in HD." },
  { q: "Is there a free plan?", a: "Yes! The free plan gives you 5 thumbnail generations per day with watermarked exports. Upgrade to Pro for unlimited generations, 4K HD export without watermarks, and access to all 50+ premium templates." },
  { q: "How does Razorpay payment work?", a: "We use Razorpay for secure payment processing. Pay with UPI, credit/debit cards, net banking, or wallets. Subscriptions are billed monthly or yearly, and you get an instant invoice after payment." },
  { q: "Can I cancel my subscription anytime?", a: "Absolutely. Cancel anytime from the billing page. You'll retain access until the end of your billing period with no further charges." },
  { q: "Is my data secure?", a: "Yes. We use Supabase for authentication, Cloudinary for image storage, and Razorpay for payments — all industry-standard secure services. Your data is never sold to third parties." },
]

export default function LandingPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(6,182,212,0.08),transparent)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-xs font-semibold text-violet-300">AI-Powered Thumbnail Studio</span>
              </div>
              <h1 className="font-syne text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6">
                Create Viral<br />
                <span className="gradient-text">YouTube Thumbnails</span><br />
                in Seconds
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
                The only AI thumbnail platform built for creators. Generate, edit, and optimize thumbnails that 10x your click-through rate — no design skills needed.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    <Sparkles className="h-4 w-4" /> Start Creating Free
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="ghost" size="lg">Browse Templates <ArrowRight className="h-4 w-4 ml-1" /></Button>
                </Link>
              </div>
              <div className="flex gap-8">
                {[["50K+","Active Creators"],["2.4M","Thumbnails Made"],["340%","Avg CTR Boost"]].map(([n,l]) => (
                  <div key={l}>
                    <div className="font-syne text-2xl font-black text-zinc-100">{n}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative hidden lg:block">
              <div className="relative h-[420px]">
                {/* Main card */}
                <div className="absolute inset-x-0 top-12 rounded-2xl overflow-hidden border border-violet-500/30 shadow-2xl shadow-violet-500/20">
                  <div className="h-52 bg-gradient-to-br from-violet-900/80 to-indigo-950 p-6 flex flex-col justify-between">
                    <div className="flex gap-2">
                      <Badge variant="pro">GAMING</Badge>
                      <Badge variant="danger">VIRAL</Badge>
                    </div>
                    <div>
                      <h3 className="font-syne font-black text-xl leading-tight">I Beat the Hardest Level<br />in 0.01 Seconds 🔥</h3>
                      <p className="text-xs text-zinc-400 mt-1">World Record · 12.3M Views</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-zinc-400">AI Generated · HD Export Ready</span>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -left-6 top-4 glass rounded-xl px-4 py-3 shadow-xl animate-float">
                  <div className="text-[10px] text-emerald-400 font-bold tracking-wide">✦ AI SCORE</div>
                  <div className="font-syne text-xl font-black">94/100</div>
                </div>
                <div className="absolute -right-4 bottom-16 glass rounded-xl px-4 py-3 shadow-xl" style={{animation:"float 6s ease-in-out 3s infinite"}}>
                  <div className="text-[10px] text-amber-400 font-bold tracking-wide">📈 PROJECTED CTR</div>
                  <div className="font-syne text-xl font-black">12.4%</div>
                </div>
                {/* Side mini cards */}
                <div className="absolute right-0 top-0 w-44 h-28 rounded-xl overflow-hidden border border-cyan-500/20 shadow-lg transform rotate-3">
                  <div className="h-full bg-gradient-to-br from-slate-900 to-blue-950 p-4 flex flex-col justify-between">
                    <Badge variant="cyan" className="text-[9px] self-start">TECH</Badge>
                    <p className="text-xs font-bold leading-tight">I Built an AI App That Made $10K</p>
                  </div>
                </div>
                <div className="absolute left-0 bottom-0 w-40 h-24 rounded-xl overflow-hidden border border-pink-500/20 shadow-lg transform -rotate-2">
                  <div className="h-full bg-gradient-to-br from-fuchsia-950 to-violet-950 p-3 flex flex-col justify-between">
                    <Badge variant="business" className="text-[9px] self-start">FINANCE</Badge>
                    <p className="text-[11px] font-bold leading-tight">$0 to $1M Story</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="border-y border-zinc-800 bg-zinc-900/40 py-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            {["AI Thumbnail Generation","Background Removal","Viral Title Generator","Hook Generator","HD Export","Razorpay Payments"].map((f, i) => (
              <div key={f} className="flex items-center gap-2">
                <Sparkles className={`h-3.5 w-3.5 ${["text-violet-400","text-cyan-400","text-pink-400","text-amber-400","text-emerald-400","text-violet-400"][i]}`} />
                <span className="text-sm font-medium text-zinc-400">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI FEATURES */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">AI CAPABILITIES</p>
            <h2 className="font-syne text-4xl font-black tracking-tight mb-4">Everything You Need to<br />Go Viral on YouTube</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Powered by Groq's LLaMA 3.3 70B and cutting-edge image AI to supercharge your YouTube growth.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Card key={f.title} className="relative overflow-hidden hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 to-transparent opacity-0 group-hover:opacity-100" />
                <div className="font-syne text-5xl font-black text-zinc-800/60 mb-4">0{i+1}</div>
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-violet-400" />
                </div>
                <h3 className="font-syne font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{f.desc}</p>
                <Badge variant={f.tagColor}>{f.tag}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-zinc-900/30 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">TESTIMONIALS</p>
            <h2 className="font-syne text-4xl font-black tracking-tight">Loved by 50,000+ Creators</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <Card key={t.name} className="hover:border-zinc-700 transition-all">
                <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-sm text-zinc-300 leading-relaxed italic mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">PRICING</p>
          <h2 className="font-syne text-4xl font-black tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400 mb-8">Start free, upgrade when you're ready.</p>
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mb-8">
            {[
              { name:"Starter",price:"₹0",period:"month",features:["5 thumbnails/day","Basic templates","720p with watermark"],cta:"Get Started Free",href:"/register",variant:"ghost" as const},
              { name:"Pro Creator",price:"₹999",period:"month",features:["Unlimited generations","4K HD, no watermark","All 50+ templates","Priority AI speed"],cta:"Upgrade to Pro",href:"/register",variant:"default" as const,popular:true},
              { name:"Business",price:"₹2,999",period:"month",features:["Everything in Pro","5 team seats","API access","White-label"],cta:"Upgrade to Business",href:"/register",variant:"outline" as const},
            ].map(p => (
              <Card key={p.name} className={`relative ${p.popular ? "border-violet-500 shadow-lg shadow-violet-500/10" : ""}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                <div className="font-syne font-black text-3xl mb-1">{p.price}<span className="text-sm font-normal text-zinc-500">/{p.period}</span></div>
                <div className="font-semibold text-sm text-zinc-300 mb-4">{p.name}</div>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-zinc-400"><Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />{f}</li>)}
                </ul>
                <Link href={p.href}><Button variant={p.variant} className="w-full">{p.cta}</Button></Link>
              </Card>
            ))}
          </div>
          <Link href="/pricing"><Button variant="ghost">View full pricing comparison <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t border-zinc-800">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">FAQ</p>
            <h2 className="font-syne text-4xl font-black tracking-tight">Common Questions</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium hover:text-zinc-100 list-none">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-zinc-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-cyan-500/10 border border-violet-500/20 rounded-3xl p-14">
            <h2 className="font-syne text-5xl font-black tracking-tight mb-4">Ready to Go Viral?</h2>
            <p className="text-zinc-400 text-lg mb-8">Join 50,000+ creators already using ThumbAI to dominate YouTube.</p>
            <Link href="/register">
              <Button size="xl">
                <Sparkles className="h-5 w-5" /> Get Started Free — No Credit Card Required
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-syne font-black text-lg mb-3">
                <Sparkles className="h-4 w-4 text-violet-400" /><span className="gradient-text">ThumbAI</span>
              </div>
              <p className="text-sm text-zinc-500">The AI-powered thumbnail studio for YouTube creators who want to grow faster.</p>
            </div>
            {[
              { title:"Product", links:[{l:"Features",h:"/features"},{l:"Templates",h:"/templates"},{l:"Pricing",h:"/pricing"}] },
              { title:"Company", links:[{l:"Contact",h:"/contact"},{l:"Privacy Policy",h:"/privacy"},{l:"Terms",h:"/terms"}] },
              { title:"Resources", links:[{l:"Dashboard",h:"/dashboard"},{l:"Generate",h:"/generate/thumbnails"}] },
            ].map(g => (
              <div key={g.title}>
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-3">{g.title}</p>
                <div className="flex flex-col gap-2">
                  {g.links.map(l => <Link key={l.l} href={l.h} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{l.l}</Link>)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-6 flex items-center justify-between flex-wrap gap-4">
            <p className="text-xs text-zinc-600">© 2025 ThumbAI. All rights reserved.</p>
            <div className="flex gap-3">
              <Badge variant="pro">Made in India 🇮🇳</Badge>
              <Badge>v2.0</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
