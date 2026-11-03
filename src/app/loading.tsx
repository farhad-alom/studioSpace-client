import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="size-7 animate-spin text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Loading StudioSpace...</p>
        </div>
    );
}
