"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaCamera,
    FaFilm,
    FaMicrophone,
    FaMusic,
    FaPalette,
} from "react-icons/fa6";
import { ArrowRight, Asterisk } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  StudioSpace · "Cinema Spotlight" — Browse by Category              */
/*  Self-contained drop-in: scoped styles (ssc-*), zero globals edits. */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
    {
        label: "Photo Studios",
        value: "Photo Studio",
        icon: FaCamera,
        desc: "Cyc walls, strobes and portrait setups",
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        accent: "#f59e0b", // golden-hour amber
    },
    {
        label: "Sound Stages",
        value: "Film Stage",
        icon: FaFilm,
        desc: "Soundproof stages for film and ads",
        image:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
        accent: "#f43f5e", // tally-light rose
    },
    {
        label: "Podcast Rooms",
        value: "Podcast Lounge",
        icon: FaMicrophone,
        desc: "Acoustic rooms with pro mics",
        image:
            "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=900&q=80",
        accent: "#a78bfa", // on-air violet
    },
    {
        label: "Music Suites",
        value: "Music Suite",
        icon: FaMusic,
        desc: "Recording booths and rehearsal rooms",
        image:
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
        accent: "#34d399", // VU-meter green
    },
    {
        label: "Art Workshops",
        value: "Workshop",
        icon: FaPalette,
        desc: "Creative spaces for classes and crafts",
        image:
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
        accent: "#38bdf8", // pigment cyan
    },
];

