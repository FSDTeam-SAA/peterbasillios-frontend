"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import WhatWeBuildSkeleton from "./WhatWeBuildSkeleton";

type Service = {
  _id: string;
  name: string;
  description: string;
  image: string;
};

type ServicesResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: Service[];
};

const SERVICES_QUERY_LIMIT = 5;
const SERVICES_DISPLAY_LIMIT = 4;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const SERVICES_ENDPOINT = API_BASE_URL
  ? `${API_BASE_URL}/service`
  : "/api/v1/service";

const fetchServices = async (): Promise<ServicesResponse> => {
  const params = new URLSearchParams({
    page: "1",
    limit: String(SERVICES_QUERY_LIMIT),
  });

  const response = await fetch(`${SERVICES_ENDPOINT}?${params.toString()}`);
  const result = (await response.json()) as ServicesResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Service request failed.");
  }

  return result;
};

const getDescriptionText = (description: string) => {
  if (typeof document === "undefined") {
    return description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  const template = document.createElement("template");
  template.innerHTML = description;

  template.content
    .querySelectorAll("script, style, ul, ol")
    .forEach((node) => node.remove());

  const firstParagraph = template.content.querySelector("p");
  const text = firstParagraph?.textContent ?? template.content.textContent ?? "";

  return text.replace(/\s+/g, " ").trim();
};

export default function WhatWeBuild() {
  const shouldReduceMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const {
    data: servicesResponse,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["services", 1, SERVICES_QUERY_LIMIT],
    queryFn: fetchServices,
  });

  const services =
    servicesResponse?.data.slice(0, SERVICES_DISPLAY_LIMIT) ?? [];

  const sectionVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
        delayChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 34,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: smoothEase,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 36,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: smoothEase,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      clipPath: shouldReduceMotion
        ? "inset(0% 0% 0% 0%)"
        : "inset(0% 0% 100% 0%)",
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        ease: smoothEase,
      },
    },
  };

  if (isPending) {
    return <WhatWeBuildSkeleton />;
  }

  return (
    <motion.section
      className="overflow-hidden py-12 sm:py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          className="mb-8 text-center sm:mb-14 lg:mb-16"
          variants={fadeUp}
        >
          <motion.h2
            className="text-[34px] font-normal leading-tight text-[#000000] sm:text-5xl md:text-6xl lg:text-7xl"
            variants={fadeUp}
          >
            What We <span className="italic font-light">Build</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-2 lg:gap-8 xl:grid-cols-4"
          variants={sectionVariants}
        >
          {isError ? (
            <div className="col-span-2 rounded-md bg-[#F4FAFA] p-5 text-center shadow-[0_14px_35px_rgba(0,112,102,0.08)] xl:col-span-4">
              <p className="text-sm text-[#595959] sm:text-base">
                Services could not be loaded.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 h-10 rounded-full bg-[#007066] px-6 text-sm font-normal text-white transition hover:bg-[#095A54]"
              >
                Try Again
              </button>
            </div>
          ) : services.length === 0 ? (
            <div className="col-span-2 rounded-md bg-[#F4FAFA] p-5 text-center shadow-[0_14px_35px_rgba(0,112,102,0.08)] xl:col-span-4">
              <p className="text-sm text-[#595959] sm:text-base">
                No services found.
              </p>
            </div>
          ) : (
            services.map((item, index) => (
            <motion.article
              key={item._id}
              className={`group flex flex-col rounded-md bg-[#F4FAFA] p-2 shadow-[0_14px_35px_rgba(0,112,102,0.08)] sm:border-l sm:border-gray-300 sm:bg-transparent sm:p-0 sm:pl-5 sm:shadow-none ${
                index % 2 === 1 ? "xl:pt-20" : ""
              }`}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                    }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            >
              {/* Number */}
              <span className="text-[11px] font-medium text-[#007066] sm:text-base sm:text-[#595959]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3 className="mt-1 min-h-[38px] text-[15px] font-medium leading-tight text-[#000000] sm:min-h-0 sm:text-2xl">
                {item.name}
              </h3>

              {/* Image */}
              <motion.div
                className="relative mt-3 aspect-[4/3] overflow-hidden rounded-md sm:mt-4 sm:rounded-lg"
                variants={imageVariants}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 50vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Description */}
              <p className="mt-3 line-clamp-3 text-[12px] font-normal leading-5 text-[#595959] sm:mt-5 sm:line-clamp-none sm:text-base sm:leading-7">
                {getDescriptionText(item.description)}
              </p>

              {/* Button */}
              <motion.div
                className="mt-4 sm:mt-6"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 3,
                        scale: 1.08,
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              >
                <Link
                  href="/services#services-list"
                  aria-label={`View ${item.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2CA6A4] shadow-sm transition-all duration-300 hover:bg-[#2CA6A4] hover:text-white sm:h-11 sm:w-11 sm:border sm:border-[#2CA6A4] sm:bg-transparent sm:shadow-none"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </motion.div>
            </motion.article>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
