"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const highlights = ["Since 1985", "Custom Built", "Digital Precision"];
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
    <section className="relative h-full overflow-hidden sm:min-h-[720px] lg:min-h-[760px]">
      {/* Background */}

      <motion.div
        className="absolute inset-0 bg-cover bg-[position:58%_center] sm:bg-center"
        style={{
          backgroundImage: "url('/hero.png')",
        }}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.25,
          ease: smoothEase,
        }}
      />

      <motion.div
        className="absolute inset-0 "
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.9 }}
      />

      {/* <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent sm:hidden" /> */}

      {/* Content */}

      <motion.div
        className="container relative z-10 mx-auto flex  items-end px-4 pb-12 pt-28 sm:min-h-[720px] sm:items-center sm:px-6 sm:py-32 lg:min-h-[760px] lg:px-0 lg:py-40"
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: shouldReduceMotion ? 0 : 0.14,
          delayChildren: shouldReduceMotion ? 0 : 0.25,
        }}
      >
        <div className="w-full max-w-3xl">
          <motion.div
            className="mb-5 flex flex-wrap gap-2 sm:hidden"
            variants={fadeUp}
          >
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/25 bg-white/14 px-3 py-1 text-xs font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.h1
            className="text-[40px] font-normal leading-[120%] text-[#FFFEFC] sm:text-6xl sm:leading-[1.05] md:text-[72px] lg:text-[80px]"
            variants={fadeUp}
          >
            Premium Custom
            <br />
            Cabinetry
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[610px] text-[15px] leading-7 text-[#FFFEFC]/95 sm:text-lg sm:leading-8"
            variants={fadeUp}
          >
            We transform residential and commercial spaces with
            bespoke cabinetry, combining family craftsmanship
            since 1985 with modern digital precision.
          </motion.p>

          <motion.div
            className="mt-8 w-full sm:mt-10 sm:w-fit"
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link href="/gallery">
            <Button
              onClick={scrollToProjects}
              className="h-[52px] w-full rounded-full bg-white px-7 text-base font-normal text-[#007066] shadow-[0_18px_45px_rgba(0,0,0,0.24)] hover:bg-[#007066] hover:text-white sm:h-[52px] sm:w-auto sm:px-10"
            >
              View Our Projects
            </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
