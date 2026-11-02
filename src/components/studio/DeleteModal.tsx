"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

type Props = {
    title?: string;
    loading: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteModal({ title, loading, onClose, onConfirm }: Props) {
    return (
        <Dialog open={!!title} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete studio?</DialogTitle>
                    <DialogDescription>
                        "{title}" will be removed forever. This cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" disabled={loading} onClick={onConfirm}>
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}