import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "ThumbAI — AI Thumbnail Generator for YouTubers",
  description: "Create viral YouTube thumbnails, titles, and hooks in seconds. Powered by AI. Used by 50,000+ creators.",
  keywords: "youtube thumbnail generator, ai thumbnail, youtube title generator, click through rate",
  openGraph: {
    title: "ThumbAI — AI Thumbnail Generator",
    description: "Create viral YouTube thumbnails in seconds with AI",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-zinc-950 text-zinc-50" style={{fontFamily:"'DM Sans', system-ui, sans-serif"}}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
