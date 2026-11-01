import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid gap-10 lg:grid-cols-2">
                <Skeleton className="h-72 w-full rounded-xl sm:h-96" />
                <div className="space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </section>
    );
}