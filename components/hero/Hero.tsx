"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type Landmark = { id?: string; name?: string; image: string };

export default function Hero({ Landmarks }: { Landmarks: Landmark[] }) {
  return (
    <Swiper
      navigation={true}
      autoplay={{ delay: 2000 }}
      pagination={{ clickable: true }}
      modules={[Navigation, Autoplay, Pagination]}
      className="mySwiper"
    >
      {Landmarks.map((landmark) => (
        <SwiperSlide key={landmark.id ?? landmark.image} className="group">
          <div className="relative rounded-md overflow-hidden w-full h-[600px] brightness-75 group-hover:brightness-50 transition-all duration-300">
            <Image
              src={landmark.image}
              alt={landmark.name ?? "landmark"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
