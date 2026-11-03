const API = process.env.NEXT_PUBLIC_API_URL

const send = (path: string, init: RequestInit) =>
    fetch(`${API}${path}`, { credentials: "include", ...init })

export async function apiFetch(path: string, init: RequestInit = {}) {
    return send(path, init)
}
