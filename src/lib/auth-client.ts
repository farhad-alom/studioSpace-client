import { createAuthClient } from "better-auth/react";

// Browser-এ নিজের origin ব্যবহার হবে (local-এ localhost:3000,
// Vercel-এ আপনার client URL) — ফলে request same-origin যায়
// এবং next.config.ts-এর rewrite সেটা server-এ পাঠায়।
// SSR/build-এর সময় fallback হিসেবে localhost:3000 লাগবে।
const getBaseURL = () =>
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
});