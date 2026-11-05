import { FaShieldHalved, FaCircleCheck, FaScrewdriverWrench, FaHeadset } from "react-icons/fa6";
import { ShieldCheck } from "lucide-react";

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

const STATS = [
    { value: "100%", label: "Verified Profiles" },
    { value: "24/7", label: "Creator Support" },
    { value: "$0", label: "Hidden Fees" },
];

export default function HostGuarantee() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-4">
            <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground">
                {/* soft glow decorations */}
                <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />

                <div className="relative px-6 py-14 sm:px-12">
                    <div className="mb-12 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Platform Promise
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Host Guarantee &{" "}
                            <span className="rounded-md bg-primary-foreground/15 px-2">Creator Support</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
                            Book and host with confidence. Every space on StudioSpace is backed by our platform promise.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {GUARANTEES.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary-foreground/10"
                            >
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground text-primary shadow-md">
                                    <Icon className="text-xl" />
                                </div>
                                <h3 className="font-semibold">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-8 text-center">
                        {STATS.map(({ value, label }) => (
                            <div key={label}>
                                <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">{value}</p>
                                <p className="mt-1 text-xs text-primary-foreground/60 sm:text-sm">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
