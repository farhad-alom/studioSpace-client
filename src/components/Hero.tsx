import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[640px] flex flex-col justify-center overflow-hidden">
      {/* Premium studio background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner-image.jpg"
          alt="Premium creative studio space"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 py-24 sm:py-32 lg:py-40 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 leading-tight">
          Book premium{" "}
          <span className="text-primary">creative studios</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Find and book the perfect studio space for your next project. Professional equipment,
          flexible hours, and instant confirmation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/studios">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Explore Studios
            </Button>
          </Link>
          <Link href="/about-us">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              About Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
