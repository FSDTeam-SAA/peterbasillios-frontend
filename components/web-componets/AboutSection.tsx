"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const HERITAGE_YEARS = 40;
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AboutSection() {
  const counterRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCounterInView = useInView(counterRef, {
    once: true,
    margin: "-120px",
  });
  const [heritageYears, setHeritageYears] = useState(0);

  useEffect(() => {
    if (!isCounterInView) {
      return;
    }

    if (shouldReduceMotion) {
      setHeritageYears(HERITAGE_YEARS);
      return;
    }

    setHeritageYears(0);

    const controls = animate(0, HERITAGE_YEARS, {
      duration: 1.9,
      ease: smoothEase,
      onUpdate: (latest) => setHeritageYears(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isCounterInView, shouldReduceMotion]);

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

  return (
    <motion.section
      className="overflow-hidden py-16 sm:py-20 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.32 }}
      variants={sectionVariants}
    >
      <div className="w-[1096px] mx-auto px-4 sm:px-6 lg:px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-md lg:text-left" variants={fadeUp}>
            <motion.h2
              className="text-3xl font-medium !leading-[120%] text-[#000000] sm:text-4xl md:text-[40px]"
              variants={fadeUp}
            >
              Built on Heritage.
              <br />
              Designed for Tomorrow.
            </motion.h2>

            <motion.p
              className="mt-6 !text-[16px] font-normal leading-8 text-[#595959] sm:mt-8"
              variants={fadeUp}
            >
              Wood Talks is the second generation of a family business
              established in 1985.
            </motion.p>

            <motion.p
              className="mt-4 text-[16px] font-normal leading-8 text-[#595959]"
              variants={fadeUp}
            >
              Today we combine traditional craftsmanship with advanced
              manufacturing technology to create cabinetry that lasts for
              generations.
            </motion.p>

            <motion.div
              className="mx-auto mt-8 w-fit sm:mt-10 lg:mx-0"
              variants={fadeUp}
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Button className="h-[52px] !rounded-[999px] bg-[#007066] px-8 text-base font-medium text-white hover:bg-[#095A54]">
                Our Story
                <Image
                  src="/star.png"
                  alt="Star"
                  width={100}
                  height={100}
                  className="ml-2 h-4 w-4 object-cover"
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="mx-auto flex w-full flex-col items-center justify-center gap-8 sm:flex-row lg:gap-14"
            variants={fadeUp}
          >
            <motion.div
              className="relative h-[360px] w-full max-w-[305px] overflow-hidden rounded-2xl shadow-[0_28px_80px_rgba(0,112,102,0.18)] sm:h-[405px] sm:w-[305px]"
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
            >
              <Image
                src="/about.png"
                alt="About"
                fill
                sizes="(min-width: 640px) 305px, 100vw"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Right Counter */}
            <motion.div
              ref={counterRef}
              className="relative text-center sm:pl-7 sm:text-left"
              variants={fadeUp}
            >
            

              <span className="text-2xl font-normal text-[#595959] sm:text-3xl">
                Years of
                <br />
                Heritage
              </span>

              <motion.h3
                className="mt-2 tabular-nums text-6xl font-medium text-[#000000] sm:text-7xl md:text-8xl"
                variants={fadeUp}
              >
                {heritageYears}+
              </motion.h3>

            
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
