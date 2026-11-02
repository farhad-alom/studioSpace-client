
"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-provider";
import { uploadImage } from "@/lib/upload-image";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";
import { apiFetch } from "@/lib/api";

const CATEGORIES = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"];
const AMENITIES = ["Wi-Fi", "Air Conditioning", "Parking", "Green Screen", "Cyc Wall", "Studio Lights", "Soundproofing", "Microphones", "Mixing Console", "Makeup Room", "Props", "Coffee & Snacks"];
const fieldClass = "w-full rounded-md border bg-background px-3 py-2 text-sm";

export default function StudioForm({ studio }: { studio?: Studio }) {
    const router = useRouter();
    const { user } = useAuth();
    const isEdit = !!studio;

    const [category, setCategory] = React.useState(studio?.category || CATEGORIES[0]);
    const [amenities, setAmenities] = React.useState<string[]>(studio?.amenities || []);
    const [file, setFile] = React.useState<File | null>(null);
    const [preview, setPreview] = React.useState(studio?.image || "");
    const [loading, setLoading] = React.useState(false);

    const toggleAmenity = (item: string) =>
        setAmenities(prev => prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        if (!selected.type.startsWith("image/") || selected.size > 5 * 1024 * 1024)
            return toast.error("Select an image smaller than 5MB");

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        if (!file && !studio?.image) return toast.error("Please upload an image");

        setLoading(true);
        try {
            const body = {
                title: form.get("title"),
                category,
                hourlyRate: Number(form.get("hourlyRate")),
                securityDeposit: Number(form.get("securityDeposit")),
                maxCapacity: Number(form.get("maxCapacity")),
                location: form.get("location"),
                image: file ? await uploadImage(file) : studio!.image,
                amenities,
                overview: form.get("overview"),
            };

            const url = `/api/studios${isEdit ? `/${studio!._id}` : ""}`;
            const res = await apiFetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(res.status === 401 ? "Session expired. Login again." : data.message || "Something went wrong");

            toast.success(isEdit ? "Studio updated!" : "Studio added!");
            router.push("/my-listings");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        ["hourlyRate", "Hourly Rate ($)", 1],
        ["securityDeposit", "Security Deposit ($)", 0],
        ["maxCapacity", "Max Capacity", 1],
    ] as const;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-card p-5 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <Label>Studio Title</Label>
                    <Input name="title" defaultValue={studio?.title} required />
                </div>
                <div>
                    <Label>Category</Label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className={fieldClass}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                {fields.map(([name, label, min]) => (
                    <div key={name}>
                        <Label>{label}</Label>
                        <Input name={name} type="number" min={min} defaultValue={studio?.[name]} required />
                    </div>
                ))}
            </div>

            <div>
                <Label>Location</Label>
                <Input name="location" defaultValue={studio?.location} required />
            </div>

            <div>
                <Label>Studio Image</Label>
                <label htmlFor="image" className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-4">
                    {preview ? (
                        <Image src={preview} alt="Preview" width={640} height={360} unoptimized className="h-48 w-full rounded-md object-cover" />
                    ) : <ImagePlus className="size-8" />}
                    <span>Click to upload (Max 5MB)</span>
                </label>
                <input id="image" type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>

            <div>
                <Label>Amenities</Label>
                <div className="flex flex-wrap gap-2">
                    {AMENITIES.map(item => (
                        <button key={item} type="button" onClick={() => toggleAmenity(item)}
                            className={cn("rounded-full border px-3 py-1 text-xs", amenities.includes(item) ? "bg-primary text-primary-foreground" : "hover:border-primary")}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <Label>Detailed Overview</Label>
                <textarea name="overview" rows={5} defaultValue={studio?.overview} className={fieldClass} required />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <Label>Host Name</Label>
                    <Input value={studio?.ownerName || user?.name || ""} readOnly />
                </div>
                <div>
                    <Label>Host Email</Label>
                    <Input value={studio?.ownerEmail || user?.email || ""} readOnly />
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Please wait...</> : isEdit ? "Update Studio" : "Add Studio"}
            </Button>
        </form>
    );
}
