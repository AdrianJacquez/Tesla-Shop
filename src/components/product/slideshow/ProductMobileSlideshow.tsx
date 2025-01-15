"use client";

import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className=" object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
