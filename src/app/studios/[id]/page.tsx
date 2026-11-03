import { notFound } from "next/navigation";
import { FaStar, FaLocationDot, FaUsers, FaCircleCheck, FaShieldHalved } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import StudioGallery from "@/components/StudioGallery";
import BookStudioButton from "@/components/BookStudioButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Studio = {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit?: number;
    capacity?: number;
    location: string;
    image: string;
    gallery?: string[];
    amenities?: string[];
    rating?: number;
    overview?: string;
    ownerName?: string;
    ownerEmail?: string;
};

async function getStudio(id: string): Promise<Studio | null> {
    try {
        const res = await fetch(`${API_URL}/api/studios/${id}`, { cache: "no-store" });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export default async function StudioDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const studio = await getStudio(id);
    if (!studio) notFound();

    const images = studio.gallery?.length ? studio.gallery : [studio.image];

    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid gap-10 lg:grid-cols-2">
                {/* Gallery */}
                <StudioGallery images={images} title={studio.title} />

                {/* Info */}
                <div className="space-y-5">
                    <Badge>{studio.category}</Badge>
                    <h1 className="text-3xl font-bold sm:text-4xl">{studio.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <FaLocationDot /> {studio.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" /> {studio.rating ?? "New"}
                        </span>
                        {studio.capacity && (
                            <span className="flex items-center gap-1">
                                <FaUsers /> Up to {studio.capacity} people
                            </span>
                        )}
                    </div>

                    <div className="flex items-end justify-between rounded-xl border p-4">
                        <div>
                            <p className="text-3xl font-bold">${studio.hourlyRate} / hr</p>
                            {studio.securityDeposit !== undefined && (
                                <p className="text-sm text-muted-foreground">
                                    Security deposit: ${studio.securityDeposit}
                                </p>
                            )}
                        </div>
                        <FaShieldHalved className="text-2xl text-muted-foreground" />
                    </div>

                    <BookStudioButton
                        studioId={studio._id}
                        title={studio.title}
                        category={studio.category}
                        location={studio.location}
                        image={studio.image}
                        rate={studio.hourlyRate}
                    />
                </div>
            </div>

            {/* Overview, Amenities, Host, Reviews */}
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardContent className="space-y-3">
                            <h2 className="text-xl font-semibold">Overview</h2>
                            <p className="text-muted-foreground">
                                {studio.overview || "The host has not added an overview yet."}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="space-y-4">
                            <h2 className="text-xl font-semibold">Amenities</h2>
                            {studio.amenities?.length ? (
                                <ul className="grid gap-3 sm:grid-cols-2">
                                    {studio.amenities.map((a) => (
                                        <li key={a} className="flex items-center gap-2 text-sm">
                                            <FaCircleCheck className="text-primary" /> {a}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No amenities listed.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="space-y-3">
                            <h2 className="text-xl font-semibold">Reviews</h2>
                            <p className="text-sm text-muted-foreground">
                                No reviews yet. Be the first creator to book and share your experience.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="h-fit">
                    <CardContent className="space-y-3">
                        <h2 className="text-xl font-semibold">Hosted by</h2>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                                {(studio.ownerName || "H").charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold">{studio.ownerName || "StudioSpace Host"}</p>
                                <p className="text-sm text-muted-foreground">{studio.ownerEmail}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
