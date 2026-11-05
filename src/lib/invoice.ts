import { jsPDF } from "jspdf";

/**
 * Shape of a booking document used for the invoice.
 * Extra fields (userName / userEmail) are returned by GET /api/my-bookings
 * but were not declared in the original Booking interface.
 */
export interface InvoiceBooking {
    _id: string;
    studioTitle: string;
    studioCategory?: string | null;
    studioLocation?: string | null;
    date: string;
    startTime?: string;
    endTime?: string;
    totalPrice?: number;
    status: string;
    userName?: string | null;
    userEmail?: string | null;
}

const INK = { r: 17, g: 24, b: 39 };      // #111827 dark slate
const MUTED = { r: 107, g: 114, b: 128 }; // #6B7280 gray
const ACCENT = { r: 5, g: 150, b: 105 };  // #059669 emerald

const toMinutes = (t?: string) => {
    if (!t) return 0;
    const [h, m] = String(t).split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
};

/** Builds the invoice PDF document (testable without a browser). */
export function buildInvoiceDoc(booking: InvoiceBooking): jsPDF {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const M = 48;
    const hours = booking.startTime && booking.endTime
        ? (toMinutes(booking.endTime) - toMinutes(booking.startTime)) / 60
        : 0;
    const invoiceNo = booking._id.slice(-8).toUpperCase();
    const money = (n: number) => `$${n.toFixed(2)}`;

    /* ---------- Header band ---------- */
    doc.setFillColor(INK.r, INK.g, INK.b);
    doc.rect(0, 0, W, 112, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("StudioSpace", M, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Peer-to-Peer Creative Workspace & Production Studios", M, 72);
    doc.text("Booking Invoice", M, 90);
    doc.setFontSize(11);
    doc.text(`Invoice #: ${invoiceNo}`, W - M, 52, { align: "right" });
    doc.text(`Issued: ${new Date().toLocaleDateString("en-GB")}`, W - M, 72, { align: "right" });
    doc.text(`Status: ${booking.status}`, W - M, 90, { align: "right" });

    doc.setTextColor(INK.r, INK.g, INK.b);

    /* ---------- Billed to ---------- */
    let y = 160;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Billed To", M, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.text(booking.userName || "Guest", M, y + 20);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.text(booking.userEmail || "-", M, y + 38);

    /* ---------- Booking reference (right column) ---------- */
    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Booking Reference", W - M, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Booking ID: ${booking._id}`, W - M, y + 20, { align: "right" });
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.text(`Payment: Pay on arrival (demo)`, W - M, y + 38, { align: "right" });

    /* ---------- Table ---------- */
    y += 78;
    const colX = { desc: M, date: W - M - 250, time: W - M - 130, amount: W - M };

    doc.setFillColor(243, 244, 246); // #F3F4F6 header row
    doc.rect(M, y, W - 2 * M, 30, "F");
    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("DESCRIPTION", colX.desc + 10, y + 20);
    doc.text("DATE", colX.date, y + 20);
    doc.text("TIME", colX.time, y + 20);
    doc.text("AMOUNT", colX.amount, y + 20, { align: "right" });

    y += 30;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const titleLines = doc.splitTextToSize(booking.studioTitle || "Studio Booking", 240) as string[];
    const rowH = Math.max(34, titleLines.length * 14 + 20);

    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.setFont("helvetica", "bold");
    doc.text(titleLines, colX.desc + 10, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    const sub = [booking.studioCategory, booking.studioLocation].filter(Boolean).join(" | ");
    if (sub) doc.text(sub, colX.desc + 10, y + 18 + titleLines.length * 14 + 4);
    doc.setFontSize(10);
    doc.text(booking.date || "-", colX.date, y + 18);
    doc.text(
        booking.startTime && booking.endTime ? `${booking.startTime} - ${booking.endTime}` : "-",
        colX.time,
        y + 18
    );
    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.text(money(booking.totalPrice ?? 0), colX.amount, y + 18, { align: "right" });

    // row separator
    doc.setDrawColor(229, 231, 235);
    doc.line(M, y + rowH - 8, W - M, y + rowH - 8);

    /* ---------- Totals ---------- */
    y += rowH + 18;
    doc.setFontSize(11);
    if (hours > 0) {
        doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
        doc.text(`Duration: ${hours} hour(s)`, W - M, y, { align: "right" });
        y += 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.text("Total", W - M - 110, y);
    doc.text(money(booking.totalPrice ?? 0), W - M, y, { align: "right" });

    // status note
    y += 34;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
    doc.text(
        `This booking is ${booking.status.toLowerCase()}. Show this receipt at the studio entrance.`,
        M,
        y
    );

    /* ---------- Footer ---------- */
    const H = doc.internal.pageSize.getHeight();
    doc.setDrawColor(229, 231, 235);
    doc.line(M, H - 90, W - M, H - 90);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.setFontSize(9);
    doc.text("Thank you for choosing StudioSpace - create, shoot and produce!", M, H - 70);
    doc.text(
        "This is a system-generated receipt. For support, contact us via the StudioSpace website.",
        M,
        H - 56
    );

    return doc;
}

/** Generates and downloads the PDF receipt for a studio booking. */
export function generateInvoicePDF(booking: InvoiceBooking): void {
    const invoiceNo = booking._id.slice(-8).toUpperCase();
    buildInvoiceDoc(booking).save(`StudioSpace-Invoice-${invoiceNo}.pdf`);
}