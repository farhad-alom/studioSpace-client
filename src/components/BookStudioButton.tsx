"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-provider";
import { apiFetch } from "@/lib/api";

type Props = {
    studioId: string;
    title: string;
    category: string;
    location: string;
    image: string;
    rate: number;
};

export default function BookStudioButton({
    studioId,
    title,
    category,
    location,
    image,
    rate,
}: Props) {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const todayStr = new Date().toISOString().split("T")[0];

    const minutes = (t: string) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    };

    const startMin = startTime ? minutes(startTime) : 0;
    const endMin = endTime ? minutes(endTime) : 0;
    const totalHours = endMin > startMin ? (endMin - startMin) / 60 : 0;
    const totalPrice = totalHours > 0 ? totalHours * rate : 0;

    const isValid =
        Boolean(date) &&
        Boolean(startTime) &&
        Boolean(endTime) &&
        endTime > startTime &&
        date >= todayStr;

    const handleConfirm = async () => {
        if (!isValid) {
            setError("Please select a valid date, start time and end time.");
            return;
        }
        setSubmitting(true);
        setError("");
        try {
            const res = await apiFetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studioId, date, startTime, endTime, totalPrice }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data.message || "Booking failed. Please try again.");
                setSubmitting(false);
                return;
            }
            setOpen(false);
            setDate("");
            setStartTime("");
            setEndTime("");
            setError("");
            toast.success("Booking request submitted successfully!");
            router.push("/my-bookings");
        } catch {
            setError("Booking failed. Please try again.");
            setSubmitting(false);
        }
    };

    const closeModal = () => {
        if (submitting) return;
        setOpen(false);
        setError("");
    };

    return (
        <>
            <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
                Book Workspace Now
            </Button>

            <Dialog open={open} onOpenChange={closeModal}>
                <DialogContent className="max-w-md">
                    {authLoading ? (
                        <DialogHeader>
                            <DialogTitle>Loading</DialogTitle>
                            <DialogDescription>Checking your session...</DialogDescription>
                        </DialogHeader>
                    ) : !isAuthenticated ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Login Required</DialogTitle>
                                <DialogDescription>
                                    You need an account to book a studio. Please login to continue.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="gap-2">
                                <Button variant="outline" onClick={closeModal}>Close</Button>
                                <Button onClick={() => { closeModal(); router.push("/login"); }}>Go to Login</Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>Book Studio</DialogTitle>
                                <DialogDescription>Complete the booking details below.</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <img src={image} alt={title} className="h-40 w-full rounded-lg object-cover" />

                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">{title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {category} · {location}
                                    </p>
                                    <p className="text-sm font-medium">${rate} / hr</p>
                                </div>

                                <div className="space-y-4 rounded-xl border p-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Booking date</label>
                                        <Input type="date" value={date} min={todayStr} onChange={(e) => setDate(e.target.value)} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Start time</label>
                                            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">End time</label>
                                            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg bg-muted p-3 text-sm">
                                        <span className="text-muted-foreground">Total price</span>
                                        <span className="font-semibold">${totalPrice} ({totalHours} hr × ${rate})</span>
                                    </div>

                                    {error && <p className="text-sm text-destructive">{error}</p>}
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button variant="outline" onClick={closeModal} disabled={submitting}>
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirm} disabled={submitting || !isValid}>
                                    {submitting ? "Booking..." : "Confirm Booking"}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
