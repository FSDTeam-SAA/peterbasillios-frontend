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
      className="overflow-hidden pb-14 md:pb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-5">
        <div className="grid overflow-hidden  lg:grid-cols-2">
          <motion.div
            className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[450px]"
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
            className="flex min-h-[280px] items-center bg-[#007066] px-7 py-10 text-white sm:min-h-[360px] sm:px-10 lg:px-12"
            variants={fadeUp}
          >
            <div className="">
              <h2 className="text-3xl font-normal leading-tight sm:text-4xl">
                Crafted with{" "}
                <span className="italic font-light">Purpose</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#D7D7D7] sm:text-base">
                We believe exceptional cabinetry begins with thoughtful design,
                precision engineering, and uncompromising attention to detail.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#D7D7D7] sm:text-base">
                Every project is built to reflect the unique lifestyle of our
                clients while maintaining the highest standards of quality.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex min-h-[340px] items-center bg-[#E6F1F0] px-7 py-10 sm:min-h-[360px] sm:px-10 lg:px-12"
            variants={fadeUp}
          >
            <div className="">
              <h2 className="text-3xl font-normal leading-tight text-[#000000] sm:text-4xl">
                Precision{" "}
                <span className="italic font-light">Manufacturing</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#454545] sm:text-base">
                Our 1000 sqm production facility combines skilled craftsmanship
                with advanced CNC technology to ensure every cabinet is
                manufactured with exceptional accuracy and consistency.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {features.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex min-h-10 items-center gap-3 rounded-md bg-[#D9EAE8] px-3 text-sm font-normal text-[#000000] sm:text-xl"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#007B70] text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[450px]"
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
