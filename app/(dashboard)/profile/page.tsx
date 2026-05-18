"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { toast } from "@/components/ui/toaster"
import { User, Lock, Trash2, Save } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { getInitials } from "@/lib/utils"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [name, setName] = useState("")
  const [niche, setNiche] = useState("Tech")
  const [channel, setChannel] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const res = await fetch("/api/user/profile")
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
        setName(data.name || "")
        setChannel(data.channelUrl || "")
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
    if (res.ok) toast("Profile updated!")
    else toast("Update failed", "error")
    setSaving(false)
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const newPass = (form.elements.namedItem("newPassword") as HTMLInputElement).value
    if (newPass.length < 8) { toast("Password must be at least 8 characters", "error"); return }
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPass })
    if (error) toast(error.message, "error")
    else { toast("Password updated!"); form.reset() }
  }

  if (loading) {
    return (
      <div className="p-7 space-y-4">
        <div className="skeleton h-8 w-48 rounded" />
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight">Profile Settings</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your account information and security</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="space-y-5">
          <Card>
            <p className="font-syne font-bold text-base mb-5">Personal Information</p>
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                {profile?.avatar
                  ? <img src={profile.avatar} className="w-full h-full rounded-full object-cover" alt="avatar" />
                  : getInitials(name || profile?.email || "U")}
              </div>
              <div>
                <p className="font-semibold text-sm">{name || "Your Name"}</p>
                <p className="text-xs text-zinc-500">{profile?.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant={profile?.plan === "free" ? "free" : "pro"} className="text-[10px]">
                    {(profile?.plan || "free").toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label className="mb-1.5 block">Full Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <Label className="mb-1.5 block">Email Address</Label>
                <Input value={profile?.email || ""} disabled className="opacity-60" />
                <p className="text-xs text-zinc-600 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <Label className="mb-1.5 block">YouTube Channel URL</Label>
                <Input value={channel} onChange={e => setChannel(e.target.value)} placeholder="https://youtube.com/@yourchannel" />
              </div>
              <div>
                <Label className="mb-1.5 block">Content Niche</Label>
                <Select value={niche} onChange={e => setNiche(e.target.value)}>
                  {["Tech & AI","Gaming","Finance","Education","Vlog","Fitness","Cooking","Business","Entertainment"].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </Select>
              </div>
              <Button type="submit" loading={saving} className="gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-5">
          {/* Security */}
          <Card>
            <p className="font-syne font-bold text-base mb-5 flex items-center gap-2">
              <Lock className="h-4 w-4 text-zinc-400" /> Security
            </p>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label className="mb-1.5 block">Current Password</Label>
                <Input type="password" name="currentPassword" placeholder="••••••••" />
              </div>
              <div>
                <Label className="mb-1.5 block">New Password</Label>
                <Input type="password" name="newPassword" placeholder="Min 8 characters" />
              </div>
              <div>
                <Label className="mb-1.5 block">Confirm New Password</Label>
                <Input type="password" name="confirmPassword" placeholder="Repeat new password" />
              </div>
              <Button type="submit" variant="secondary" className="gap-2">
                <Lock className="h-4 w-4" /> Update Password
              </Button>
            </form>
          </Card>

          {/* Account Stats */}
          <Card>
            <p className="font-syne font-bold text-base mb-4">Account Stats</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Member Since", value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "—" },
                { label: "Plan", value: (profile?.plan || "free").toUpperCase() },
                { label: "Credits Left", value: profile?.plan === "free" ? `${profile?.credits || 5}/5` : "Unlimited" },
                { label: "Role", value: (profile?.role || "user").toUpperCase() },
              ].map(s => (
                <div key={s.label} className="bg-zinc-800 rounded-lg p-3">
                  <p className="text-xs text-zinc-500 mb-1">{s.label}</p>
                  <p className="font-semibold text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-500/20 bg-red-500/5">
            <p className="font-syne font-bold text-base mb-2 flex items-center gap-2 text-red-400">
              <Trash2 className="h-4 w-4" /> Danger Zone
            </p>
            <p className="text-sm text-zinc-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <Button variant="destructive" size="sm" onClick={() => toast("Contact support to delete your account", "info")}>
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
