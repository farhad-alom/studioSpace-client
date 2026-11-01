import Link from "next/link";
import Image from "next/image";
import { FaCamera, FaShieldHalved, FaUsers, FaBolt } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATS = [
    { value: "500+", label: "Creative Spaces" },
    { value: "12K+", label: "Hours Booked" },
    { value: "3K+", label: "Happy Creators" },
    { value: "4.8", label: "Average Rating" },
];

const VALUES = [
    {
        icon: FaCamera,
        title: "Built for Creators",
        desc: "Every space is listed with real equipment details, so you know exactly what you are booking.",
    },
    {
        icon: FaShieldHalved,
        title: "Trust & Safety",
        desc: "Verified hosts, clear pricing and secure deposits protect both creators and studio owners.",
    },
    {
        icon: FaBolt,
        title: "Instant Booking",
        desc: "Pick your hours, confirm in seconds and get back to doing what you love.",
    },
    {
        icon: FaUsers,
        title: "Community First",
        desc: "We help studio owners earn from idle hours while creators find affordable professional spaces.",
    },
];

export default function AboutUs() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            {/* Intro */}
            <div className="grid items-center gap-10 lg:grid-cols-2">
                <div className="relative h-72 w-full overflow-hidden rounded-xl sm:h-96">
                    <Image
                        src="/banner-image.jpg"
                        alt="Creators working inside a studio"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                <div>
                    <h2 className="mb-4 text-3xl font-bold">About Us</h2>
                    <p className="mb-4 text-muted-foreground">
                        StudioSpace is a peer-to-peer marketplace that connects filmmakers, photographers,
                        podcasters and musicians with studio owners who have space to share.
                    </p>
                    <p className="mb-6 text-muted-foreground">
                        Our mission is simple: make professional creative spaces affordable, transparent and
                        available to everyone, one booking at a time.
                    </p>
                    <Link href="/studios">
                        <Button size="lg">Explore Studios</Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
                {STATS.map((s) => (
                    <Card key={s.label} className="h-full text-center">
                        <CardContent className="space-y-1">
                            <p className="text-3xl font-bold">{s.value}</p>
                            <p className="text-sm text-muted-foreground">{s.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}