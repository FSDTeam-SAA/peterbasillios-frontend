"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GalleryHero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
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
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.section
      className="bg-[#F4FAFA] px-4 pb-14 pt-28 text-center sm:pb-20 sm:pt-32 lg:pb-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="container mx-auto" variants={containerVariants}>
        <motion.h1
          className="text-[40px] font-normal leading-tight text-[#000000] sm:text-6xl lg:text-[80px]"
          variants={fadeUp}
        >
          Project Gallery
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-[854px] text-[15px] font-normal leading-7 text-[#595959] sm:mt-5 sm:text-lg md:text-xl lg:text-2xl"
          variants={fadeUp}
        >
          Discover bespoke cabinetry solutions designed, manufactured, and
          installed with precision to enhance residential and commercial
          interiors.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
