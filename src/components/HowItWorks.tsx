import Link from "next/link";
import { FaMagnifyingGlass, FaClock, FaCalendarCheck, FaVideo } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    icon: FaMagnifyingGlass,
    title: "Discover Spaces",
    desc: "Browse photo studios, sound stages, podcast rooms and music suites near you.",
  },
  {
    step: "02",
    icon: FaClock,
    title: "Select Shoot Hours",
    desc: "Pick your date and time slot, and see the total price before you commit.",
  },
  {
    step: "03",
    icon: FaCalendarCheck,
    title: "Book Instantly",
    desc: "Reserve your slot in seconds and track the status from your bookings page.",
  },
  {
    step: "04",
    icon: FaVideo,
    title: "Create & Produce",
    desc: "Show up, set up and shoot, record or build something worth sharing.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold">How Booking Works</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          From finding the perfect space to hitting record, it takes just four simple steps.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ step, icon: Icon, title, desc }) => (
          <Card key={step} className="relative h-full overflow-hidden text-center">
            <span className="absolute right-4 top-3 text-5xl font-extrabold text-muted-foreground/15">
              {step}
            </span>
            <CardContent className="flex h-full flex-col items-center gap-4 pt-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild size="lg">
          <Link href="/studios">Explore Studios</Link>
        </Button>
      </div>
    </section>
  );
}