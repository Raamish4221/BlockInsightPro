export interface User {
  id: string
  name: string
  email: string
  image?: string
  following: number
  followers: number
  trades: number
  joinedAt: Date
  bio?: string
  socialLinks?: {
    twitter?: string
    telegram?: string
    discord?: string
  }
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
}

