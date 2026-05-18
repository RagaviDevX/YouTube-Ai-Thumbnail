# ThumbAI — AI Thumbnail Generator SaaS

> Production-ready AI-powered thumbnail creation platform for YouTubers.

![ThumbAI](https://img.shields.io/badge/ThumbAI-v2.0-7c3aed?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 App Router + TypeScript |
| **Styling** | Tailwind CSS + Framer Motion |
| **Auth** | Supabase Auth (Google + Email) |
| **Database** | PostgreSQL via Supabase + Prisma ORM |
| **AI** | Groq API — LLaMA 3.3 70B |
| **Payments** | Razorpay (UPI, Cards, Net Banking) |
| **Images** | Cloudinary + Remove.bg API |

---

## 📁 Project Structure

```
thumbai/
├── app/
│   ├── (marketing)/          # Public pages
│   │   ├── page.tsx           # Landing page
│   │   ├── features/
│   │   ├── templates/
│   │   ├── pricing/
│   │   ├── contact/
│   │   ├── privacy/
│   │   └── terms/
│   ├── (auth)/               # Auth pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          # Protected pages
│   │   ├── dashboard/
│   │   ├── generate/
│   │   │   ├── thumbnails/
│   │   │   ├── titles/
│   │   │   └── hooks/
│   │   ├── billing/
│   │   ├── profile/
│   │   └── admin/
│   └── api/
│       ├── ai/
│       │   ├── thumbnails/
│       │   ├── titles/
│       │   └── hooks/
│       ├── payments/
│       │   ├── create-order/
│       │   ├── verify/
│       │   └── webhook/
│       ├── upload/
│       ├── remove-bg/
│       └── user/
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── navbar.tsx
│   └── sidebar.tsx
├── lib/
│   ├── supabase.ts           # Client-side Supabase
│   ├── server/supabase.ts    # Server-side Supabase
│   ├── prisma.ts
│   ├── groq.ts
│   ├── razorpay.ts
│   ├── cloudinary.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── types/
│   └── index.ts
├── middleware.ts
└── .env.example
```

---

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/yourname/thumbai.git
cd thumbai
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Get your **Project URL**, **Anon Key**, and **Service Role Key**
3. Enable **Google OAuth** in Authentication → Providers
4. Add `http://localhost:3000/auth/callback` to Redirect URLs

### 4. Set Up Database (Prisma)

```bash
npx prisma generate
npx prisma db push
```

### 5. Set Up Razorpay

1. Go to [razorpay.com](https://razorpay.com) → Create account
2. Get your **Key ID** and **Key Secret** from Dashboard → Settings → API Keys
3. For webhooks: Dashboard → Settings → Webhooks → Add webhook URL: `https://yourdomain.com/api/payments/webhook`

### 6. Set Up Groq

1. Go to [console.groq.com](https://console.groq.com)
2. Create an API key
3. Add to `GROQ_API_KEY`

### 7. Set Up Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) → Create account
2. Get Cloud Name, API Key, API Secret from Dashboard

### 8. Set Up Remove.bg

1. Go to [remove.bg/api](https://www.remove.bg/api)
2. Get your API key (50 free removals/month)

### 9. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 💳 Razorpay Integration

The payment flow works as follows:

1. User clicks "Upgrade to Pro" on `/billing`
2. Frontend calls `POST /api/payments/create-order` → creates Razorpay order
3. Razorpay checkout modal opens
4. On payment success → `POST /api/payments/verify` → verifies signature
5. User's plan updated in database → instant access

**Plans:**
- Pro Monthly: ₹999/month (`rzp_pro_monthly`)
- Pro Yearly: ₹7,188/year (`rzp_pro_yearly`)  
- Business: ₹2,999/month (`rzp_business_monthly`)

---

## 🤖 AI Features

### Thumbnail Generator
- POST `/api/ai/thumbnails` — generates 4 thumbnail concepts using Groq LLaMA 3.3 70B
- Returns: title, description, gradient, AI score

### Title Generator
- POST `/api/ai/titles` — generates 10 viral YouTube titles
- Returns: title, CTR score (0–100)

### Hook Generator
- POST `/api/ai/hooks` — generates 4 video opening hooks
- Returns: type, hook text, retention percentage

---

## 🔐 Authentication

- Supabase Auth with Google OAuth and email/password
- Protected routes via middleware (`middleware.ts`)
- Session management with SSR-compatible cookies

---

## 📊 Database Schema

- **User** — profile, plan, credits
- **Thumbnail** — generated thumbnails with metadata
- **Project** — grouped thumbnails
- **Subscription** — Razorpay subscription records
- **Payment** — payment history
- **Template** — thumbnail templates
- **AiUsageLog** — AI API usage tracking

---

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Set all environment variables in Vercel Dashboard → Settings → Environment Variables.

---

## 📄 License

MIT License — Built with ❤️ in India 🇮🇳
# YouTube-Ai-Thumbnail
