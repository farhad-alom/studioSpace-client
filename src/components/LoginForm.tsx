"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export default function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get("redirect") || "/"

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [googleLoading, setGoogleLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const { error } = await authClient.signIn.email({ email, password })

        setLoading(false)

        if (error) {
            const msg = error.message || "Invalid email or password"
            setError(msg)
            toast.error(msg)
            return
        }

        toast.success("Welcome back to StudioSpace!")
        router.push(redirectTo)
        router.refresh()
    }

    const handleGoogle = async () => {
        setGoogleLoading(true)
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: redirectTo,
        })
        if (error) {
            setGoogleLoading(false)
            toast.error(error.message || "Google login failed")
        }
    }

    return (
        <section className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Log in to book studios and manage your listings.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/forgot-password"
                                className="text-xs font-medium text-primary hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                aria-label="Toggle password visibility"
                            >
                                {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" /> Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogle}
                    disabled={googleLoading}
                >
                    {googleLoading ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                        <FcGoogle className="mr-2 size-5" />
                    )}
                    Continue with Google
                </Button>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    New to StudioSpace?{" "}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    )
}