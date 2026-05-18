import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Shield, Zap } from "lucide-react"

const plans = [
  {
    key: "free", name: "Starter", price: "₹0", period: "month", tagVariant: "free" as const,
    desc: "Perfect for trying out ThumbAI",
    features: [
      { text: "5 thumbnail generations/day", included: true },
      { text: "10 title generations/day", included: true },
      { text: "5 hook generations/day", included: true },
      { text: "8 basic templates", included: true },
      { text: "720p export with watermark", included: true },
      { text: "Background removal (3/day)", included: true },
      { text: "Premium templates", included: false },
      { text: "HD export without watermark", included: false },
      { text: "Priority AI speed", included: false },
      { text: "Cloud storage", included: false },
      { text: "Team collaboration", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get Started Free", href: "/register", variant: "ghost" as const,
  },
  {
    key: "pro", name: "Pro Creator", price: "₹999", period: "month", tagVariant: "pro" as const,
    desc: "For serious YouTube creators",
    popular: true,
    features: [
      { text: "Unlimited thumbnail generation", included: true },
      { text: "Unlimited title & hook generation", included: true },
      { text: "Unlimited hook generation", included: true },
      { text: "All 50+ premium templates", included: true },
      { text: "4K HD export — no watermark", included: true },
      { text: "Unlimited background removal", included: true },
      { text: "Priority AI processing", included: true },
      { text: "Cloud storage (10GB)", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Team collaboration", included: false },
      { text: "API access", included: false },
      { text: "White-label exports", included: false },
    ],
    cta: "Upgrade to Pro", href: "/billing", variant: "default" as const,
  },
  {
    key: "business", name: "Business", price: "₹2,999", period: "month", tagVariant: "business" as const,
    desc: "For teams & agencies",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited everything", included: true },
      { text: "All 50+ premium templates", included: true },
      { text: "4K HD export — no watermark", included: true },
      { text: "Unlimited background removal", included: true },
      { text: "Priority AI processing", included: true },
      { text: "Cloud storage (100GB)", included: true },
      { text: "Full analytics dashboard", included: true },
      { text: "5 team member seats", included: true },
      { text: "API access (10K calls/month)", included: true },
      { text: "White-label exports", included: true },
      { text: "2-hour priority support", included: true },
    ],
    cta: "Upgrade to Business", href: "/billing", variant: "outline" as const,
  },
]

export default function PricingPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">PRICING</p>
          <h1 className="font-syne text-5xl font-black tracking-tight mb-4">Simple, Transparent Pricing</h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">Start free, upgrade when you're ready. Powered by Razorpay for secure Indian payments — UPI, cards, net banking.</p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button className="px-4 py-1.5 rounded-full text-sm font-semibold bg-violet-600 text-white">Monthly</button>
            <button className="px-4 py-1.5 rounded-full text-sm font-medium border border-zinc-700 text-zinc-400 hover:border-zinc-600">Yearly <Badge variant="success" className="ml-1 text-[9px]">Save 40%</Badge></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map(p => (
            <Card key={p.key} className={`relative flex flex-col ${p.popular ? "border-violet-500 shadow-2xl shadow-violet-500/10" : ""}`}>
              {p.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
              <div className="mb-5">
                <Badge variant={p.tagVariant} className="mb-3">{p.name}</Badge>
                <div className="font-syne font-black text-4xl tracking-tight">{p.price}<span className="text-sm font-normal text-zinc-500 tracking-normal">/{p.period}</span></div>
                <p className="text-xs text-zinc-500 mt-1">{p.desc}</p>
              </div>
              <Link href={p.href} className="mb-5">
                <Button variant={p.variant} className="w-full">{p.cta}</Button>
              </Link>
              <ul className="space-y-2 flex-1">
                {p.features.map(f => (
                  <li key={f.text} className={`flex items-start gap-2 text-xs ${f.included ? "text-zinc-300" : "text-zinc-600"}`}>
                    {f.included
                      ? <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      : <X className="h-3.5 w-3.5 text-zinc-700 flex-shrink-0 mt-0.5" />}
                    {f.text}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Trust signals */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Shield, title: "Secure by Razorpay", desc: "PCI-DSS compliant payments. UPI, cards, net banking, wallets. SSL encrypted." },
            { icon: Zap, title: "Instant Activation", desc: "Your Pro or Business plan activates immediately after successful payment." },
            { icon: Check, title: "Cancel Anytime", desc: "No lock-in. Cancel your subscription at any time from the billing page." },
          ].map(t => (
            <Card key={t.title} className="flex gap-4 p-5">
              <t.icon className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">{t.title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{t.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-black text-2xl text-center mb-6">Pricing FAQ</h2>
          <div className="space-y-2">
            {[
              { q:"Can I switch plans anytime?", a:"Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle." },
              { q:"What payment methods are supported?", a:"Razorpay supports UPI, credit/debit cards (Visa, Mastercard, RuPay), net banking, and popular wallets like Paytm and PhonePe." },
              { q:"Do you offer refunds?", a:"We offer a 7-day money-back guarantee if you're not satisfied with your Pro or Business plan." },
              { q:"Is there a student discount?", a:"Yes! Contact us with your student ID for a 50% discount on the Pro plan." },
            ].map((f, i) => (
              <details key={i} className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none hover:text-zinc-100">
                  {f.q}<span className="text-zinc-500 group-open:rotate-180 transition-transform text-lg">+</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
