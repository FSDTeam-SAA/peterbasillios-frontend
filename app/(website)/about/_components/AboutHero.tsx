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
    <section className="relative min-h-[620px] overflow-hidden sm:min-h-[720px] lg:min-h-[760px]">
      {/* Background */}

      <motion.div
        className="absolute inset-0 bg-cover bg-center"
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
        className="absolute inset-0 bg-black/35"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.9 }}
      />

      {/* Content */}

      <motion.div
        className="container relative z-10 mx-auto flex min-h-[620px] items-center px-4 py-24 sm:min-h-[720px] sm:px-6 sm:py-32 lg:min-h-[760px] lg:px-0 lg:py-40"
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: shouldReduceMotion ? 0 : 0.14,
          delayChildren: shouldReduceMotion ? 0 : 0.25,
        }}
      >
        <div className="max-w-3xl">
          <motion.h1
            className="text-[42px] font-normal leading-[1.05] text-[#FFFEFC] sm:text-6xl md:text-[72px] lg:text-[80px]"
            variants={fadeUp}
          >
            Built on Heritage
            <br />
            Driven by Precision
          </motion.h1>

          <motion.p
            className="mt-7 max-w-[610px] text-base leading-7 text-[#FFFEFC] sm:text-lg sm:leading-8"
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
