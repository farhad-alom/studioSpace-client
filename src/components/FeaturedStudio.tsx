"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Studio = {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    location: string;
    image: string;
    rating?: number;
};

const API_URL = "";

export default function FeaturedStudios() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();


        fetch(`${API_URL}/api/studios?limit=6`, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error("Failed");
                return res.json();
            })
            .then((data) => {
                setStudios(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                setLoading(false);
                toast.error("Could not load featured studios.");
            });

        return () => controller.abort();
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-10 text-center">
                <h2 className="mb-3 text-3xl font-bold">Featured Studios</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    Hand-picked creative spaces, ready to book for your next shoot, session or recording.
                </p>
            </div>

            {loading && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-96 w-full rounded-xl" />
                    ))}
                </div>
            )}

            {!loading && studios.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {studios.map((s) => (
                        <Card key={s._id} className="flex h-full flex-col overflow-hidden pt-0">
                            <div className="relative h-52 w-full">
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                                <Link href={`/studios/${s._id}`}>
                                    <Button className="w-full">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <div className="mt-10 text-center">
                <Button size="lg">
                    <Link href="/studios">Explore All Studios</Link>
                </Button>
            </div>
        </section>
    );
}