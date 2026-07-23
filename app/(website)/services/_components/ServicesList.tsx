"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import ServicesListSkeleton from "./ServicesListSkeleton";

type Service = {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

type ServicesResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Service[];
};

type DescriptionPoint = {
  html: string;
  text: string;
};

const SERVICES_PER_PAGE = 5;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const SERVICES_ENDPOINT = API_BASE_URL
  ? `${API_BASE_URL}/service`
  : "/api/v1/service";
const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fetchServices = async (page: number): Promise<ServicesResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(SERVICES_PER_PAGE),
  });

  const response = await fetch(`${SERVICES_ENDPOINT}?${params.toString()}`);
  const result = (await response.json()) as ServicesResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Service request failed.");
  }

  return result;
};

const parseServiceDescription = (description: string) => {
  const emptyDescription = {
    bodyHtml: description,
    points: [] as DescriptionPoint[],
  };

  if (typeof document === "undefined") {
    return emptyDescription;
  }

  const template = document.createElement("template");
  template.innerHTML = description;

  template.content
    .querySelectorAll("script, style")
    .forEach((node) => node.remove());

  const points = Array.from(template.content.querySelectorAll("li"))
    .map((item) => ({
      html: item.innerHTML,
      text: item.textContent?.trim() ?? "",
    }))
    .filter((point) => point.text);

  template.content
    .querySelectorAll("ul, ol")
    .forEach((list) => list.remove());

  template.content.querySelectorAll("p").forEach((paragraph) => {
    if (!paragraph.textContent?.trim()) {
      paragraph.remove();
    }
  });

  return {
    bodyHtml: template.innerHTML,
    points,
  };
};

export default function ServicesList() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(1);

  const {
    data: servicesResponse,
    isError,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["services", page, SERVICES_PER_PAGE],
    queryFn: () => fetchServices(page),
    placeholderData: (previousData) => previousData,
  });

  const services = servicesResponse?.data ?? [];
  const totalServices = servicesResponse?.meta.total ?? 0;
  const totalPages = Math.max(
    1,
    Math.ceil(totalServices / SERVICES_PER_PAGE)
  );
  const shouldShowPagination = totalServices > SERVICES_PER_PAGE;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handlePageChange = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);

    if (safePage === page || isFetching) {
      return;
    }

    setPage(safePage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    <section
      id="services-list"
      ref={sectionRef}
      className="scroll-mt-24 bg-[#F4FAFA] px-0 pb-14 sm:pb-20 lg:pb-28"
    >
      <div className="container mx-auto">
        {isPending ? (
          <ServicesListSkeleton />
        ) : isError ? (
          <div className="rounded-lg bg-white p-6 text-center shadow-[0_16px_45px_rgba(0,112,102,0.08)]">
            <p className="text-base text-[#595959]">
              Services could not be loaded.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 h-11 rounded-full bg-[#007066] px-7 text-sm font-normal text-white transition hover:bg-[#095A54]"
            >
              Try Again
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-center shadow-[0_16px_45px_rgba(0,112,102,0.08)]">
            <p className="text-base text-[#595959]">No services found.</p>
          </div>
        ) : (
          <>
            <div
              className={`space-y-10 sm:space-y-14 lg:space-y-16 ${
                isFetching ? "opacity-80" : ""
              }`}
            >
              {services.map((service, index) => {
                const isReverse = index % 2 === 1;
                const parsedDescription = parseServiceDescription(
                  service.description
                );

                return (
                  <motion.article
                    key={service._id}
                    className="grid items-center gap-5 rounded-lg bg-white p-3 shadow-[0_16px_45px_rgba(0,112,102,0.08)] md:grid-cols-2 md:gap-8 md:p-4 lg:gap-[90px] lg:bg-transparent lg:p-0 lg:shadow-none"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={rowVariants}
                  >
                    <motion.div
                      className={`relative h-[210px] overflow-hidden rounded-md sm:h-[270px] lg:h-[464px] ${
                        isReverse ? "md:order-2" : ""
                      }`}
                      variants={imageReveal}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -8, scale: 1.015 }
                      }
                    >
                      <Image
                        src={service.image}
                        alt={service.name}
                        width={1000}
                        height={1000}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />
                    </motion.div>

                    <motion.div
                      className={isReverse ? "md:order-1" : ""}
                      variants={rowVariants}
                    >
                      <motion.h2
                        className="text-[24px] font-normal leading-tight text-[#000000] sm:text-3xl lg:text-4xl"
                        variants={fadeUp}
                      >
                        {service.name}
                      </motion.h2>

                      <motion.div
                        className="mt-3 text-[13px] leading-6 text-[#595959] sm:mt-4 sm:text-base sm:leading-7 md:text-lg lg:mt-5 lg:text-xl [&_a]:text-[#007066] [&_a]:underline [&_p]:m-0 [&_strong]:font-semibold"
                        variants={fadeUp}
                        dangerouslySetInnerHTML={{
                          __html: parsedDescription.bodyHtml,
                        }}
                      />

                      {parsedDescription.points.length > 0 && (
                        <motion.ul
                          className="mt-4 grid grid-cols-2 gap-2 md:block md:space-y-2"
                          variants={rowVariants}
                        >
                          {parsedDescription.points.map((point, pointIndex) => (
                            <motion.li
                              key={`${service._id}-${pointIndex}-${point.text}`}
                              className="flex items-start gap-2 rounded-md bg-[#F4FAFA] px-2 py-2 text-[12px] leading-5 text-[#595959] sm:text-sm md:bg-transparent md:px-0 md:py-0 md:text-base lg:text-xl"
                              variants={bulletReveal}
                            >
                              <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#007066] sm:h-4 sm:w-4 md:text-[#595959]" />
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: point.html,
                                }}
                              />
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>

            {shouldShowPagination && (
              <nav
                className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12"
                aria-label="Services pagination"
              >
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || isFetching}
                  aria-label="Previous services page"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#007066] text-[#007066] transition hover:bg-[#007066] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={isFetching}
                      aria-current={pageNumber === page ? "page" : undefined}
                      className={`h-10 min-w-10 rounded-full px-3 text-sm transition sm:h-11 sm:min-w-11 sm:text-base ${
                        pageNumber === page
                          ? "bg-[#007066] text-white"
                          : "border border-[#B8D8D5] text-[#007066] hover:border-[#007066] hover:bg-white"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages || isFetching}
                  aria-label="Next services page"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#007066] text-[#007066] transition hover:bg-[#007066] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
