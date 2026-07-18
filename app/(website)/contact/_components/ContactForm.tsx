"use client";

import { Mail, MapPin, Phone, Store } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+201227001558",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@woodtalks.net",
  },
  {
    icon: Store,
    label: "Showroom Address",
    value: "Dolphin Mall - 6th of October - Giza Governorate, Egypt",
  },
  {
    icon: MapPin,
    label: "Manufacturing Facility Address",
    value: "Qanater Al Khairiya, Egypt",
  },
];

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
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
      y: shouldReduceMotion ? 0 : 30,
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

  const formReveal: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 36,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.section
      className="bg-[#F4FAFA] px-4 pb-16 pt-28 sm:pb-20 sm:pt-[150px] lg:pb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <div className="grid  gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div className="lg:col-span-6" variants={containerVariants}>
            <motion.h1
              className="text-5xl font-normal leading-tight text-[#000000] sm:text-6xl lg:text-[80px]"
              variants={fadeUp}
            >
              Contact Us
            </motion.h1>

            <motion.p
              className="mt-7 text-xl leading-8 text-[#595959] sm:text-2xl"
              variants={fadeUp}
            >
              We look forward to collaborating on your next project.
              <br />
              Get in touch with us today.
            </motion.p>

            <motion.div className="mt-9 space-y-5" variants={containerVariants}>
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    className="flex gap-4"
                    variants={fadeUp}
                    whileHover={shouldReduceMotion ? undefined : { x: 6 }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E2F0EF] text-[#007066]">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <h2 className="text-base font-medium text-[#000000]">
                        {item.label}
                      </h2>
                      <p className="mt-1 text-base leading-6 text-[#595959]">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div className="mt-7" variants={fadeUp}>
              <h2 className="text-lg font-medium text-[#000000]">
                Social Media:
              </h2>

              <div className="mt-4 flex gap-4">
                {[
                  { icon: FaFacebookF, label: "Facebook" },
                  { icon: FaLinkedinIn, label: "LinkedIn" },
                  { icon: FaInstagram, label: "Instagram" },
                ].map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2F0EF] text-[#007066] transition hover:bg-[#007066] hover:text-white"
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -4, scale: 1.08, rotate: 2 }
                      }
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-6" variants={formReveal}>
            <form className="rounded-lg bg-[#E6F1F0] p-6 sm:p-8 lg:p-5">
              <div className="space-y-5">
                <label className="block">
                  <span className="text-base font-medium text-[#000000]">
                    Name
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="mt-3 h-14 w-full rounded-md border border-[#AFC7C5] bg-transparent px-4 text-base text-[#000000] outline-none transition placeholder:text-[#9AA6A4] focus:border-[#007066]"
                  />
                </label>

                <label className="block">
                  <span className="text-base font-medium text-[#000000]">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="mt-3 h-14 w-full rounded-md border border-[#AFC7C5] bg-transparent px-4 text-base text-[#000000] outline-none transition placeholder:text-[#9AA6A4] focus:border-[#007066]"
                  />
                </label>

                <label className="block">
                  <span className="text-base font-medium text-[#000000]">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="mt-3 h-14 w-full rounded-md border border-[#AFC7C5] bg-transparent px-4 text-base text-[#000000] outline-none transition placeholder:text-[#9AA6A4] focus:border-[#007066]"
                  />
                </label>

                <label className="block">
                  <span className="text-base font-medium text-[#000000]">
                    Massage
                  </span>
                  <textarea
                    placeholder="Write your message here..."
                    rows={6}
                    className="mt-3 w-full resize-none rounded-md border border-[#AFC7C5] bg-transparent px-4 py-4 text-base text-[#000000] outline-none transition placeholder:text-[#9AA6A4] focus:border-[#007066]"
                  />
                </label>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="h-14 rounded-full bg-[#007066] px-10 text-base font-normal text-white transition hover:bg-[#095A54]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
