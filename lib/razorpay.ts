import crypto from "crypto"

function getRazorpay() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Razorpay = require("razorpay")
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
  })
}

export { getRazorpay as razorpay }

export const PLANS = {
  pro_monthly: { name: "Pro Monthly", amount: 99900, currency: "INR", description: "Unlimited thumbnails, HD export" },
  pro_yearly: { name: "Pro Yearly", amount: 719900, currency: "INR", description: "Pro plan billed yearly (save 40%)" },
  business_monthly: { name: "Business Monthly", amount: 299900, currency: "INR", description: "Team seats, API access" },
}

export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  const body = orderId + "|" + paymentId
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "").update(body).digest("hex")
  return expected === signature
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "").update(body).digest("hex")
  return expected === signature
}
