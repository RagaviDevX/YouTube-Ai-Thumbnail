import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

const PROTECTED = ["/dashboard", "/generate", "/billing", "/profile", "/admin"]
const AUTH_PAGES = ["/login", "/register"]

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          response = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = req.nextUrl.pathname

  const isProtected = PROTECTED.some(p => path.startsWith(p))
  const isAuthPage = AUTH_PAGES.some(p => path.startsWith(p))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/payments/webhook).*)"],
}
