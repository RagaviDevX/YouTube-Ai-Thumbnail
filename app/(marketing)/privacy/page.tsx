export default function PrivacyPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">LEGAL</p>
          <h1 className="font-syne text-4xl font-black tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-zinc-500 text-sm">Last updated: November 1, 2025</p>
        </div>
        <div className="prose space-y-8 text-sm text-zinc-400 leading-relaxed">
          {[
            { title:"1. Information We Collect", body:"We collect information you provide when creating an account (name, email), usage data (thumbnails generated, features used), and payment information processed securely through Razorpay. We never store your card details directly." },
            { title:"2. How We Use Your Information", body:"We use your information to provide and improve ThumbAI, process payments, send service-related communications, and provide customer support. We do not sell your personal data to third parties." },
            { title:"3. Data Storage & Security", body:"Your data is stored securely using Supabase (PostgreSQL) and Cloudinary (media files). All data is encrypted in transit using SSL/TLS. We implement industry-standard security measures to protect your information." },
            { title:"4. Cookies", body:"We use essential cookies for authentication and session management. We do not use tracking or advertising cookies." },
            { title:"5. Third-Party Services", body:"We use Supabase (auth & database), Cloudinary (image storage), Razorpay (payments), Remove.bg (background removal), and Groq (AI generation). Each service has its own privacy policy." },
            { title:"6. Your Rights", body:"You have the right to access, correct, or delete your personal data at any time. Contact support@thumbai.in to exercise these rights." },
            { title:"7. Contact", body:"For privacy concerns, contact us at privacy@thumbai.in or through our contact page." },
          ].map(s => (
            <div key={s.title}>
              <h2 className="font-syne font-bold text-lg text-zinc-200 mb-2">{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
