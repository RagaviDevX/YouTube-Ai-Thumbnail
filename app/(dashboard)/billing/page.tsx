"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/toaster"
import { Check, CreditCard, Shield, Zap } from "lucide-react"

declare global { interface Window { Razorpay: any } }

const plans = [
  {
    key: "pro_monthly", name: "Pro Creator", price: "₹999", period: "month",
    desc: "For serious YouTube creators",
    features: ["Unlimited thumbnail generation","Unlimited titles & hooks","All 50+ premium templates","4K HD export — no watermark","Unlimited background removal","Priority AI processing","Cloud storage 10GB","Analytics dashboard"],
    popular: true, variant: "default" as const,
  },
  {
    key: "pro_yearly", name: "Pro Yearly", price: "₹599", period: "month",
    desc: "Save 40% — billed ₹7,188/year",
    features: ["Everything in Pro Monthly","Priority support","Yearly invoice","Best value for creators"],
    variant: "outline" as const,
  },
  {
    key: "business_monthly", name: "Business", price: "₹2,999", period: "month",
    desc: "For teams & agencies",
    features: ["Everything in Pro","5 team member seats","API access (10K calls/month)","White-label exports","Dedicated AI capacity","2-hour priority support","Custom brand kit"],
    variant: "ghost" as const,
  },
]

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handlePurchase(planKey: string) {
    setLoading(planKey)
    try {
      // Load Razorpay script
      if (!window.Razorpay) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script")
          s.src = "https://checkout.razorpay.com/v1/checkout.js"
          s.onload = () => res(); s.onerror = () => rej()
          document.body.appendChild(s)
        })
      }
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      })
      const order = await orderRes.json()
      if (order.error) { toast(order.error, "error"); return }

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "ThumbAI",
        description: order.planName,
        order_id: order.orderId,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planKey, amount: order.amount,
            }),
          })
          const result = await verifyRes.json()
          if (result.success) {
            toast("Payment successful! Welcome to Pro 🎉")
            setTimeout(() => window.location.reload(), 1500)
          } else { toast("Payment verification failed", "error") }
        },
        prefill: { name: "", email: "" },
        theme: { color: "#7c3aed" },
        modal: { ondismiss: () => setLoading(null) },
      })
      rzp.open()
    } catch (e) {
      toast("Payment initiation failed", "error")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="p-7">
      <div className="mb-7">
        <h1 className="font-syne font-black text-2xl tracking-tight">Billing & Subscription</h1>
        <p className="text-sm text-zinc-500 mt-1">Secure payments powered by Razorpay · Cancel anytime</p>
      </div>

      {/* Current plan */}
      <Card className="mb-8 bg-gradient-to-br from-violet-500/10 to-transparent border-violet-500/20 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Current Plan</p>
          <div className="flex items-center gap-3">
            <p className="font-syne font-black text-xl">Free Plan</p>
            <Badge variant="free">ACTIVE</Badge>
          </div>
          <p className="text-sm text-zinc-400 mt-1">5 thumbnail generations/day · Watermarked exports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm">Cancel Plan</Button>
        </div>
      </Card>

      {/* Plans */}
      <div className="mb-6">
        <h2 className="font-syne font-bold text-lg mb-1">Upgrade Your Plan</h2>
        <p className="text-sm text-zinc-400">All plans include secure Razorpay payments · UPI, Cards, Net Banking</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {plans.map(p => (
          <Card key={p.key} className={`relative ${p.popular ? "border-violet-500 shadow-lg shadow-violet-500/10" : ""}`}>
            {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
            <div className="mb-4">
              <p className="font-syne font-black text-2xl">{p.price}<span className="text-sm font-normal text-zinc-500">/{p.period}</span></p>
              <p className="font-semibold text-sm text-zinc-300 mt-0.5">{p.name}</p>
              <p className="text-xs text-zinc-500 mt-1">{p.desc}</p>
            </div>
            <ul className="space-y-2 mb-6">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs text-zinc-400">
                  <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <Button variant={p.popular ? "default" : p.variant} className="w-full"
              loading={loading === p.key} onClick={() => handlePurchase(p.key)}>
              <CreditCard className="h-4 w-4 mr-2" /> Upgrade via Razorpay
            </Button>
          </Card>
        ))}
      </div>

      {/* Security */}
      <Card className="flex items-center gap-4 bg-zinc-900/50">
        <Shield className="h-8 w-8 text-emerald-400 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm">Secure Payments by Razorpay</p>
          <p className="text-xs text-zinc-400 mt-0.5">PCI-DSS compliant · Your card details are never stored on our servers · SSL encrypted · Supports UPI, Credit/Debit Cards, Net Banking, Wallets</p>
        </div>
      </Card>
    </div>
  )
}
