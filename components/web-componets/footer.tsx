"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
];

const socials = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/WoodTalksEg",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/woodtalks.eg/",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/woodtalks/?viewAsMember=true",
  },
];

export default function Footer() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: smoothEase,
      },
    },
  };

  return (
    <motion.footer
      className="!bg-[#F4FAFA]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={containerVariants}
    >
      {/* Logo */}
      <motion.div className="border-b border-gray-200 py-10" variants={fadeUp}>
        <div className="container mx-auto flex justify-center px-5">
          {/* Replace with your logo */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.035 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Image
              src="/logo.png"
              alt="Wood Talks"
              width={260}
              height={70}
              className="h-auto w-[220px] md:w-[260px]"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-5 ">
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1fr] lg:gap-12"
          variants={containerVariants}
        >
          {/* Left */}
          <motion.div className="text-center sm:col-span-2 sm:text-left lg:col-span-1" variants={fadeUp}>
            <h2 className="text-3xl font-light text-black sm:text-4xl">
              Get Active Updates
            </h2>

            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#504E4B] sm:mx-0 sm:mt-6 sm:text-lg sm:leading-8">
              We look forward to collaborating on your next
              project. Get in touch with us today.
            </p>

            <motion.div
              className="mx-auto mt-7 w-fit sm:mx-0 sm:mt-8"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#006D68] px-8 text-white transition hover:bg-[#007066]"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div className="space-y-4 text-center sm:space-y-5 sm:text-left" variants={fadeUp}>
            {navLinks.map((item) => (
              <motion.div
                key={item.title}
                whileHover={shouldReduceMotion ? undefined : { x: 6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Link
                  href={item.href}
                  className={`block text-base transition hover:text-[#007066] sm:text-lg ${
                    isActiveLink(item.href)
                      ? "text-[#007066]"
                      : "text-gray-700"
                  }`}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div className="text-center sm:text-left" variants={fadeUp}>
            <div className="space-y-4 text-sm leading-6 text-gray-700 sm:space-y-5 sm:text-base">
              <p>+201227001558</p>

              <p>Info@Woodtalks.Net</p>

              <p>
                Dolphin Mall - 6th Of October - Giza
                Governorate, Egypt
              </p>

              <p>Qanater Al Khairiya, Egypt</p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 sm:justify-start">
              {socials.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -4, scale: 1.08, rotate: 2 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4EFEF] text-[#006D68] transition hover:bg-[#006D68] hover:text-white"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div className="border-t border-gray-200 py-6" variants={fadeUp}>
        <div className="container mx-auto px-5">
          <p className="text-center text-sm text-gray-500">
            © All rights reserved wood talks
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
}
