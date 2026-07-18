"use client";

import Image from "next/image";
import {
  Award,
  BadgeCheck,
  Layers3,
  Factory,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "1985 Heritage",
    description:
      "Built on a family legacy of craftsmanship established in 1985.",
  },
  {
    icon: Factory,
    title: "Precision Manufacturing",
    description:
      "CNC technology ensures accurate production with minimal human error.",
  },
  {
    icon: BadgeCheck,
    title: "European Standards",
    description:
      "Every design follows European ergonomic and quality standards.",
  },
  {
    icon: Layers3,
    title: "Premium Materials",
    description:
      "We use trusted global brands like Blum, Hafele, and Hettich.",
  },
];

export default function WhyChoose() {
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

  const imageReveal: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      clipPath: shouldReduceMotion
        ? "inset(0% 0% 0% 0%)"
        : "inset(0% 100% 0% 0%)",
      x: shouldReduceMotion ? 0 : -28,
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 1,
        ease: smoothEase,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: smoothEase,
      },
    },
  };

  return (
    <motion.section
      className="overflow-hidden py-14 sm:py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-5">
        <div className="grid  gap-10 lg:grid-cols-2 lg:gap-6">
          {/* Left Image */}
          <motion.div
            className="relative mx-auto h-[320px] w-full  overflow-hidden rounded-2xl  sm:h-[420px] lg:mx-0 lg:h-[542px]"
            variants={imageReveal}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          >
            <Image
              src="/why.png"
              alt="Kitchen"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
              priority
            />

          </motion.div>

          {/* Right Content */}
          <motion.article className="w-full" variants={sectionVariants}>
            <motion.h2
              className="mb-8 text-center text-4xl font-normal leading-tight text-[#000000] md:text-5xl lg:mb-10 lg:text-left lg:text-[50px]"
              variants={fadeUp}
            >
              Why Choose{" "}
              <span className="italic font-light ">
                Wood Talks
              </span>
            </motion.h2>

            <motion.div
              className="grid gap-5 sm:grid-cols-2"
              variants={sectionVariants}
            >
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    className="rounded-xl bg-[#E6F1F0] p-4 transition-all duration-300 hover:shadow-lg sm:p-5"
                    variants={cardVariants}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -8, scale: 1.02 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <motion.div
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#006B68]"
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { rotate: -6, scale: 1.08 }
                      }
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </motion.div>

                    <h3 className="mb-2 text-xl font-midium text-[#000000] sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-6 text-[#595959] sm:text-base sm:leading-7">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
}
