"use client";
// next
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// swiper stuff
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// ui
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

// swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import { Logos } from "@/utils/types";

const DivisiLengkap = ({
  variant = "omahti",
  divisi,
}: {
  variant?: "omahti" | "himakom";
  divisi?: any[];
}) => {
  let divisiTitle =
    variant === "omahti" ? (
      <span className="text-custom-orange">OmahTI</span>
    ) : (
      <span className="text-custom-lavender">Himakom</span>
    );

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-custom-gray-dark p-4">
      <h1 className="space-x-4 text-lg">
        Divisi <span className="font-semibold">{divisiTitle}</span>
        <Keterangan />
      </h1>

      <div className="flex w-full items-center justify-between gap-2">
        <Button
          variant="ghost"
          className={`px-2 py-1 hover:bg-custom-gray/20 ${variant === "omahti" ? "oti-prev" : "hima-prev"}`}
        >
          <ChevronLeft
            className={` ${
              variant === "omahti"
                ? "text-custom-orange"
                : "text-custom-lavender"
            }`}
            strokeWidth={3}
          />
        </Button>

        <Swiper
          className="mySwiper"
          spaceBetween={10}
          modules={[Navigation]}
          navigation={{
            prevEl: variant === "omahti" ? ".oti-prev" : ".hima-prev",
            nextEl: variant === "omahti" ? ".oti-next" : ".hima-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            490: { slidesPerView: 2 },
            700: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1536: { slidesPerView: 5 },
          }}
        >
          {divisi?.map((divisiong: any) => (
            <SwiperSlide key={divisiong.id}>
              <DivisiCard
                title={divisiong.judul}
                logoUrl={Logos[divisiong.slug as keyof typeof Logos]}  // Ensure correct logo is passed
                slug={divisiong.slug}
                // full={true}
                full={divisiong.slot === divisiong.dipilihOleh.length}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Button
          variant="ghost"
          className={`px-2 py-1 hover:bg-custom-gray/20 ${variant === "omahti" ? "oti-next" : "hima-next"}`}
        >
          <ChevronRight
            className={
              variant === "omahti" ? "text-custom-orange" : "text-custom-blue"
            }
            strokeWidth={3}
          />
        </Button>
      </div>
    </div>
  );
};

const DivisiCard = ({
  slug,
  title,
  logoUrl,
}: {
  title?: string;
  logoUrl?: StaticImageData;  // Ensure it's StaticImageData for imported images
  slug?: string;
  full?: boolean;
}) => (
  <div className="flex items-center justify-between gap-5 rounded-md bg-custom-gray p-1.5">
    <div className="relative aspect-square rounded-sm flex items-center justify-center p-2 h-6">
      <div className="">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={title || "Logo"}
            sizes="100%"
            className="object-contain" // Ensures the image fits inside without distortion
            layout="fill" // Makes the image fill the container while maintaining aspect ratio
          />
        )}
      </div>
    </div>
    <h3 className="truncate">{title}</h3>
    <Link href={`/divisi/${slug}`}>
      <Button
        className="aspect-square h-fit w-fit rounded-sm px-1.5 py-0.5 font-semibold"
        variant="secondary"
      >
        <ChevronRight />
      </Button>
    </Link>
  </div>
);


const Keterangan = () => (
  <div className="inline-flex items-center gap-1 rounded-sm bg-custom-black px-1.5 text-xs">
    <div className="aspect-square h-3 border-[1px] border-black bg-custom-red" />
    = Full
  </div>
);

export default DivisiLengkap;
