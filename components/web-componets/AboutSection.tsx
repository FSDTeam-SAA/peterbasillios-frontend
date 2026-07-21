"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      className="overflow-hidden bg-[#F4FAFA] py-14 sm:py-20 lg:bg-transparent lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.32 }}
      variants={sectionVariants}
    >
      <div className="mx-auto w-full max-w-[1096px] px-4 sm:px-6 lg:px-5">
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <motion.div
            className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-md lg:text-left"
            variants={fadeUp}
          >
            <motion.p
              className="mx-auto mb-4 w-fit rounded-full border border-[#B8D8D5] bg-white px-4 py-2 text-sm font-medium text-[#007066] shadow-[0_14px_34px_rgba(0,112,102,0.08)] lg:hidden"
              variants={fadeUp}
            >
              Family craft since 1985
            </motion.p>

            <motion.h2
              className="text-[34px] font-medium !leading-[115%] text-[#000000] sm:text-4xl md:text-[44px] lg:text-[40px] lg:!leading-[120%]"
              variants={fadeUp}
            >
              Built on Heritage.
              <br />
              Designed for Tomorrow.
            </motion.h2>

            <motion.p
              className="mx-auto mt-5 max-w-lg !text-[16px] font-normal leading-8 text-[#595959] sm:mt-7 lg:mx-0"
              variants={fadeUp}
            >
              Wood Talks is the second generation of a family business
              established in 1985.
            </motion.p>

            <motion.p
              className="mx-auto mt-4 max-w-lg text-[16px] font-normal leading-8 text-[#595959] lg:mx-0"
              variants={fadeUp}
            >
              Today we combine traditional craftsmanship with advanced
              manufacturing technology to create cabinetry that lasts for
              generations.
            </motion.p>

            <motion.div
              className="mx-auto mt-8 w-full max-w-xs sm:mt-10 lg:mx-0 lg:w-fit lg:max-w-none"
              variants={fadeUp}
              whileHover={
                shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Button
                render={<Link href="/about#our-story" />}
                className="h-[52px] w-full !rounded-[999px] bg-[#007066] px-8 text-base font-medium text-white shadow-[0_18px_40px_rgba(0,112,102,0.2)] hover:bg-[#095A54] lg:w-auto lg:shadow-none"
              >
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
            className="mx-auto grid w-full max-w-[520px] items-center gap-5 sm:max-w-2xl sm:grid-cols-[minmax(0,305px)_auto] sm:justify-center sm:gap-7 lg:max-w-none lg:grid-cols-[305px_auto] lg:gap-14"
            variants={fadeUp}
          >
            <motion.div
              className="relative h-[390px] w-full overflow-hidden rounded-lg bg-white shadow-[0_28px_80px_rgba(0,112,102,0.18)] ring-1 ring-white sm:h-[405px] sm:w-[305px]"
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
              className="relative rounded-lg border border-[#C7DEDC] bg-white px-6 py-5 text-center shadow-[0_18px_45px_rgba(0,112,102,0.1)] sm:pl-7 sm:text-left lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
              variants={fadeUp}
            >
              <span className="text-xl font-normal text-[#595959] sm:text-2xl lg:text-3xl">
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
