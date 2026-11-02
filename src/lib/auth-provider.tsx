"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

export type StudioUser = {
  id: string
  name: string
  email: string
  image?: string | null
}

type AuthContextType = {
  user: StudioUser | null
  isAuthenticated: boolean
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const user: StudioUser | null = session?.user
    ? {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
    : null

  const logout = async () => {
    await authClient.signOut()
    toast.success("Logged out successfully")
    router.push("/")
    router.refresh()
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading: isPending, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}