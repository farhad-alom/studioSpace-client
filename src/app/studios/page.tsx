"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Studio = {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    location: string;
    image: string;
    rating?: number;
};

const CATEGORIES = [
    "All",
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
];

export default function ExploreAll() {
    const params = useSearchParams();
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(params.get("category") || "All");

    useEffect(() => {
        setLoading(true);
        const q = new URLSearchParams();
        if (category !== "All") q.set("category", category);
        if (search.trim()) q.set("search", search.trim());

        const t = setTimeout(() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios?${q}`)
                .then((r) => r.json())
                .then((data) => setStudios(Array.isArray(data) ? data : []))
                .catch(() => setStudios([]))
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(t);
    }, [category, search]);

    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="mb-8 text-3xl font-bold">Explore Studios</h2>

            {/* Filters */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <Input
                    placeholder="Search by title or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="sm:max-w-sm"
                />
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="sm:w-56">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-96 w-full rounded-xl" />
                    ))}
                </div>
            )}

            {/* Empty */}
            {!loading && studios.length === 0 && (
                <div className="py-20 text-center">
                    <h3 className="mb-2 text-xl font-semibold">No studios found</h3>
                    <p className="mb-6 text-muted-foreground">
                        Try a different category or search term.
                    </p>
                    <Button
                        onClick={() => {
                            setSearch("");
                            setCategory("All");
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}

            {/* Grid */}
            {!loading && studios.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {studios.map((s) => (
                        <Card key={s._id} className="flex h-full flex-col overflow-hidden pt-0">
                            <div className="relative h-52 w-full">
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                <Badge className="absolute left-3 top-3">{s.category}</Badge>
                            </div>
                            <CardContent className="flex-1 space-y-2">
                                <h3 className="line-clamp-1 text-lg font-semibold">{s.title}</h3>
                                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <FaLocationDot /> {s.location}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold">${s.hourlyRate} / hr</span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <FaStar className="text-yellow-500" /> {s.rating ?? "New"}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <Link href={`/studios/${s._id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}