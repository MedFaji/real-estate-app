import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ images }) => {
  return (
    <div className="my- 10">
      {images ? (
        <Carousel>
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  width={800}
                  height={300}
                  src={image.url ? image.url : "/placeholder.webp"}
                  alt={image.alt}
                  className="rounded-xl object-cover h-[200px] sm:h-[300px] md:h-[500px] w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div
          className="
        w-full
        h-[400px]
        bg-gray-300
        rounded-lg
        animate-pulse
        "
        ></div>
      )}
    </div>
  );
};

export default Slider;
