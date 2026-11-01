import Link from "next/link";
import { FaCamera, FaFilm, FaMicrophone, FaMusic, FaPalette } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
    {
        label: "Photo Studios",
        value: "Photo Studio",
        icon: FaCamera,
        desc: "Cyc walls, strobes and portrait setups",
    },
    {
        label: "Sound Stages",
        value: "Film Stage",
        icon: FaFilm,
        desc: "Soundproof stages for film and ads",
    },
    {
        label: "Podcast Rooms",
        value: "Podcast Lounge",
        icon: FaMicrophone,
        desc: "Acoustic rooms with pro mics",
    },
    {
        label: "Music Suites",
        value: "Music Suite",
        icon: FaMusic,
        desc: "Recording booths and rehearsal rooms",
    },
    {
        label: "Art Workshops",
        value: "Workshop",
        icon: FaPalette,
        desc: "Creative spaces for classes and crafts",
    },
];

export default function BrowseCategories() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-10 text-center">
                <h2 className="mb-3 text-3xl font-bold">Browse by Category</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    Pick the type of space you need and jump straight to matching studios.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                {CATEGORIES.map(({ label, value, icon: Icon, desc }) => (
                    <Link
                        key={value}
                        href={`/studios?category=${encodeURIComponent(value)}`}
                        className="h-full"
                    >
                        <Card className="h-full text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                            <CardContent className="flex h-full flex-col items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Icon className="text-xl" />
                                </div>
                                <h3 className="font-semibold">{label}</h3>
                                <p className="text-sm text-muted-foreground">{desc}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}