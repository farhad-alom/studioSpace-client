"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandLogo from "@/components/BrandLogo";

const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/about-us" },
];

const CATEGORIES = [
    { label: "Photo Studios", value: "Photo Studio" },
    { label: "Sound Stages", value: "Film Stage" },
    { label: "Podcast Rooms", value: "Podcast Lounge" },
    { label: "Music Suites", value: "Music Suite" },
    { label: "Art Workshops", value: "Workshop" },
];

const SOCIALS = [
    { label: "X", icon: FaXTwitter, href: "https://x.com" },
    { label: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
    { label: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    { label: "YouTube", icon: FaYoutube, href: "https://youtube.com" },
];

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        toast.success("Subscribed! Fresh studio updates are on the way.");
        setEmail("");
    };

    return (
        <footer className="border-t bg-muted/40">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div className="space-y-4">
                    <BrandLogo />
                    <p className="text-sm text-muted-foreground">
                        Our mission is to make professional creative spaces affordable, transparent and
                        available to every creator.
                    </p>
                    <div className="flex gap-3">
                        {SOCIALS.map(({ label, icon: Icon, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-primary hover:text-primary-foreground"
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-4 font-semibold">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {QUICK_LINKS.map((l) => (
                            <li key={l.label}>
                                <Link href={l.href} className="transition-colors hover:text-foreground">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="mb-4 font-semibold">Popular Categories</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {CATEGORIES.map((c) => (
                            <li key={c.value}>
                                <Link
                                    href={`/studios?category=${encodeURIComponent(c.value)}`}
                                    className="transition-colors hover:text-foreground"
                                >
                                    {c.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="mb-4 font-semibold">Newsletter</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Get new studio listings and creator tips straight to your inbox.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                        <Input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row">
                    <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
                    <p>By using StudioSpace you agree to our Terms of Service & Privacy Policy.</p>
                </div>
            </div>
        </footer>
    );
}
