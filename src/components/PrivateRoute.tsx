"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    React.useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace(`/login?redirect=${pathname}`)
        }
    }, [loading, isAuthenticated, pathname, router])

    if (loading || !isAuthenticated) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        )
    }

    return <>{children}</>
}