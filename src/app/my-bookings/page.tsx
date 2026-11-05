"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import PrivateRoute from "@/components/PrivateRoute";
import BookingCard from "@/components/booking/BookingCard";
import BookingCardSkeleton from "@/components/booking/BookingCardSkeleton";
import { apiFetch } from "@/lib/api";
import type { Booking } from "@/components/booking/BookingCard";


export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [target, setTarget] = useState<Booking | null>(null);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        apiFetch("/api/my-bookings")
            .then((res) => res.json() as Promise<Booking[]>)
            .then((data) => setBookings(Array.isArray(data) ? data.filter(Boolean) : []))
            .catch(() => toast.error("Could not load bookings"))
            .finally(() => setLoading(false));
    }, []);

    const handleCancel = async () => {
        if (!target) return;
        setBusy(true);
        const res = await apiFetch(`/api/bookings/${target._id}/cancel`, { method: "PATCH" });
        setBusy(false);
        if (!res.ok) return toast.error("Cancel failed");
        setBookings((list) =>
            list.map((b) => (b._id === target._id ? { ...b, status: "Cancelled" } : b))
        );
        setTarget(null);
        toast.success("Booking cancelled");
    };

    const handleConfirm = async (id: string) => {
        const res = await apiFetch(`/api/bookings/${id}/confirm`, { method: "PATCH" });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            return toast.error(data.message || "Confirm failed");
        }
        setBookings((list) => list.map((b) => (b._id === id ? { ...b, status: "Confirmed" } : b)));
        toast.success("Booking confirmed");
    };







    return (
        <PrivateRoute>
            <div className="mx-auto max-w-5xl space-y-4 px-4 py-10">
                <h1 className="text-3xl font-bold">My Bookings</h1>

                {loading && (
                    <div className="space-y-4" aria-label="Loading bookings">
                        {[1, 2, 3].map((i) => <BookingCardSkeleton key={i} />)}
                    </div>
                )}

                {!loading && bookings.length === 0 && (
                    <div className="rounded-xl border p-10 text-center">
                        <p className="mb-4 text-muted-foreground">You have no bookings yet.</p>
                        <Link href="/studios"><Button>Explore Studios</Button></Link>
                    </div>
                )}

                {!loading && bookings.map((b) => (
                    <BookingCard key={b._id} booking={b} onCancel={() => setTarget(b)} onConfirm={() => handleConfirm(b._id)} />
                ))}

                <Dialog open={!!target} onOpenChange={(open) => !open && setTarget(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Cancel this booking?</DialogTitle>
                            <DialogDescription>{target?.studioTitle} on {target?.date}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setTarget(null)}>Keep It</Button>
                            <Button variant="destructive" disabled={busy} onClick={handleCancel}>
                                {busy ? "Cancelling..." : "Yes, Cancel"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PrivateRoute>
    );
}
