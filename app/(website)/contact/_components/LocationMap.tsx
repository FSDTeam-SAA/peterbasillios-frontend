"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1728.0155589550632!2d30.955266138866087!3d29.978535693739282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458567ce8fb9235%3A0x14bb0016623178e3!2sFirst%206th%20of%20October%2C%20Giza%20Governorate%203234010%2C%20Egypt!5e0!3m2!1sen!2sbd!4v1784350765451!5m2!1sen!2sbd";

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LocationMap() {
  const shouldReduceMotion = useReducedMotion();

  const mapReveal: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 34,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.section
      className="bg-[#F4FAFA] px-4 pb-16 sm:pb-20 lg:pb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="container mx-auto">
        <motion.div
          className="overflow-hidden rounded-md shadow-[0_18px_55px_rgba(0,112,102,0.12)]"
          variants={mapReveal}
          whileHover={shouldReduceMotion ? undefined : { y: -6 }}
        >
          <iframe
            src={mapSrc}
            title="Wood Talks location map"
            className="h-[260px] w-full border-0 sm:h-[360px] lg:h-[450px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
