const API = process.env.NEXT_PUBLIC_API_URL

const send = (path: string, init: RequestInit) =>
    fetch(`${API}${path}`, { credentials: "include", ...init })

export async function apiFetch(path: string, init: RequestInit = {}) {
    let res = await send(path, init)
    if (res.status === 401) {
        const jwt = await send("/api/jwt", { method: "POST" })
        if (jwt.ok) res = await send(path, init)
    }
    return res
}