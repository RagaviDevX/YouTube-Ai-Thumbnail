export type Plan = "free" | "pro" | "business"
export type UserRole = "user" | "admin"

export interface UserProfile {
  id: string
  email: string
  name?: string
  avatar?: string
  role: UserRole
  plan: Plan
  credits: number
  createdAt: string
}

export interface ThumbnailData {
  id: string
  title: string
  prompt?: string
  imageUrl: string
  aiScore?: number
  niche?: string
  style?: string
  createdAt: string
}

export interface ProjectData {
  id: string
  title: string
  description?: string
  thumbnails: ThumbnailData[]
  createdAt: string
}

export interface PlanDetails {
  name: string
  price: number
  yearlyPrice: number
  features: string[]
  limits: {
    thumbnailsPerDay: number | "unlimited"
    titlesPerDay: number | "unlimited"
    bgRemovals: number | "unlimited"
    storage: string
    export: string
    watermark: boolean
    templates: "basic" | "all"
    teamSeats: number
    apiAccess: boolean
  }
}

export interface GeneratedTitle {
  title: string
  ctrScore: number
}

export interface GeneratedHook {
  type: string
  hook: string
  retention: number
}

export interface ThumbnailConcept {
  title: string
  description: string
  gradient: string
}
