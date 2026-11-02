"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/studio/StudioForm";
import { useAuth } from "@/lib/auth-provider";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/types/studio";

export default function EditStudioPage() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const router = useRouter();
    const [studio, setStudio] = useState<Studio | null>(null);

    useEffect(() => {
        if (!user) return;
        apiFetch(`/api/studios/${id}`)
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data: Studio) => {
                if (data.ownerEmail !== user.email) throw new Error();
                setStudio(data);
            })
            .catch(() => {
                toast.error("You cannot edit this studio");
                router.push("/my-listings");
            });
    }, [id, user, router]);

    return (
        <PrivateRoute>
            <div className="mx-auto max-w-3xl px-4 py-10">
                <h1 className="mb-6 text-3xl font-bold">Update Studio</h1>
                {studio ? (
                    <StudioForm studio={studio} />
                ) : (
                    <div className="flex justify-center py-20">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
}