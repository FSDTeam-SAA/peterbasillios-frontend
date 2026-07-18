"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

const projects = [
  {
    count: "01-04",
    title: "Minimal White Kitchen Concept",
    bgSrc: "/project1.png",
    imageSrc: "/project2.png",
    alt: "Minimal white kitchen concept",
    description:
      "Minimal white kitchen concept with high-gloss cabinetry, integrated appliances, and clean European-style layout focusing on elegance and functionality.",
  },
  {
    count: "02-04",
    title: "Contemporary Apartment Interior",
    bgSrc: "/project3.png",
    imageSrc: "/project4.png",
    alt: "Contemporary apartment interior",
    description:
      "Modern luxury interior concept inspired by organic shell forms, combining curved cabinetry design with soft lighting aesthetics.",
  },
  {
    count: "03-04",
    title: "Premium Door Collection Showcase",
    bgSrc: "/project5.png",
    imageSrc: "/project6.png",
    alt: "Premium door collection showcase",
    description:
      "A curated collection of premium custom door designs showcasing material variation, CNC precision detailing, and modern architectural finishes.",
  },
];

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const backgroundRefs = useRef<HTMLDivElement[]>([]);
  const cardImageRefs = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const banner = bannerRef.current;
    const progress = progressRef.current;

    if (!section || !banner || !progress) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const backgrounds = projects
        .map((_, index) => backgroundRefs.current[index])
        .filter((node): node is HTMLDivElement => Boolean(node));
      const cardImages = projects
        .map((_, index) => cardImageRefs.current[index])
        .filter((node): node is HTMLDivElement => Boolean(node));

      if (
        backgrounds.length !== projects.length ||
        cardImages.length !== projects.length
      ) {
        return;
      }

      let refreshFrame: number | null = null;

      const ctx = gsap.context(() => {
        gsap.set(backgrounds, {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 100%)",
        });
        gsap.set(cardImages, {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 100%)",
        });
        gsap.set(backgrounds[0], { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(cardImages[0], { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

        const bannerRect = banner.getBoundingClientRect();
        const imageRect = cardImages[0].getBoundingClientRect();
        const imageStart =
          (bannerRect.right - imageRect.right) / bannerRect.width;
        const imageDuration = imageRect.width / bannerRect.width;

        const timeline = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (projects.length - 1)}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextIndex = gsap.utils.clamp(
                0,
                projects.length - 1,
                Math.round(self.progress * (projects.length - 1)),
              );

              if (activeIndexRef.current !== nextIndex) {
                activeIndexRef.current = nextIndex;
                setActiveIndex(nextIndex);
              }
            },
          },
        });

        timeline.to(
          progress,
          { scaleX: 1, duration: projects.length - 1, ease: "none" },
          0,
        );

        projects.forEach((_, index) => {
          if (index === 0) {
            return;
          }

          const position = index - 1;

          timeline
            .fromTo(
              backgrounds[index],
              { clipPath: "inset(0% 0% 0% 100%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" },
              position,
            )
            .fromTo(
              cardImages[index],
              { clipPath: "inset(0% 0% 0% 100%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: imageDuration,
                ease: "none",
              },
              position + imageStart,
            );
        });

        refreshFrame = window.requestAnimationFrame(() =>
          ScrollTrigger.refresh(),
        );
      }, section);

      return () => {
        if (refreshFrame !== null) {
          window.cancelAnimationFrame(refreshFrame);
        }

        ctx.revert();
      };
    });

    return () => media.revert();
  }, []);

  const activeProject = projects[activeIndex];

  return (
    <div id="projects">
      <section className="py-14 sm:py-16 lg:hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-base text-muted-foreground">
                Our projects
              </p>

              <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-[#000000] sm:text-4xl">
                Custom Cabinetry for Every Space
              </h2>
            </div>

            <Button className="h-[50px] w-fit !rounded-[999px] bg-[#007066] px-7 text-base font-medium text-white hover:bg-[#095A54]">
              All Projects
              <Image
                src="/star.png"
                alt="Star"
                width={100}
                height={100}
                className="ml-2 h-4 w-4 object-cover"
              />
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.count}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_55px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={project.imageSrc}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-2 text-sm text-neutral-500">
                    {project.count}
                  </p>

                  <h3 className="line-clamp-2 text-2xl font-semibold leading-tight text-neutral-950">
                    {project.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-500">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={sectionRef}
        className="hidden min-h-screen py-10 sm:py-14 lg:block lg:py-16"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-base text-muted-foreground">
                 Our projects
              </p>

              <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[#000000] sm:text-4xl">
                Custom Cabinetry for Every Space
              </h2>
            </div>

            <Button className="h-[52px] !rounded-[999px] bg-[#007066] px-8 text-base font-medium text-white hover:bg-[#095A54]">
              All Projects
              <Image
                src="/star.png"
                alt="Star"
                width={100}
                height={100}
                className="ml-2 h-4 w-4 object-cover"
              />
            </Button>
          </div>

        <div
          ref={bannerRef}
          className="relative h-[72vh] min-h-[520px] overflow-hidden rounded-2xl bg-neutral-900 md:min-h-[700px]"
        >
          {projects.map((project, index) => (
            <div
              key={project.count}
              ref={(node) => {
                if (node) {
                  backgroundRefs.current[index] = node;
                } else {
                  delete backgroundRefs.current[index];
                }
              }}
              className="absolute inset-0 will-change-[clip-path]"
              style={{ zIndex: index }}
            >
              <Image
                src={project.bgSrc}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 z-[5] bg-black/38" />

          <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6">
            <article className="h-[450px] w-[600px] max-w-[95vw] overflow-hidden rounded-2xl bg-white p-5 text-neutral-950 shadow-2xl sm:h-[540px] sm:p-7">
              <p className="mb-3 text-center text-sm text-neutral-500">
                {activeProject.count}
              </p>

              <h3 className="mb-5 line-clamp-2 text-center text-2xl font-semibold leading-tight sm:text-3xl">
                {activeProject.title}
              </h3>

              <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-lg">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    ref={(node) => {
                      if (node) {
                        cardImageRefs.current[index] = node;
                      } else {
                        delete cardImageRefs.current[index];
                      }
                    }}
                    className="absolute inset-0 will-change-[clip-path]"
                    style={{ zIndex: index }}
                  >
                    <Image
                      src={project.imageSrc}
                      alt={project.alt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 768px) 34rem, 92vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="mx-auto line-clamp-2 max-w-md text-center text-sm leading-6 text-neutral-500">
                {activeProject.description}
              </p>
            </article>
          </div>

            <div
              ref={progressRef}
              className=""
            />
         
        </div>
        </div>
      </section>
    </div>
  );
}
