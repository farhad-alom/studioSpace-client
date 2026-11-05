"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { ArrowRight, Sparkles } from "lucide-react";
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
        <section className="mx-auto max-w-7xl px-4 py-20">
            <div className="mb-12 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    Handpicked Spaces
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Featured{" "}
                    <span className="rounded-md bg-primary/10 px-2">Studios</span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
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
                        <article
                            key={s._id}
                            className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                                <Badge className="absolute left-3 top-3 shadow-sm">{s.category}</Badge>
                                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                                    <FaStar className="text-yellow-500" />
                                    {s.rating ?? "New"}
                                </span>
                                <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-sm font-bold text-foreground shadow-sm backdrop-blur">
                                    ${s.hourlyRate}
                                    <span className="ml-0.5 font-normal text-muted-foreground">/hr</span>
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <h3 className="line-clamp-1 text-lg font-semibold">{s.title}</h3>
                                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <FaLocationDot className="text-primary" />
                                    {s.location}
                                </p>
                            </div>

                            <div className="mt-auto border-t p-5 pt-4">
                                <Link href={`/studios/${s._id}`} className="block">
                                    <Button className="w-full">
                                        View Details
                                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <div className="mt-12 text-center">
                <Link href="/studios">
                    <Button size="lg" className="group">
                        Explore All Studios
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
