"use client";

import Image from "next/image";
import { BadgeCheck, Cpu, ShieldCheck, Workflow } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const features = [
  {
    icon: Cpu,
    label: "CNC Technology",
  },
  {
    icon: BadgeCheck,
    label: "European Standards",
  },
  {
    icon: Workflow,
    label: "Digital Workflow",
  },
  {
    icon: ShieldCheck,
    label: "Quality Control",
  },
];

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CraftedPurpose() {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 26,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: SMOOTH_EASE,
      },
    },
  };

  const imageReveal: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 1.04,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.9,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.section
      className="overflow-hidden pb-12 md:pb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-5">
        <div className="grid overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(0,112,102,0.1)] lg:grid-cols-2 lg:rounded-none lg:shadow-none">
          <motion.div
            className="relative min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[450px]"
            variants={imageReveal}
          >
            <Image
              src="/about1.png"
              alt="Modern white kitchen with island"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="flex min-h-[250px] items-center bg-[#007066] px-5 py-8 text-white sm:min-h-[320px] sm:px-8 lg:px-12"
            variants={fadeUp}
          >
            <div className="">
              <h2 className="text-[30px] font-normal leading-tight sm:text-4xl">
                Crafted with{" "}
                <span className="italic font-light">Purpose</span>
              </h2>

              <p className="mt-5 text-[13px] leading-6 text-[#D7D7D7] sm:text-base sm:leading-7">
                We believe exceptional cabinetry begins with thoughtful design,
                precision engineering, and uncompromising attention to detail.
              </p>

              <p className="mt-3 text-[13px] leading-6 text-[#D7D7D7] sm:mt-4 sm:text-base sm:leading-7">
                Every project is built to reflect the unique lifestyle of our
                clients while maintaining the highest standards of quality.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex min-h-[300px] items-center bg-[#E6F1F0] px-5 py-8 sm:min-h-[340px] sm:px-8 lg:px-12"
            variants={fadeUp}
          >
            <div className="">
              <h2 className="text-[30px] font-normal leading-tight text-[#000000] sm:text-4xl">
                Precision{" "}
                <span className="italic font-light">Manufacturing</span>
              </h2>

              <p className="mt-5 text-[13px] leading-6 text-[#454545] sm:text-base sm:leading-7">
                Our 1000 sqm production facility combines skilled craftsmanship
                with advanced CNC technology to ensure every cabinet is
                manufactured with exceptional accuracy and consistency.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                {features.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex min-h-10 items-center gap-2 rounded-md bg-[#D9EAE8] px-2 text-[12px] font-normal leading-tight text-[#000000] sm:gap-3 sm:px-3 sm:text-sm lg:text-xl"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#007B70] text-white">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[450px]"
            variants={imageReveal}
          >
            <Image
              src="/about2.png"
              alt="Bedroom cabinetry and wardrobe interior"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
