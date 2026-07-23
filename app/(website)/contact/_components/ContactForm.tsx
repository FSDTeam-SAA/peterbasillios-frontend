"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, MapPin, Phone, Store } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { toast } from "sonner";

type ContactFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialFormValues: ContactFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,20}$/;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const CONTACT_ENDPOINT = `${API_BASE_URL}/contact`;

const validateContactForm = (values: ContactFormValues) => {
  const errors: ContactFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!phonePattern.test(values.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid phone number.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
};

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

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const [formValues, setFormValues] =
    useState<ContactFormValues>(initialFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = event.target.name as keyof ContactFormValues;
    const { value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ContactFormValues = {
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        phoneNumber: formValues.phoneNumber.trim(),
        message: formValues.message.trim(),
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      toast.success("Message sent successfully.");
      setFormValues(initialFormValues);
      setErrors({});
    } catch {
      toast.error("Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClassName = (fieldName: keyof ContactFormValues) =>
    `mt-2 w-full rounded-md border bg-transparent px-3 text-sm text-[#000000] outline-none transition placeholder:text-[#9AA6A4] focus:border-[#007066] sm:mt-3 sm:px-4 sm:text-base ${
      errors[fieldName] ? "border-red-500" : "border-[#AFC7C5]"
    }`;

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
      className="bg-[#F4FAFA] px-4 pb-14 pt-28 sm:pb-20 sm:pt-[150px] lg:pb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-16">
          <motion.div className="lg:col-span-6" variants={containerVariants}>
            <motion.h1
              className="text-[40px] font-normal leading-tight text-[#000000] sm:text-6xl lg:text-[80px]"
              variants={fadeUp}
            >
              Contact Us
            </motion.h1>

            <motion.p
              className="mt-4 text-[15px] leading-7 text-[#595959] sm:mt-7 sm:text-xl md:text-2xl"
              variants={fadeUp}
            >
              We look forward to collaborating on your next project.
              <br />
              Get in touch with us today.
            </motion.p>

            <motion.div
              className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 lg:block lg:space-y-5"
              variants={containerVariants}
            >
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    className="flex gap-3 rounded-lg bg-white p-3 shadow-[0_12px_30px_rgba(0,112,102,0.07)] sm:gap-4 lg:bg-transparent lg:p-0 lg:shadow-none"
                    variants={fadeUp}
                    whileHover={shouldReduceMotion ? undefined : { x: 6 }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E2F0EF] text-[#007066] sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>

                    <div>
                      <h2 className="text-sm font-medium text-[#000000] sm:text-base">
                        {item.label}
                      </h2>
                      <p className="mt-1 text-[12px] leading-5 text-[#595959] sm:text-base sm:leading-6">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div className="mt-7" variants={fadeUp}>
              <h2 className="text-base font-medium text-[#000000] sm:text-lg">
                Social Media:
              </h2>

              <div className="mt-4 flex gap-3 sm:gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E2F0EF] text-[#007066] transition hover:bg-[#007066] hover:text-white sm:h-12 sm:w-12"
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -4, scale: 1.08, rotate: 2 }
                      }
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-6" variants={formReveal}>
            <form
              className="rounded-lg bg-[#E6F1F0] p-4 shadow-[0_18px_50px_rgba(0,112,102,0.1)] sm:p-8 lg:p-5 lg:shadow-none"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="space-y-4 sm:space-y-5">
                <label className="block">
                  <span className="text-sm font-medium text-[#000000] sm:text-base">
                    Name
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formValues.fullName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    className={`${getFieldClassName("fullName")} h-12 sm:h-14`}
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="mt-2 text-xs text-red-600 sm:text-sm"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[#000000] sm:text-base">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formValues.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${getFieldClassName("email")} h-12 sm:h-14`}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-2 text-xs text-red-600 sm:text-sm"
                    >
                      {errors.email}
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[#000000] sm:text-base">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.phoneNumber)}
                    aria-describedby={
                      errors.phoneNumber ? "phoneNumber-error" : undefined
                    }
                    className={`${getFieldClassName("phoneNumber")} h-12 sm:h-14`}
                  />
                  {errors.phoneNumber && (
                    <p
                      id="phoneNumber-error"
                      className="mt-2 text-xs text-red-600 sm:text-sm"
                    >
                      {errors.phoneNumber}
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[#000000] sm:text-base">
                    Message
                  </span>
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    rows={6}
                    value={formValues.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${getFieldClassName("message")} resize-none py-3 sm:py-4`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-2 text-xs text-red-600 sm:text-sm"
                    >
                      {errors.message}
                    </p>
                  )}
                </label>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full bg-[#007066] px-10 text-sm font-normal text-white transition hover:bg-[#095A54] disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:w-auto sm:text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
