"use client";
import React, { useState, useEffect, useRef } from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = [
    "https://via.placeholder.com/600x200?text=Slide+1",
    "https://via.placeholder.com/600x200?text=Slide+2",
    "https://via.placeholder.com/600x200?text=Slide+3",
    "https://via.placeholder.com/600x200?text=Slide+4",
    "https://via.placeholder.com/600x200?text=Slide+5",
    "https://via.placeholder.com/600x200?text=Slide+6"
];

export default function HeroSection() {
    const [api, setApi] = useState<CarouselApi>();
    const plugin = useRef(Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false
    }));

    useEffect(() => {
        if (!api) {
            return;
        }
    }, [api])

    return (

        <Carousel className=" ssm:overflow-hidden w-full px-1 my-2 "
            plugins={[plugin.current]}
            opts={{ loop: true }}
        >
            <CarouselContent className=" px-1 ">
                {images.map((name, index) => (
                    <CarouselItem className=" 
                    
                    ssm:basis-80 sm:basis-90 lg:basis-165 md:basis-140 text-primary flex justify-center " key={index}>

                        <Image
                            className=" 
                            w-full bg-amber-50 rounded-4 cursor-pointer "
                            alt={`Hero Image ${index + 1}`}
                            src={name}
                            height={270}
                            width={640}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>

    );
}