"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioGallery({ images, title }: { images: string[]; title: string }) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-72 w-full overflow-hidden rounded-xl sm:h-96"
        >
            {images.map((src, i) => (
                <SwiperSlide key={i}>
                    <div className="relative h-full w-full">
                        <Image
                            src={src}
                            alt={`${title} photo ${i + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            unoptimized
                            priority={i === 0}
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}