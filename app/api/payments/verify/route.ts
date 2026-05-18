import { NextRequest, NextResponse } from "next/server"
import { verifyPaymentSignature } from "@/lib/razorpay"
import { createClient } from "@/lib/server/supabase"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, amount } = await req.json()

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 400 })

    const planName = plan.includes("business") ? "business" : "pro"

    await prisma.payment.create({
      data: {
        userId: user.id,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount,
        status: "paid",
        plan: planName,
      },
    })

    const periodEnd = new Date()
    if (plan.includes("yearly")) periodEnd.setFullYear(periodEnd.getFullYear() + 1)
    else periodEnd.setMonth(periodEnd.getMonth() + 1)

    await prisma.subscription.upsert({
      where: { razorpaySubId: razorpay_order_id },
      update: { status: "active", plan: planName, currentPeriodEnd: periodEnd },
      create: {
        userId: user.id,
        razorpaySubId: razorpay_order_id,
        plan: planName,
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: periodEnd,
      },
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { plan: planName },
    })

    return NextResponse.json({ success: true, plan: planName })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
export const dynamic = "force-dynamic"
