import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors the image, studio details and action buttons in ListingCard. */
export default function ListingCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
    >
      <Skeleton className="h-32 w-full shrink-0 rounded-lg sm:w-48" />

      <div className="min-w-0 flex-1 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4 max-w-64" />
        <Skeleton className="h-4 w-2/3 max-w-52" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  );
}
