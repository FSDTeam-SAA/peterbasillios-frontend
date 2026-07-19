"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function AboutHero() {
  const shouldReduceMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];


  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
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

  return (
    <section className="relative min-h-[100svh] overflow-hidden sm:min-h-[720px] lg:min-h-[760px]">
      {/* Background */}

      <motion.div
        className="absolute inset-0 bg-cover bg-[position:54%_center] sm:bg-center"
        style={{
          backgroundImage: "url('/abouthero.png')",
        }}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.25,
          ease: smoothEase,
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/75 sm:bg-black/35"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.9 }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent sm:hidden" />

      {/* Content */}

      <motion.div
        className="container relative z-10 mx-auto flex min-h-[100svh] items-end px-4 pb-12 pt-28 sm:min-h-[720px] sm:items-center sm:px-6 sm:py-32 lg:min-h-[760px] lg:px-0 lg:py-40"
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: shouldReduceMotion ? 0 : 0.14,
          delayChildren: shouldReduceMotion ? 0 : 0.25,
        }}
      >
        <div className="w-full max-w-3xl">
          <motion.p
            className="mb-5 w-fit rounded-full border border-white/25 bg-white/14 px-3 py-1 text-xs font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md sm:hidden"
            variants={fadeUp}
          >
            Family craft since 1985
          </motion.p>

          <motion.h1
            className="text-[clamp(2.75rem,13vw,4.5rem)] font-normal leading-[0.98] text-[#FFFEFC] sm:text-6xl sm:leading-[1.05] md:text-[72px] lg:text-[80px]"
            variants={fadeUp}
          >
            Built on Heritage
            <br />
            Driven by Precision
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[610px] text-[15px] leading-7 text-[#FFFEFC]/95 sm:mt-7 sm:text-lg sm:leading-8"
            variants={fadeUp}
          >
            Since 1985, we&apos;ve combined traditional craftsmanship with modern
            technology to create premium custom cabinetry for residential and
            commercial spaces.
          </motion.p>

        </div>
      </motion.div>
    </section>
  );
}
