import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaVideo, FaHouse } from "react-icons/fa6";

export const metadata = { title: "404 | StudioSpace" };

export default function NotFound() {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                    <FaVideo className="size-14 text-primary" />
                </div>
                <span className="absolute -right-3 -top-2 rounded-full bg-destructive px-3 py-1 text-sm font-bold text-white">
                    404
                </span>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold sm:text-4xl">Scene Not Found</h1>
                <p className="max-w-md text-muted-foreground">
                    The page you are looking for was moved, removed, or never existed in this studio.
                </p>
            </div>

            <Link href="/">
                <Button size="lg">
                    <FaHouse className="size-4" /> Return to Home
                </Button>
            </Link>
        </section>
    );
}