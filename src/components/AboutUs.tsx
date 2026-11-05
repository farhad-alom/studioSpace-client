import Link from "next/link";
import {
    ArrowRight,
    Aperture,
    Camera,
    CheckCircle2,
    Heart,
    Lightbulb,
    ShieldCheck,
    Sparkles,
    Users,
    Video,
    Zap,
} from "lucide-react";

const VALUES = [
    {
        icon: Camera,
        number: "01",
        title: "Made for creators",
        description:
            "From photography and film to podcasts and music, discover spaces designed around the way you create.",
        accent: "text-violet-500",
        surface: "bg-violet-500/10",
    },
    {
        icon: ShieldCheck,
        number: "02",
        title: "Clarity you can trust",
        description:
            "Straightforward listings, useful space details and transparent booking information help you choose confidently.",
        accent: "text-sky-500",
        surface: "bg-sky-500/10",
    },
    {
        icon: Zap,
        number: "03",
        title: "Less friction, more flow",
        description:
            "Spend less time coordinating a space and more time bringing your next idea to life.",
        accent: "text-amber-500",
        surface: "bg-amber-500/10",
    },
    {
        icon: Users,
        number: "04",
        title: "A stronger creative community",
        description:
            "We bring space owners and creative people together, helping great spaces find the people who need them.",
        accent: "text-emerald-500",
        surface: "bg-emerald-500/10",
    },
];

const CREATIVE_TYPES = [
    { icon: Camera, label: "Photography" },
    { icon: Video, label: "Film & video" },
    { icon: Aperture, label: "Content creation" },
    { icon: Lightbulb, label: "Podcasts & more" },
];

export default function AboutUs() {
    return (
        <main className="overflow-hidden">
            {/* Hero */}
            <section className="relative isolate min-h-[620px] overflow-hidden bg-[#090B13] text-white sm:min-h-[680px]">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-cover bg-center opacity-45"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=90')",
                    }}
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(139,92,246,0.30),transparent_42%),linear-gradient(90deg,#090B13_0%,rgba(9,11,19,0.94)_42%,rgba(9,11,19,0.45)_100%)]"
                />
                <div
                    aria-hidden="true"
                    className="absolute -right-28 top-20 -z-10 h-96 w-96 rounded-full border border-white/10 sm:right-10 sm:top-12 sm:h-[520px] sm:w-[520px]"
                />
                <div
                    aria-hidden="true"
                    className="absolute -right-12 top-36 -z-10 h-72 w-72 rounded-full border border-white/10 sm:right-28 sm:top-32 sm:h-[380px] sm:w-[380px]"
                />

                <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-20 sm:min-h-[680px] sm:px-8 lg:px-10">
                    <div className="max-w-3xl">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200 backdrop-blur">
                            <Sparkles className="h-4 w-4" />
                            The story behind StudioSpace
                        </div>

                        <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                            Every great idea
                            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
                                deserves a space.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                            StudioSpace connects creative people with inspiring places to
                            make their best work. Find a space, book your time and focus on
                            what matters most — creating.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/studios"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-violet-950/20 transition hover:-translate-y-1 hover:bg-violet-100"
                            >
                                Explore studios <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#our-mission"
                                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                            >
                                Discover our mission
                            </Link>
                        </div>

                        <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/65">
                            <span className="inline-flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                Built around creators
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                Simple studio discovery
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                A community that creates
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0 hidden h-32 w-1/3 bg-gradient-to-tl from-violet-500/20 to-transparent lg:block" />
            </section>

            {/* Mission */}
            <section id="our-mission" className="relative py-20 sm:py-28">
                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -left-5 -top-5 h-28 w-28 rounded-tl-[2.5rem] border-l-2 border-t-2 border-violet-500/50" />
                        <div
                            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-950 via-slate-900 to-slate-800 shadow-2xl shadow-violet-950/15"
                            style={{
                                backgroundImage:
                                    "linear-gradient(180deg,rgba(12,10,25,.08),rgba(12,10,25,.35)),url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85')",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-black/35 p-5 text-white backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
                                    Our belief
                                </p>
                                <p className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">
                                    The right environment can turn an idea into something
                                    extraordinary.
                                </p>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-600 text-white shadow-xl shadow-violet-600/25 sm:h-24 sm:w-24">
                            <Aperture className="h-10 w-10 sm:h-12 sm:w-12" />
                        </div>
                    </div>

                    <div className="lg:pl-5">
                        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
                            <span className="h-px w-8 bg-current" />
                            Why we exist
                        </p>
                        <h2 className="max-w-xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Making creative spaces easier to find and book.
                        </h2>
                        <p className="mt-6 text-base leading-8 text-muted-foreground">
                            Finding the right studio should feel exciting — not complicated.
                            Yet discovering a suitable space, understanding what is included
                            and arranging a booking can take valuable time away from the
                            creative process.
                        </p>
                        <p className="mt-4 text-base leading-8 text-muted-foreground">
                            StudioSpace is designed to make that journey simpler. We connect
                            photographers, filmmakers, podcasters and other creators with
                            studio owners, bringing discovery and booking into one
                            convenient experience.
                        </p>
                        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                                <Heart className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold">Our mission</h3>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    Help every creator find the right place to bring their vision
                                    to life — while helping studio owners make their spaces
                                    discoverable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Creative categories */}
            <section className="border-y border-border/60 bg-muted/40 py-14 sm:py-16">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                    <div className="mx-auto mb-9 max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
                            Space for every story
                        </p>
                        <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                            Whatever you create, start here.
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {CREATIVE_TYPES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-lg sm:justify-center sm:gap-4 sm:px-5"
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white dark:text-violet-300">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span className="text-sm font-semibold sm:text-base">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                    <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
                                <span className="h-px w-8 bg-current" />
                                What guides us
                            </p>
                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                The things we believe in.
                            </h2>
                        </div>
                        <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                            Great creative experiences begin with trust, thoughtful details
                            and a community that helps good ideas grow.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {VALUES.map((value) => {
                            const Icon = value.icon;
                            return (
                                <article
                                    key={value.number}
                                    className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-950/5 sm:p-7"
                                >
                                    <div className="mb-9 flex items-center justify-between">
                                        <span
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${value.surface} ${value.accent}`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </span>
                                        <span className="text-xs font-black tracking-[0.2em] text-muted-foreground/60">
                                            {value.number}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold">{value.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                        {value.description}
                                    </p>
                                    <div className="mt-7 h-1 w-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-20" />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#11111F] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
                    <div
                        aria-hidden="true"
                        className="absolute -left-20 -top-32 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-40 -right-10 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl"
                    />
                    <div className="relative mx-auto max-w-2xl">
                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-violet-200">
                            <Sparkles className="h-7 w-7" />
                        </span>
                        <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-violet-200">
                            Your next chapter starts here
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Find your space.
                            <span className="block text-violet-200">Make your mark.</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                            Explore creative spaces and find the setting your next project
                            deserves.
                        </p>
                        <Link
                            href="/studios"
                            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-violet-100"
                        >
                            Find a studio <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
