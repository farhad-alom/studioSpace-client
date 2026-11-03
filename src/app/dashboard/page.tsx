"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    Building2,
    CalendarCheck,
    CalendarCheck2,
    CalendarClock,
    Compass,
    List,
    PlusCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PrivateRoute from "@/components/PrivateRoute";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-provider";

interface DashboardStats {
    totalStudios: number;
    myStudios: number;
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
}

const STATS = [
    { key: "totalStudios", label: "Total Studios", icon: Building2, className: "bg-blue-500/10 text-blue-600" },
    { key: "myStudios", label: "My Studio Listings", icon: List, className: "bg-violet-500/10 text-violet-600" },
    { key: "totalBookings", label: "Total Bookings", icon: CalendarCheck, className: "bg-emerald-500/10 text-emerald-600" },
    { key: "pendingBookings", label: "Pending Bookings", icon: CalendarClock, className: "bg-yellow-500/10 text-yellow-600" },
    { key: "confirmedBookings", label: "Confirmed Bookings", icon: CalendarCheck2, className: "bg-sky-500/10 text-sky-600" },
] as const;

const QUICK_ACTIONS = [
    { href: "/add-studio", label: "Add New Studio", desc: "List a new creative space", icon: PlusCircle },
    { href: "/my-listings", label: "My Studio Listings", desc: "Update or delete your spaces", icon: List },
    { href: "/my-bookings", label: "My Bookings", desc: "Track and cancel your bookings", icon: CalendarCheck },
    { href: "/studios", label: "Explore Studios", desc: "Find spaces for your next project", icon: Compass },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/api/dashboard/stats")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load stats");
                return res.json() as Promise<DashboardStats>;
            })
            .then(setStats)
            .catch(() => toast.error("Could not load dashboard stats"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <PrivateRoute>
            <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="mt-1 text-muted-foreground">
                        Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! Here is an overview of your activity.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {loading && STATS.map((s) => (
                        <Skeleton key={s.key} className="h-28 rounded-xl" />
                    ))}

                    {!loading && STATS.map(({ key, label, icon: Icon, className }) => (
                        <Card key={key} className="pt-0">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${className}`}>
                                    <Icon className="size-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stats?.[key] ?? 0}</p>
                                    <p className="text-sm text-muted-foreground">{label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {QUICK_ACTIONS.map(({ href, label, desc, icon: Icon }) => (
                            <Link key={href} href={href} className="h-full">
                                <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                                    <CardContent className="flex items-center gap-4 p-5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            <Icon className="size-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{label}</p>
                                            <p className="text-sm text-muted-foreground">{desc}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
}
