import Image from "next/image";
import { Button } from "@/components/ui/button";

// Shape of one booking document returned by GET /api/my-bookings
export interface Booking {
    _id: string;
    studioTitle: string;
    studioImage?: string;
    studioCategory?: string | null;
    studioLocation?: string | null;
    date: string;
    startTime?: string;
    endTime?: string;
    totalPrice?: number;
    status: string;
}

interface BookingCardProps {
    booking: Booking;
    onCancel: () => void;
}

const COLORS: Record<string, string> = {
    Pending: "bg-yellow-500/15 text-yellow-600",
    Confirmed: "bg-green-500/15 text-green-600",
    Completed: "bg-blue-500/15 text-blue-600",
    Cancelled: "bg-red-500/15 text-red-600",
};

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
            {booking.studioImage ? (
                <Image
                    src={booking.studioImage}
                    alt={booking.studioTitle}
                    width={176}
                    height={112}
                    unoptimized
                    className="h-28 w-full rounded-lg object-cover sm:w-44"
                />
            ) : (
                <div className="h-28 w-full rounded-lg bg-muted sm:w-44" />
            )}
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{booking.studioTitle}</h3>
                <p className="text-sm text-muted-foreground">
                    {booking.studioCategory || "—"} · {booking.studioLocation || "—"}
                </p>
                <p className="text-sm text-muted-foreground">
                    {booking.date} · {booking.startTime} - {booking.endTime}
                </p>
                <p className="font-medium">Total: ${booking.totalPrice}</p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${COLORS[booking.status] || "bg-muted text-muted-foreground"}`}>
                    {booking.status}
                </span>
                {booking.status === "Pending" && (
                    <Button variant="outline" onClick={onCancel}>Cancel Booking</Button>
                )}
            </div>
        </div>
    );
}