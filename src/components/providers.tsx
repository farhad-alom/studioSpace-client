"use client"

import * as React from "react"
import { AuthProvider } from "@/lib/auth-provider"
import { ThemeProvider } from "@/lib/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
