"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const items = [
  {
    id: "01",
    title: "Custom Kitchens",
    image: "/b1.png",
    description:
      "Bespoke kitchens engineered for everyday living, combining timeless aesthetics with exceptional functionality.",
  },
  {
    id: "02",
    title: "Dressing Rooms",
    image: "/b2.png",
    description:
      "Elegant dressing rooms with intelligent storage solutions, tailored to your space and lifestyle.",
  },
  {
    id: "03",
    title: "Bedrooms",
    image: "/b3.png",
    description:
      "Custom bedroom cabinetry designed to create refined, organized, and beautifully balanced interiors.",
  },
  {
    id: "04",
    title: "Bathroom Vanity Units",
    image: "/b4.png",
    description:
      "Premium vanity units combining moisture-resistant materials with elegant craftsmanship and functionality.",
  },
];

export default function WhatWeBuild() {
  const shouldReduceMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

  return (
    <motion.section
      className="overflow-hidden py-14 sm:py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div className="mb-10 text-center sm:mb-14 lg:mb-16" variants={fadeUp}>
          <motion.h2
            className="text-4xl font-normal leading-tight text-[#000000] sm:text-5xl md:text-6xl lg:text-7xl"
            variants={fadeUp}
          >
            What We <span className="italic  font-light">Build</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-8"
          variants={sectionVariants}
        >
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              className={`group flex flex-col border-l border-gray-300 pl-4 sm:pl-5 ${
                index % 2 === 1 ? "lg:pt-20" : ""
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
              <span className="text-base text-[#595959]">{item.id}</span>

              {/* Title */}
              <h3 className="mt-1 text-xl font-medium leading-tight text-[#000000] sm:text-2xl">
                {item.title}
              </h3>

              {/* Image */}
              <motion.div
                className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg"
                variants={imageVariants}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Description */}
              <p className="mt-4 text-sm font-normal leading-6 text-[#595959] sm:mt-5 sm:text-base sm:leading-7">
                {item.description}
              </p>

              {/* Button */}
              <motion.button
                type="button"
                aria-label={`View ${item.title}`}
                className="mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#2CA6A4] text-[#2CA6A4] transition-all duration-300 hover:bg-[#2CA6A4] hover:text-white sm:mt-6"
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
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
