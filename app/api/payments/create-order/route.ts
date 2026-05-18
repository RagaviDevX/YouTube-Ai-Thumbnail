import { NextRequest, NextResponse } from "next/server"
import { PLANS } from "@/lib/razorpay"
import { createClient } from "@/lib/server/supabase"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { planKey } = await req.json()
    const plan = PLANS[planKey as keyof typeof PLANS]
    if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Razorpay = require("razorpay")
    const rzp = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    const order = await rzp.orders.create({ amount: plan.amount, currency: plan.currency, notes: { userId: user.id, plan: planKey } })
    return NextResponse.json({ orderId: order.id, amount: plan.amount, currency: plan.currency, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, planName: plan.name })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 })
  }
}
