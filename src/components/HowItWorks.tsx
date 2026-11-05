import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  Play,
  Search,
  Sparkles,
  Video,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Find your space",
    description:
      "Explore inspiring photo studios, podcast rooms, sound stages and creative spaces.",
    detail: "Discover spaces",
    tone: "from-violet-500/15 to-fuchsia-500/5",
    iconTone: "bg-violet-500 text-white shadow-violet-500/25",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose your time",
    description:
      "Select the date and time that works for your project. See the price upfront.",
    detail: "Pick a time slot",
    tone: "from-sky-500/15 to-cyan-500/5",
    iconTone: "bg-sky-500 text-white shadow-sky-500/25",
  },
  {
    number: "03",
    icon: Check,
    title: "Book with ease",
    description:
      "Confirm your reservation in a few clicks and keep every booking in one place.",
    detail: "Confirm your booking",
    tone: "from-emerald-500/15 to-teal-500/5",
    iconTone: "bg-emerald-500 text-white shadow-emerald-500/25",
  },
  {
    number: "04",
    icon: Video,
    title: "Bring ideas to life",
    description:
      "Arrive, create and make something amazing in a space made for your vision.",
    detail: "Create something great",
    tone: "from-orange-500/15 to-amber-500/5",
    iconTone: "bg-orange-500 text-white shadow-orange-500/25",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Soft decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-4 w-4" />
            Your creative journey
          </div>

          <h2
            id="how-it-works-title"
            className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            Great work starts with
            <span className="mt-1 block bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              the right space.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Booking your next creative space is refreshingly simple. Follow
            four easy steps and get back to what you do best — creating.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line on large screens */}
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-10 hidden border-t border-dashed border-primary/25 lg:block"
          />

          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${step.tone} opacity-70`}
                />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-sm font-black tracking-[0.2em] text-muted-foreground/70">
                      STEP {step.number}
                    </span>
                    <span className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                      {step.detail}
                    </span>
                  </div>

                  <div className="relative mb-7 flex h-[68px] w-[68px] items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${step.iconTone}`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 min-h-[76px] text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary/80">
                    <span className="h-px w-6 bg-primary/50 transition-all duration-300 group-hover:w-10" />
                    {step.detail}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom call to action */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-primary/5 to-violet-500/10 p-6 sm:mt-14 sm:p-8">
          <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-border/70">
                <Compass className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Ready to create something extraordinary?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your next great idea deserves the perfect space.
                </p>
              </div>
            </div>

            <Link
              href="/studios"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore studios
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Less searching. Easier booking. More creating.</span>
          <Play className="ml-1 h-3 w-3 fill-current" />
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </section>
  );
}
