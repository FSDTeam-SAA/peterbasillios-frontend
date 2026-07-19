"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const services = [
  {
    title: "Custom Kitchens",
    image: "/b1.png",
    alt: "Custom classic kitchen cabinetry",
    description:
      "Custom kitchens designed around your lifestyle, combining intelligent layouts, premium materials, and precision engineering. Every cabinet is manufactured to deliver exceptional functionality, refined aesthetics, and long-lasting performance.",
    points: [
      "Tailor-made layouts",
      "Smart storage solutions",
      "Premium finishes",
      "High-quality hardware",
    ],
  },
  {
    title: "Dressing Rooms",
    image: "/b2.png",
    alt: "Dressing room lockers and mirrors",
    description:
      "Bespoke dressing rooms thoughtfully designed to maximize storage while creating a seamless and luxurious experience. Every detail is carefully planned to balance organization, elegance, and everyday functionality.",
    points: [
      "Tailor-made layouts",
      "Smart storage solutions",
      "Premium finishes",
      "High-quality hardware",
    ],
    reverse: true,
    highlight: true,
  },
  {
    title: "Bedrooms",
    image: "/b3.png",
    alt: "Bedroom with custom wall cabinetry",
    description:
      "Premium bedroom cabinetry tailored to create calm, organized, and sophisticated living spaces. Our custom solutions integrate intelligent storage with timeless design and precision craftsmanship.",
    points: [
      "Walk-in wardrobes",
      "Custom shelving & drawers",
      "Soft-close systems",
      "Personalized layouts",
    ],
  },
  {
    title: "TV Consoles",
    image: "/tv.png",
    alt: "Wood wall mounted console cabinetry",
    description:
      "Modern TV consoles and entertainment units crafted to complement contemporary interiors. Designed with clean architectural lines, concealed storage, and premium finishes for a refined living experience.",
    points: [
      "Floating TV units",
      "Cable management",
      "Hidden storage",
      "Contemporary finishes",
    ],
    reverse: true,
  },
  {
    title: "Bathroom Vanity Units",
    image: "/b4.png",
    alt: "Bathroom vanity unit with mirror",
    description:
      "Custom bathroom vanity units engineered with moisture-resistant materials and premium hardware. Designed to combine durability, practical storage, and timeless elegance in every detail.",
    points: [
      "Moisture-resistant cabinetry",
      "Elegant finishes",
      "Functional storage",
      "Custom dimensions",
    ],
  },
];

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ServicesList() {
  const shouldReduceMotion = useReducedMotion();

  const rowVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const imageReveal: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 34,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        ease: SMOOTH_EASE,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 28,
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

  const bulletReveal: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : -12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <section className="bg-[#F4FAFA] px-4 pb-14 sm:pb-20 lg:pb-28">
      <div className="container mx-auto ">
        <div className="space-y-10 sm:space-y-14 lg:space-y-16">
          {services.map((service) => (
            <motion.article
              key={service.title}
              className="grid items-center gap-5 rounded-lg bg-white p-3 shadow-[0_16px_45px_rgba(0,112,102,0.08)] md:grid-cols-2 md:gap-8 md:p-4 lg:gap-[90px] lg:bg-transparent lg:p-0 lg:shadow-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={rowVariants}
            >
              <motion.div
                className={`relative h-[210px] overflow-hidden rounded-md sm:h-[270px] lg:h-[464px] ${
                  service.reverse ? "md:order-2" : ""
                } ${
                  service.highlight
                    ? ""
                    : ""
                }`}
                variants={imageReveal}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }
                }
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                   width={1000}
                   height={1000}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </motion.div>

              <motion.div
                className={service.reverse ? "md:order-1" : ""}
                variants={rowVariants}
              >
                <motion.h2
                  className="text-[24px] font-normal leading-tight text-[#000000] sm:text-3xl lg:text-4xl"
                  variants={fadeUp}
                >
                  {service.title}
                </motion.h2>

                <motion.p
                  className="mt-3 text-[13px] leading-6 text-[#595959] sm:mt-4 sm:text-base sm:leading-7 md:text-lg lg:mt-5 lg:text-xl"
                  variants={fadeUp}
                >
                  {service.description}
                </motion.p>

                <motion.ul
                  className="mt-4 grid grid-cols-2 gap-2 md:block md:space-y-2"
                  variants={rowVariants}
                >
                  {service.points.map((point) => (
                    <motion.li
                      key={point}
                      className="flex items-start gap-2 rounded-md bg-[#F4FAFA] px-2 py-2 text-[12px] leading-5 text-[#595959] sm:text-sm md:bg-transparent md:px-0 md:py-0 md:text-base lg:text-xl"
                      variants={bulletReveal}
                    >
                      <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#007066] sm:h-4 sm:w-4 md:text-[#595959]" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
