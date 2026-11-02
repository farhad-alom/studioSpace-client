export async function uploadImage(file: File): Promise<string> {
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY
    if (!key) throw new Error("Image upload key is missing")

    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        body: formData,
    })
    const data = await res.json()

    if (!res.ok || !data?.data?.url) {
        throw new Error("Image upload failed")
    }
    return data.data.url as string
}