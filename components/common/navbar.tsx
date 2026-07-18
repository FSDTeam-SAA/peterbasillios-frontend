"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const usesImageHero =
    pathname === "/" || pathname === "/about" || pathname.startsWith("/about/");
  const useDarkNavbar = !usesImageHero;
  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        useDarkNavbar
          ? "bg-[#F4FAFA]/95 backdrop-blur-md"
          : isScrolled
            ? "bg-black/55 shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex h-20 items-center justify-between lg:h-24">
          {/* Logo */}

          <Link
            href="/"
            className="text-2xl font-light tracking-wide sm:text-3xl lg:text-4xl"
          >
            <Image
              src={useDarkNavbar ? "/logo3.png" : "/logo1.png"}
              alt="Logo"
              width={1000}
              height={1000}
              className="h-[32px] w-[271px]"
            />
          </Link>

          {/* Desktop */}

          <nav
            className={`hidden items-center gap-10 lg:flex ${
              useDarkNavbar ? "text-black" : "text-white"
            }`}
          >
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-normal transition hover:text-[#007066] ${
                  isActiveLink(item.href) ? "text-[#007066]" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right */}

          <div className="hidden items-center gap-6 lg:flex">
            <Search
              className={`cursor-pointer ${
                useDarkNavbar ? "text-black" : "text-white"
              }`}
              size={20}
            />

            <Button
              variant="outline"
              className={`rounded-full bg-transparent px-7 ${
                useDarkNavbar
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile */}

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`h-11 w-11 rounded-full backdrop-blur-sm ${
                      useDarkNavbar
                        ? "bg-black/5 text-black hover:bg-black hover:text-white"
                        : "bg-white/10 text-white hover:bg-white hover:text-[#006D68]"
                    }`}
                  />
                }
              >
                <Menu />
              </SheetTrigger>

              <SheetContent side="right" className="w-[82vw] max-w-[360px] p-6">
                <div className="mt-10 flex flex-col gap-6">
                  <Link
                    href="/"
                    className="text-2xl font-light tracking-wide text-[#006D68]"
                  >
                    <span className="text-teal-500">W</span>OOD TALKS
                  </Link>

                  {links.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`border-b border-gray-100 pb-3 text-lg transition hover:text-[#007066] ${
                        isActiveLink(item.href)
                          ? "text-[#007066]"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Button className="mt-3 h-12 rounded-full bg-[#006D68] text-white hover:bg-[#095A54]">
                    Get In Touch
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>

  );
}
