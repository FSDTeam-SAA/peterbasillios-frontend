"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type ActiveImage = {
  galleryIndex: number;
  imageIndex: number;
};

const galleries = [
  {
    title: "Luxury Coastal Villa Interiors",
    images: [
      "/g1.png",
      "/g2.png",
      "/g1.png",
      "/g2.png",
      "/g1.png",
      "/g2.png",
      "/g1.png",
    ],
  },
  {
    title: "Minimal White Kitchen Concept",
    images: [
      "/g3.png",
      "/g4.png",
      "/g3.png",
      "/g4.png",
      "/g3.png",
      "/g4.png",
      "/g3.png",
    ],
  },
  {
    title: "Premium Door Collection Showcase",
    images: [
      "/g5.png",
      "/g6.png",
      "/g5.png",
      "/g6.png",
      "/g5.png",
      "/g6.png",
      "/g6.png",
    ],
  },
  {
    title: "Modern Green-Themed Interior Concept",
    images: [
      "/g7.png",
      "/g8.png",
      "/g7.png",
      "/g8.png",
      "/g7.png",
      "/g8.png",
      "/g7.png",
    ],
  },
  {
    title: "High-End Residential Villa Project",
    images: [
      "/g9.png",
      "/g10.png",
      "/g9.png",
      "/g10.png",
      "/g9.png",
      "/g10.png",
      "/g9.png",
    ],
  },
];

export default function ProjectGallery() {
  const shouldReduceMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

  const currentGallery =
    activeImage !== null ? galleries[activeImage.galleryIndex] : null;
  const currentImage =
    activeImage !== null
      ? galleries[activeImage.galleryIndex]?.images[activeImage.imageIndex]
      : null;

  const closeLightbox = () => setActiveImage(null);

  const showLightboxImage = (direction: -1 | 1) => {
    setActiveImage((current) => {
      if (current === null) {
        return current;
      }

      const imageCount = galleries[current.galleryIndex].images.length;
      const nextImageIndex =
        (current.imageIndex + direction + imageCount) % imageCount;

      return {
        ...current,
        imageIndex: nextImageIndex,
      };
    });
  };

  useEffect(() => {
    if (activeImage === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showLightboxImage(-1);
      }

      if (event.key === "ArrowRight") {
        showLightboxImage(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  const galleryVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: SMOOTH_EASE,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: SMOOTH_EASE,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.96,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: (itemIndex: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : itemIndex * 0.045,
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: SMOOTH_EASE,
      },
    }),
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {galleries.map((gallery, galleryIndex) => (
          <motion.div
            key={gallery.title}
            className="mb-7 last:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={galleryVariants}
          >
            {/* Header */}
            <motion.div
              className="mb-7 flex items-center justify-between"
              variants={fadeUp}
            >
              <h2 className="text-xl md:text-[32px] font-normal text-[#000000] !tracking-[1%] ">
                {gallery.title}
              </h2>
            </motion.div>

            {/* Carousel */}
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {gallery.images.map((image, i) => (
                  <CarouselItem
                    key={i}
                    className="
                      pl-4
                      basis-[82%]
                      sm:basis-1/2
                      md:basis-1/3
                      lg:basis-1/4
                      xl:basis-1/5
                    "
                  >
                    <motion.button
                      type="button"
                      aria-label={`Open ${gallery.title} image ${i + 1}`}
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-md shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                      custom={i}
                      variants={cardVariants}
                      onClick={() =>
                        setActiveImage({ galleryIndex, imageIndex: i })
                      }
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -8,
                              transition: {
                                duration: 0.28,
                                ease: SMOOTH_EASE,
                              },
                            }
                      }
                    >
                      <Image
                        src={image}
                        alt={`${gallery.title} ${i + 1}`}
                        width={600}
                        height={420}
                        className="h-[258px] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </motion.button>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <motion.div
                className="mt-6 flex justify-end gap-3"
                variants={fadeUp}
              >
                <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-full border border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white" />

                <CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white" />
              </motion.div>
            </Carousel>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeImage !== null && currentGallery && currentImage ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${currentGallery.title} preview`}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#021816]/88 px-3 py-4 backdrop-blur-md sm:px-6"
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white p-3 text-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.42)] ring-1 ring-white/30 sm:p-4"
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                scale: shouldReduceMotion ? 1 : 0.96,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: shouldReduceMotion ? 1 : 0,
                scale: shouldReduceMotion ? 1 : 0.96,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.28,
                ease: SMOOTH_EASE,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4 border-b border-neutral-200 pb-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-medium sm:text-xl">
                    {currentGallery.title}
                  </h3>
                  <p className="mt-1 w-fit rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-medium text-[#007066]">
                    {activeImage.imageIndex + 1} /{" "}
                    {currentGallery.images.length}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close preview"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-950 transition hover:bg-[#007066] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007066]"
                  onClick={closeLightbox}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center rounded-lg bg-white">
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#007066] text-white shadow-[0_14px_35px_rgba(0,112,102,0.28)] transition hover:bg-[#095A54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007066] focus-visible:ring-offset-2"
                  onClick={() => showLightboxImage(-1)}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>

                <motion.div
                  key={`${currentGallery.title}-${activeImage.imageIndex}`}
                  className="relative h-[68vh] min-h-[320px] w-full overflow-hidden rounded-md bg-white ring-1 ring-neutral-200"
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    x: shouldReduceMotion ? 0 : 24,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    x: shouldReduceMotion ? 0 : -24,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.24,
                    ease: SMOOTH_EASE,
                  }}
                >
                  <Image
                    src={currentImage}
                    alt={`${currentGallery.title} ${activeImage.imageIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain p-2 sm:p-4"
                    priority
                  />
                </motion.div>

                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#007066] text-white shadow-[0_14px_35px_rgba(0,112,102,0.28)] transition hover:bg-[#095A54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007066] focus-visible:ring-offset-2"
                  onClick={() => showLightboxImage(1)}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {currentGallery.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border transition ${
                      activeImage.imageIndex === index
                        ? "border-[#007066] ring-2 ring-[#007066]/30"
                        : "border-neutral-200 opacity-70 hover:opacity-100"
                    }`}
                    onClick={() =>
                      setActiveImage({
                        galleryIndex: activeImage.galleryIndex,
                        imageIndex: index,
                      })
                    }
                  >
                    <Image
                      src={image}
                      alt={`${currentGallery.title} thumbnail ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
