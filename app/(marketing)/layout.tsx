import { Navbar } from "@/components/navbar"
import { createClient } from "@/lib/server/supabase"

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  )
}
