import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors the image, details, status and action columns in BookingCard. */
export default function BookingCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
    >
      <Skeleton className="h-28 w-full shrink-0 rounded-lg sm:w-44" />

      <div className="min-w-0 flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4 max-w-64" />
        <Skeleton className="h-4 w-2/3 max-w-52" />
        <Skeleton className="h-4 w-4/5 max-w-60" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-9 w-32 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
}
