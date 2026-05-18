"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/toaster"
import { Mail, MessageSquare, Send } from "lucide-react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    toast("Message sent! We reply within 24 hours.")
    ;(e.target as HTMLFormElement).reset()
    setLoading(false)
  }

  const contacts = [
    { icon: Mail, title: "Email Support", desc: "For general inquiries and billing", value: "support@thumbai.in", color: "text-violet-400" },
    { icon: MessageSquare, title: "Live Chat", desc: "Mon–Fri, 9am–6pm IST", value: "Start chat", color: "text-cyan-400" },
    { icon: MessageSquare, title: "Twitter / X", desc: "Follow us for tips and updates", value: "@ThumbAI_app", color: "text-pink-400" },
  ]

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">CONTACT</p>
          <h1 className="font-syne text-5xl font-black tracking-tight mb-4">Get in Touch</h1>
          <p className="text-zinc-400 text-lg">Have a question or need help? We respond within 24 hours.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <p className="font-syne font-bold text-lg mb-6">Send us a message</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="mb-1.5 block">First Name</Label><Input placeholder="Rahul" required /></div>
                <div><Label className="mb-1.5 block">Last Name</Label><Input placeholder="Kumar" required /></div>
              </div>
              <div><Label className="mb-1.5 block">Email</Label><Input type="email" placeholder="rahul@example.com" required /></div>
              <div><Label className="mb-1.5 block">Subject</Label><Input placeholder="How can we help?" required /></div>
              <div><Label className="mb-1.5 block">Message</Label><Textarea rows={5} placeholder="Tell us what is on your mind..." required /></div>
              <Button type="submit" loading={loading} className="w-full gap-2">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </Card>
          <div className="space-y-5">
            {contacts.map(c => (
              <Card key={c.title} className="flex gap-4 hover:border-zinc-700 transition-all">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <c.icon className={"h-5 w-5 " + c.color} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">{c.title}</p>
                  <p className="text-xs text-zinc-500 mb-1">{c.desc}</p>
                  <p className={"text-sm font-medium " + c.color}>{c.value}</p>
                </div>
              </Card>
            ))}
            <Card className="bg-gradient-to-br from-violet-500/10 to-transparent border-violet-500/20">
              <p className="font-syne font-bold text-base mb-3">Response Times</p>
              <div className="space-y-2 text-sm">
                {[["Free Plan","Within 48 hours"],["Pro Plan","Within 24 hours"],["Business Plan","Within 2 hours"]].map(([plan, time]) => (
                  <div key={plan} className="flex justify-between">
                    <span className="text-zinc-400">{plan}</span>
                    <span className="text-zinc-300 font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
