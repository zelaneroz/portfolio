"use client";

import Link from "next/link";
import Image from "next/image";

const navLinks = [
  {
    label: "ABOUT",
    href: "#about",
  },
  {
    label: "WORK",
    href: "#work",
    active: true,
  },
  {
    label: "BRAIN",
    href: "#brain",
  },
];

export default function NewLanding() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#d655c2]"
    >
      {/* Background blobs */}
      <Image
        src="/bg_blobs.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />

      {/* Page content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 py-8 sm:px-10 md:px-16 lg:px-24">
        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="mx-auto grid w-full max-w-[700px] grid-cols-3 gap-4 md:gap-16"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={[
                "flex h-10 items-center justify-center rounded-full border-[3px]",
                "text-sm font-bold leading-none transition-all duration-200",
                "sm:text-base md:h-11 md:text-xl",
                link.active
                  ? "border-white bg-white text-[#d655c2]"
                  : "border-white bg-transparent text-white hover:bg-white hover:text-[#d655c2]",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Name */}
        <div className="flex flex-1 items-center justify-center py-16">
          <h1
            className={[
              "text-center font-serif text-[#ffed00]",
              "text-[clamp(4.5rem,13vw,12rem)]",
              "leading-[0.72] tracking-[-0.078em]",
            ].join(" ")}
            style={{
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            <span className="block whitespace-nowrap">
              Zelan
            </span>

            <span className="block italic">
              Espanto
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}