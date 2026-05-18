export default function TermsPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[3px] uppercase text-violet-400 mb-3">LEGAL</p>
          <h1 className="font-syne text-4xl font-black tracking-tight mb-2">Terms of Service</h1>
          <p className="text-zinc-500 text-sm">Last updated: November 1, 2025</p>
        </div>
        <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">
          {[
            { title:"1. Acceptance of Terms", body:"By accessing or using ThumbAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service." },
            { title:"2. Use of Service", body:"ThumbAI grants you a limited, non-exclusive, non-transferable license to use our platform for creating YouTube thumbnails and related content. You may not use the service for any illegal or unauthorized purpose." },
            { title:"3. User Content", body:"You retain ownership of all content you create using ThumbAI. By using our service, you grant us a limited license to process your content solely to provide the service." },
            { title:"4. Payment Terms", body:"Paid plans are billed in advance on a monthly or yearly basis. All payments are processed securely through Razorpay. Refunds are available within 7 days of purchase if you're not satisfied." },
            { title:"5. Cancellation", body:"You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. No partial refunds are provided for unused time." },
            { title:"6. Prohibited Uses", body:"You may not use ThumbAI to create content that infringes copyright, violates laws, promotes hate speech, or impersonates others. Violations may result in account termination." },
            { title:"7. Limitation of Liability", body:"ThumbAI is provided 'as is' without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service." },
            { title:"8. Changes to Terms", body:"We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms." },
            { title:"9. Contact", body:"For questions about these Terms, contact legal@thumbai.in." },
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
