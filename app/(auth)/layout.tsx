export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4"
      style={{background:"radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.12), transparent)"}}>
      {children}
    </div>
  )
}
