import Link from "next/link"
import { Aperture } from "lucide-react"

/** Text-based brand mark: avoids image-canvas cropping in either theme. */
export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="StudioSpace home"
      className="inline-flex w-fit shrink-0 items-center gap-2 overflow-visible whitespace-nowrap rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-sm shadow-violet-500/20 ${compact ? "size-8" : "size-9"}`}>
        <Aperture className={compact ? "size-[18px]" : "size-5"} strokeWidth={2.3} />
      </span>
      <span className={`inline-flex shrink-0 items-baseline whitespace-nowrap leading-none tracking-[-0.055em] ${compact ? "text-[1.25rem]" : "text-[1.45rem]"}`}>
        <span className="font-extrabold text-foreground">Studio</span>
        <span className="font-extrabold text-violet-600 dark:text-violet-400">Space</span>
      </span>
    </Link>
  )
}
