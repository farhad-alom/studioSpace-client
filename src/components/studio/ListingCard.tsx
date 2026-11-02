import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Studio } from "@/types/studio";
import Image from "next/image";

export default function ListingCard({ studio, onDelete }: { studio: Studio; onDelete: () => void }) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
            <Image width={192} height={128} src={studio.image} alt={studio.title} className="h-32 w-full rounded-lg object-cover sm:w-48" />
            <div className="flex-1">
                <span className="text-xs font-medium text-primary">{studio.category}</span>
                <h3 className="text-lg font-semibold">{studio.title}</h3>
                <p className="text-sm text-muted-foreground">{studio.location}</p>
                <p className="font-medium">${studio.hourlyRate} / hr</p>
            </div>
            <div className="flex gap-2">
                <Link href={`/studios/edit/${studio._id}`}>
                    <Button variant="outline"><Pencil className="size-4" /> Update</Button>
                </Link>
                <Button variant="destructive" onClick={onDelete}>
                    <Trash2 className="size-4" /> Delete
                </Button>
            </div>
        </div>
    );
}