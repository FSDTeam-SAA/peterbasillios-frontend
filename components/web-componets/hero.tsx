"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

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
          backgroundImage:
            "url('/hero.png')",
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
            Premium Custom
            <br />
            Cabinetry
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[610px] text-base leading-7 text-[#FFFEFC] sm:text-lg sm:leading-8"
            variants={fadeUp}
          >
            We transform residential and commercial spaces with
            bespoke cabinetry, combining family craftsmanship
            since 1985 with modern digital precision.
          </motion.p>

          <motion.div
            className="mt-8 sm:mt-10"
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            
          >
            <Button
              onClick={scrollToProjects}
              className="h-[50px] rounded-full bg-white px-7 text-base font-normal text-[#007066] hover:bg-[#007066] hover:text-white sm:h-[52px] sm:px-10"
            >
              View Our Projects
            </Button>
          </motion.div>
        </div>
      </motion.div>

      
    </section>
  );
}
