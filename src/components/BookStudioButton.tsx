"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function BookStudioButton({ title, rate }: { title: string; rate: number }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
                Book Workspace Now
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Book {title}</DialogTitle>
                        <DialogDescription>${rate} / hr. Booking form will be added here.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}