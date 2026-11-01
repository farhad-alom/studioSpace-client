"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    image: "/banner-image.jpg",
    title: "Book Premium Creative Studios",
    sub: "Photo studios, sound stages and music suites, available by the hour with instant confirmation.",
  },
  {
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80",
    title: "Record. Shoot. Create.",
    sub: "Verified spaces with pro equipment and transparent pricing, no hidden fees.",
  },
  {
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80",
    title: "Got a Studio? Earn With It.",
    sub: "List your space, set your rate and welcome creators from across the country.",
  },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="hero-swiper h-[480px] sm:h-[560px]"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                priority={i === 0}
                unoptimized={slide.image.startsWith("http")}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mb-8 max-w-xl text-base text-gray-200 sm:text-lg">
                  {slide.sub}
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <Button

                    size="lg"
                    className="w-full px-8 font-semibold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                  >
                    <Link href="/studios">Explore Studios</Link>
                  </Button>
                  <Button

                    size="lg"
                    variant="outline"
                    className="w-full border-white/40 bg-white/10 px-8 font-semibold text-white backdrop-blur-md transition-transform hover:scale-[1.02] hover:bg-white hover:text-black active:scale-[0.98] sm:w-auto"
                  >
                    <Link href="/studios">Host Your Space</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}