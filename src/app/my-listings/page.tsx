"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PrivateRoute from "@/components/PrivateRoute";
import ListingCard from "@/components/studio/ListingCard";
import DeleteModal from "@/components/studio/DeleteModal";
import { apiFetch } from "@/lib/api";
import { Studio } from "@/types/studio";

export default function MyListingsPage() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [target, setTarget] = useState<Studio | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        apiFetch("/api/my-studios")
            .then((res) => res.json())
            .then(setStudios)
            .catch(() => toast.error("Could not load your studios"))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async () => {
        if (!target) return;
        setDeleting(true);
        const res = await apiFetch(`/api/studios/${target._id}`, { method: "DELETE" });
        setDeleting(false);
        if (!res.ok) return toast.error("Delete failed");
        setStudios((list) => list.filter((s) => s._id !== target._id));
        setTarget(null);
        toast.success("Studio deleted");
    };

    return (
        <PrivateRoute>
            <div className="mx-auto max-w-5xl space-y-4 px-4 py-10">
                <h1 className="text-3xl font-bold">My Studio Listings</h1>

                {loading && [1, 2, 3].map((i) => (
                    <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
                ))}

                {!loading && studios.length === 0 && (
                    <div className="rounded-xl border p-10 text-center">
                        <p className="mb-4 text-muted-foreground">You have not listed any studio yet.</p>
                        <Link href="/add-studio"><Button>Add Your First Studio</Button></Link>
                    </div>
                )}

                {studios.map((s) => (
                    <ListingCard key={s._id} studio={s} onDelete={() => setTarget(s)} />
                ))}

                <DeleteModal
                    title={target?.title}
                    loading={deleting}
                    onClose={() => setTarget(null)}
                    onConfirm={handleDelete}
                />
            </div>
        </PrivateRoute>
    );
}