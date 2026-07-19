"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, Layers3, Circle } from "lucide-react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const timeline = [
  {
    title: "The First Kitchen (1985)",
    description:
      "True craftsmanship is born out of necessity and passion. Over 40 years ago, our founder, Sami Basilios, returned from working abroad to prepare for his marriage. Unwilling to compromise on the quality of his future home, he decided to engineer his own kitchen. Armed with a pencil, raw materials, and simple hand tools, Sami meticulously designed and built a kitchen of such exceptional caliber that it still stands flawlessly today.",
  },
  {
    title: "An Unlikely Showroom",
    description:
      "Without a proper space to store his newly finished creation, Sami temporarily placed the completed units in an empty room inside his brother’s dental clinic. It didn't stay a secret for long. The striking design and structural integrity immediately caught the attention of visiting family members who insisted on purchasing it right then and there. That single, masterfully crafted kitchen marked the unofficial launch of a decades-long manufacturing legacy.",
  },
  {
    title: "The Evolution to Wood Talks",
    description:
      "Today, Wood Talks represents the seamless evolution of that original standard. Under modern leadership, we have transformed Sami’s foundational dedication to durability into a fully automated, design-to-manufacturing powerhouse. We utilize advanced CNC machinery driven by precise digital engineering software, including SketchUp, Polyboard, and Aspire. While our methods have evolved, our core philosophy remains untouched: building complex, premium cabinetry that lasts for generations.",
  },
];

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function OurStory() {
  const counterRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCounterInView = useInView(counterRef, {
    once: true,
    margin: "-120px",
  });
  const [experienceYears, setExperienceYears] = useState(0);

  useEffect(() => {
    if (!isCounterInView) return;

    if (shouldReduceMotion) {
      setExperienceYears(40);
      return;
    }

    const controls = animate(0, 40, {
      duration: 1.8,
      ease: SMOOTH_EASE,
      onUpdate: (latest) => setExperienceYears(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isCounterInView, shouldReduceMotion]);

  const sectionVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
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
        duration: shouldReduceMotion ? 0 : 0.72,
        ease: SMOOTH_EASE,
      },
    },
  };

  const imageReveal: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      clipPath: shouldReduceMotion
        ? "inset(0% 0% 0% 0%)"
        : "inset(0% 100% 0% 0%)",
      x: shouldReduceMotion ? 0 : -30,
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 1,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.section
      className="overflow-hidden py-12 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-5">
        {/* Heading */}

        <motion.div className="mb-9 text-center md:mb-16" variants={fadeUp}>
          <h2 className="text-[40px] font-light leading-tight text-black sm:text-6xl md:text-7xl">
            Our <span className="italic font-normal">Story</span>
          </h2>
        </motion.div>

        {/* Content */}

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Image */}

          <motion.div className="lg:col-span-5" variants={imageReveal}>
            <motion.div
              className="relative h-[280px] w-full overflow-hidden rounded-lg shadow-[0_24px_70px_rgba(0,112,102,0.16)] sm:h-[420px] lg:h-[543px] lg:rounded-2xl"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
            >
              <Image
                src="/project4.png"
                alt="Story"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Timeline */}

          <motion.div
            className="space-y-7 sm:space-y-4 lg:col-span-7"
            variants={sectionVariants}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-8"
                variants={fadeUp}
              >
                {index !== timeline.length - 1 && (
                  <motion.div
                    className="absolute left-[8px] top-5 h-full w-[2px] origin-top bg-[#B0D3D0]"
                    initial={shouldReduceMotion ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.85, ease: SMOOTH_EASE }}
                  />
                )}

                <motion.span
                  className="absolute left-0 top-1"
                  initial={
                    shouldReduceMotion ? false : { scale: 0.2, opacity: 0 }
                  }
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.45, ease: SMOOTH_EASE }}
                >
                  <Circle size={18} className="fill-white text-[#B0D3D0]" />
                </motion.span>

                <h3 className="text-lg font-medium leading-tight text-[#000000] sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-2 text-[13px] !leading-[165%] text-[#454545] sm:text-base sm:!leading-[155%]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}

        <motion.div className="my-12 h-px bg-gray-300" variants={fadeUp} />

        {/* Bottom Stats */}

        <motion.div
          className="grid gap-4 pt-8 sm:grid-cols-2 sm:gap-5 lg:flex lg:justify-center lg:gap-[200px]"
          variants={sectionVariants}
        >
          {/* Experience */}
          <motion.div
            ref={counterRef}
            className="flex w-full items-center gap-3 rounded-lg bg-[#F4FAFA] p-4 shadow-[0_14px_35px_rgba(0,112,102,0.08)] sm:max-w-sm sm:gap-5 lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none"
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D9EAE8] sm:h-16 sm:w-16">
              <Award className="h-6 w-6 text-[#007066] sm:h-8 sm:w-8" />
            </div>

            <div className="flex-1">
              <h3 className="tabular-nums text-2xl font-medium leading-none text-[#000000] sm:text-4xl lg:text-5xl">
                {experienceYears}+
              </h3>

              <p className="mt-1 text-[11px] leading-4 text-[#353535] sm:text-lg lg:text-xl">
                Years of Experience
              </p>
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            className="flex w-full items-center gap-3 rounded-lg bg-[#F4FAFA] p-4 shadow-[0_14px_35px_rgba(0,112,102,0.08)] sm:max-w-lg sm:gap-5 lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none"
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D9EAE8] sm:h-16 sm:w-16">
              <Layers3 className="h-6 w-6 text-[#007066] sm:h-8 sm:w-8" />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-medium leading-none text-[#000000] sm:text-4xl lg:text-5xl">
                Thousands
              </h3>

              <p className="mt-1 text-[11px] leading-4 text-[#353535] sm:text-lg lg:text-xl">
                of Custom Projects
                Across 4 Decades
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
