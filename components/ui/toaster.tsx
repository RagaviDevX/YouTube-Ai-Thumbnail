"use client"
import { useEffect, useState } from "react"

interface Toast { id: string; message: string; type: "success"|"error"|"info" }
let toastFn: ((msg: string, type?: Toast["type"]) => void) | null = null

export function toast(message: string, type: Toast["type"] = "success") {
  toastFn?.(message, type)
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    toastFn = (message, type = "success") => {
      const id = Math.random().toString(36)
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
    }
    return () => { toastFn = null }
  }, [])

  const icons = { success: "✓", error: "✗", info: "ℹ" }
  const colors = { success: "border-emerald-500/50 text-emerald-300", error: "border-red-500/50 text-red-300", info: "border-cyan-500/50 text-cyan-300" }

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 bg-zinc-900 border rounded-lg px-4 py-3 shadow-2xl animate-[slideUp_0.3s_ease] ${colors[t.type]}`}
          style={{ animation: "slideUp 0.3s ease" }}>
          <span className="font-bold text-base">{icons[t.type]}</span>
          <span className="text-sm text-zinc-200">{t.message}</span>
        </div>
      ))}
    </div>
  )
}