const SSC_CSS = `
/* ---- entrance ---- */
.ssc-card { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); transition-delay: calc(var(--i, 0) * 95ms); }
.ssc-in .ssc-card { opacity: 1; transform: translateY(0); }

/* ---- per-card light layers ---- */
.ssc-spot { background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--acc) 40%, transparent), transparent 72%); mix-blend-mode: screen; }
.ssc-tint { background: linear-gradient(165deg, color-mix(in oklab, var(--acc) 60%, transparent) 0%, transparent 55%); mix-blend-mode: overlay; }
.ssc-glow { box-shadow: 0 24px 70px -18px color-mix(in oklab, var(--acc) 55%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--acc) 45%, transparent); }
.ssc-card:hover .ssc-chip { background-color: var(--acc); border-color: transparent; color: #000; }
.ssc-card:hover .ssc-cta { background-color: var(--acc); border-color: transparent; }
.ssc-card:hover .ssc-cta svg { transform: rotate(-45deg); }
.ssc-grain { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E"); opacity: .14; mix-blend-mode: overlay; }

/* ---- marquee ---- */
@keyframes ssc-marquee { to { transform: translateX(-50%); } }
.ssc-track { animation: ssc-marquee 32s linear infinite; will-change: transform; }
.ssc-marquee:hover .ssc-track { animation-play-state: paused; }
.ssc-outline { color: transparent; -webkit-text-stroke: 1.5px color-mix(in oklab, var(--muted-foreground) 50%, transparent); }

/* ---- reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .ssc-track { animation: none; }
  .ssc-card { opacity: 1 !important; transform: none !important; transition: none !important; }
}
`;

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function BrowseCategories() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    /* Reveal the stage once the section scrolls into view */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    /* Spotlight tracking + subtle 3D tilt (desktop pointers only) */
    function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
        if (!hasFinePointer() || prefersReducedMotion()) return;
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        const tilt = el.querySelector<HTMLElement>(".ssc-tilt");
        if (tilt) {
            const rx = (0.5 - py) * 7;
            const ry = (px - 0.5) * 9;
            tilt.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        }
    }

    function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
        const tilt = e.currentTarget.querySelector<HTMLElement>(".ssc-tilt");
        if (tilt) tilt.style.transform = "";
    }

    return (
        <section
            ref={sectionRef}
            className={`relative overflow-hidden py-20 sm:py-24 ${inView ? "ssc-in" : ""}`}
        >
            {/* scoped styles */}
            <style dangerouslySetInnerHTML={{ __html: SSC_CSS }} />

            {/* stage lighting: center bloom + two crossing beams */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="absolute left-1/2 top-[-340px] h-[560px] w-[920px] max-w-none -translate-x-1/2 rounded-full blur-3xl"
                    style={{
                        background:
                            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 13%, transparent), transparent)",
                    }}
                />
                <div className="absolute -top-28 left-[10%] h-[440px] w-36 rotate-[16deg] bg-gradient-to-b from-foreground/5 to-transparent blur-2xl sm:w-44" />
                <div className="absolute -top-28 right-[10%] h-[440px] w-36 -rotate-[16deg] bg-gradient-to-b from-foreground/5 to-transparent blur-2xl sm:w-44" />
            </div>

            <div className="mx-auto max-w-7xl px-4">
                {/* ---------- header ---------- */}
                <div className="ssc-card mb-14 text-center" style={{ "--i": 0 } as React.CSSProperties}>
                    <span className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-background">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                        </span>
                        Now Showing · Find Your Space
                    </span>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        Browse by{" "}
                        <span className="rounded-md bg-primary/10 px-2">Category</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        Five stages, one goal — pick the kind of space you need and jump
                        straight into matching studios that are ready to book by the hour.
                    </p>
                    <div
                        className="mt-5 flex items-center justify-center gap-1.5"
                        aria-hidden
                    >
                        {CATEGORIES.map((c) => (
                            <span
                                key={c.value}
                                title={c.label}
                                className="h-1.5 w-8 rounded-full transition-transform duration-300 hover:scale-y-150"
                                style={{ backgroundColor: c.accent }}
                            />
                        ))}
                    </div>
                </div>

                {/* ---------- cards ---------- */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
                    {CATEGORIES.map((c, idx) => {
                        const Icon = c.icon;
                        const wide = idx === CATEGORIES.length - 1;
                        return (
                            <Link
                                key={c.value}
                                href={`/studios?category=${encodeURIComponent(c.value)}`}
                                aria-label={`Browse ${c.label}`}
                                onMouseMove={handleMove}
                                onMouseLeave={handleLeave}
                                style={{ "--acc": c.accent, "--i": idx + 1 } as React.CSSProperties}
                                className={`ssc-card group relative block overflow-hidden rounded-[1.6rem] border bg-card shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${wide ? "max-lg:col-span-2" : ""
                                    }`}
                            >
                                {/* tilt wrapper */}
                                <div
                                    className={`ssc-tilt relative w-full transition-transform duration-300 ease-out will-change-transform ${wide ? "aspect-[16/10] lg:aspect-[3/4]" : "aspect-[3/4]"
                                        }`}
                                >
                                    {/* photo */}
                                    <Image
                                        src={c.image}
                                        alt={c.label}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                        unoptimized
                                        className="object-cover saturate-[0.82] transition-all duration-700 ease-out group-hover:scale-110 group-hover:saturate-100"
                                    />

                                    {/* scrim */}
                                    <div
                                        aria-hidden
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10"
                                    />
                                    {/* accent tint (hover) */}
                                    <div
                                        aria-hidden
                                        className="ssc-tint absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                    {/* cursor spotlight (hover) */}
                                    <div
                                        aria-hidden
                                        className="ssc-spot absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                    {/* film grain */}
                                    <div aria-hidden className="ssc-grain absolute inset-0" />
                                    {/* accent glow ring (hover) */}
                                    <div
                                        aria-hidden
                                        className="ssc-glow absolute inset-0 rounded-[1.6rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />

                                    {/* top row: index + icon chip */}
                                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                                        <span className="font-mono text-xs font-semibold tracking-[0.25em] text-white/75">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="ssc-chip grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-500">
                                            <Icon className="text-base" />
                                        </span>
                                    </div>

                                    {/* bottom content */}
                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                                        <div className="min-w-0">
                                            <h3 className="text-[15px] font-bold leading-snug tracking-tight text-white sm:text-base">
                                                {c.label}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-xs text-white/70 sm:text-[13px]">
                                                {c.desc}
                                            </p>
                                            <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-xs font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                                Explore spaces
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                        <span className="ssc-cta grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-500">
                                            <ArrowRight className="h-4 w-4 transition-transform duration-500" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* ---------- browse-all CTA ---------- */}
                <div
                    className="ssc-card mt-12 text-center"
                    style={{ "--i": 6 } as React.CSSProperties}
                >
                    <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow transition-all duration-300 hover:gap-3.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        Can&apos;t decide? Browse all studios
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* ---------- marquee ticker ---------- */}
            <div
                aria-hidden
                className="ssc-marquee mt-16 overflow-hidden border-y border-border/60 py-4 sm:mt-20 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            >
                <div className="ssc-track flex w-max">
                    {[0, 1].map((half) => (
                        <div
                            key={half}
                            className={`flex shrink-0 items-center gap-8 pr-8 ${half === 1 ? "aria-hidden" : ""}`}
                        >
                            {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
                                <span key={`${half}-${c.value}-${i}`} className="flex items-center gap-8">
                                    <span className="ssc-outline whitespace-nowrap text-lg font-extrabold uppercase tracking-[0.18em] sm:text-xl">
                                        {c.label}
                                    </span>
                                    <Asterisk
                                        className="h-4 w-4"
                                        style={{ color: c.accent }}
                                    />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
