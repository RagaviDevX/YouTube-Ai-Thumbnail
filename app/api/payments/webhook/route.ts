import { NextRequest, NextResponse } from "next/server"
import { verifyWebhookSignature } from "@/lib/razorpay"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-razorpay-signature") || ""

    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === "subscription.cancelled") {
      const subId = event.payload?.subscription?.entity?.id
      if (subId) {
        await prisma.subscription.updateMany({
          where: { razorpaySubId: subId },
          data: { status: "cancelled", cancelAtPeriodEnd: true },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
export const dynamic = "force-dynamic"
