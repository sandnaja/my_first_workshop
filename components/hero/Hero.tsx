"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import OtherInfo from "./OtherInfo";
import { LandmarkCardProps } from "@/utils/types";

export default function Hero({ Landmarks }: { Landmarks: LandmarkCardProps[] }) {
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
          <div className="absolute bottom-0 left-0 z-50">
            <div className="col-span-4 mb-4 flex h-full flex-1 justify-end px-5 md:mb-4 md:justify-end md:px-10">
              <OtherInfo landmark={landmark} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
