"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function validatePassword(pw: string) {
    if (pw.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Password must have a lowercase letter.";
    return "";
}

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const { isAuthenticated, loading: authLoading } = useAuth();

    // Google sign-in failed/cancelled -> show toast
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get("auth_error")) {
            toast.error(
                "Google sign-in failed or was cancelled. Please try again."
            );
        }
    }, []);

    // already authenticated? never show the register form
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            const params = new URLSearchParams(window.location.search);
            router.replace(params.get("redirect") || "/");
        }
    }, [authLoading, isAuthenticated, router]);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = String(form.get("name")).trim();
        const email = String(form.get("email")).trim();
        const image = String(form.get("photo")).trim();
        const password = String(form.get("password"));

        const err = validatePassword(password);
        setPasswordError(err);
        if (err) return;

        setLoading(true);
        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
            return;
        }

        toast.success("Account created! Please log in.");
        router.push("/login");
    };

    const handleGoogle = async () => {
        // honor ?redirect= (e.g. came from a protected route), otherwise Home
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("redirect") || "/";

        setGoogleLoading(true);
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: redirectTo,
                errorCallbackURL: `/register?auth_error=1&redirect=${encodeURIComponent(redirectTo)}`,
            });

            if (error) {
                setGoogleLoading(false);
                toast.error(error.message || "Google sign-in failed.");
            }
        } catch {
            setGoogleLoading(false);
            toast.error("Google sign-in failed.");
        }
    };

    return (
        <section className="mx-auto flex min-h-[80vh] w-full max-w-4xl items-start justify-center px-4 py-12">
            <Card className="w-full max-w-2xl rounded-2xl border shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold">
                        Create your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Your full name" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="photo">Photo URL</Label>
                            <Input id="photo" name="photo" type="url" placeholder="https://..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Min 6 chars, upper & lower case"
                                required
                            />
                            {passwordError && (
                                <p className="text-sm text-destructive">{passwordError}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating account..." : "Register"}
                        </Button>
                    </form>

                    <div className="my-5 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="h-px flex-1 bg-border" />
                        or
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogle}
                        disabled={googleLoading}
                    >
                        <FcGoogle className="mr-2 text-lg" />
                        {googleLoading ? "Redirecting..." : "Continue with Google"}
                    </Button>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-foreground underline">
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}