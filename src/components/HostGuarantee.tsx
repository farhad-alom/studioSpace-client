import { FaShieldHalved, FaCircleCheck, FaScrewdriverWrench, FaHeadset } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";

const GUARANTEES = [
    {
        icon: FaShieldHalved,
        title: "Liability Protection",
        desc: "Every confirmed booking is covered, so hosts and creators can focus on the work, not the risk.",
    },
    {
        icon: FaCircleCheck,
        title: "Verified Profiles",
        desc: "Hosts and creators are identity-checked before they can list or book a space.",
    },
    {
        icon: FaScrewdriverWrench,
        title: "Equipment Safety",
        desc: "Security deposits and clear usage rules keep studio gear safe and well maintained.",
    },
    {
        icon: FaHeadset,
        title: "24/7 Host Support",
        desc: "Our support team is always available to help with bookings, disputes or last-minute changes.",
    },
];

export default function HostGuarantee() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-10 text-center">
                <h2 className="mb-3 text-3xl font-bold">Host Guarantee & Creator Support</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    Book and host with confidence. Every space on StudioSpace is backed by our platform promise.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {GUARANTEES.map(({ icon: Icon, title, desc }) => (
                    <Card key={title} className="h-full text-center">
                        <CardContent className="flex h-full flex-col items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Icon className="text-xl" />
                            </div>
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}