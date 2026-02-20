import { useEffect, useMemo, useState } from "react";
import zelan from "../app/zelan.webp";
import Image from "next/image";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { motion } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  accent?: "green" | "yellow" | "pink" | "white";
};
const brandColors = ["#c6ff57", "#fff5f2", "#ffed00", "#ffb5d0"];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function HoverLetter({ letter }: { letter: string }) {
  const colors = ["#c6ff57", "#fff5f2", "#ffed00", "#ffb5d0"];
  const [color, setColor] = useState("#fff5f2");

  const handleHover = () => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    setColor(random);
  };

  return (
    <span
      onMouseEnter={handleHover}
      style={{ color }}
      className="transition-colors duration-300 ease-out"
    >
      {letter}
    </span>
  );
}

function formatTime(d: Date): string {
  const hours24 = d.getHours();
  const hours12 = ((hours24 + 11) % 12) + 1;
  const minutes = pad2(d.getMinutes());
  const seconds = pad2(d.getSeconds());
  const ampm = hours24 >= 12 ? "PM" : "AM";
  return `${pad2(hours12)}:${minutes}:${seconds} ${ampm}`;
}

export default function SiteLayout() {
  const navItems: NavItem[] = useMemo(
    () => [
      { label: "WORK", href: "#work", accent: "green" },
      { label: "ABOUT", href: "#about", accent: "white" },
      { label: "CONTACT", href: "#contact", accent: "yellow" },
      { label: "MUSINGS", href: "#musings", accent: "pink" },
    ],
    []
  );

  // You can wire these to real geolocation later; keeping it stable like the screenshot.
  const coords = useMemo(() => ({ lat: 1.3586, lng: 103.9899 }), []);

  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    // <div className="min-h-screen bg-[#0038de] text-white cursor-none" >
    <div className="relative min-h-screen bg-[#0038de] text-[#fff5f2] cursor-none overflow-hidden">
  <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
  {/* Animated Gradient Background */}
  <BackgroundGradientAnimation
    gradientBackgroundStart="#0038de"
    gradientBackgroundEnd="#0038de"
    firstColor="#c6ff57"
    secondColor="#fff5f2"
    thirdColor="#ffed00"
    fourthColor="#ffb5d0"
    pointerColor="#c6ff57"
    className="absolute inset-0 -z-10 opacity-20 pointer-events-none"
  />
  </div>
      {/* Top bar */}
      {/* <header className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"> */}
      <div className="relative z-10">
      <motion.header
  initial={{ opacity: 0, y: -6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
>
        <div className="flex items-start justify-between gap-6">
          {/* Left nav */}
          <nav className="grid grid-cols-2 gap-x-10 gap-y-0.7 leading-none">
  {navItems.map((item) => {
    const color =
        item.accent === "green"
        ? "text-[#c6ff57]"
        : item.accent === "yellow"
        ? "text-[#ffed00]"
        : item.accent === "pink"
        ? "text-[#ffb5d0]"
        : "text-[#fff5f2]";

    return (

<a
  key={item.label}
  href={item.href}
  className={[
    "group relative inline-block",
    "font-extrabold tracking-wide",
    "text-[#fff5f2]",                       // default all white
    "text-[18px] sm:text-[20px] md:text-[22px]", // smaller font
    "transition-all duration-200 ease-out",
    "hover:opacity-90 hover:-translate-y-[1px]",
    "focus:outline-none focus:ring-2 focus:ring-white/60",
    item.accent === "green" && "hover:text-[#c6ff57]",
    item.accent === "yellow" && "hover:text-[#ffed00]",
    item.accent === "pink" && "hover:text-[#ffb5d0]",
    item.accent === "white" && "hover:text-[#fff5f2]",
  ]
    .filter(Boolean)
    .join(" ")}
>
  {item.label}

  <span
    className="pointer-events-none absolute -bottom-[2px] left-0 h-[2px] w-[70%] origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:scale-x-100"
    aria-hidden="true"
  />
</a>

    );
  })}
</nav>

          {/* Right metadata */}
          <div className="shrink-0 text-right leading-tight">
            <div className="text-sm sm:text-base tracking-wide">
              {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
            </div>
            <div className="text-sm sm:text-base">
              {formatTime(now)}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero image */}
      <motion.section
  initial={{ opacity: 0, scale: 1.01 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
  className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
>
        <div className="overflow-hidden rounded-sm">
          <div className="relative aspect-[16/8] sm:aspect-[16/6] md:aspect-[16/5] w-full mx-auto bg-black/10">
            <Image
              src={zelan}
              alt="Zelan"
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      {/* </section> */}
      </motion.section>

      {/* Bottom content */}
      <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Big name */}
          <div className="md:col-span-6 mt-4 md:pb-2">
            {/* <motion.h1
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
  className="text-[#fff5f2] font-extrabold tracking-tight leading-[0.9] text-[60px] xs:text-[92px] sm:text-[120px] md:text-[140px] lg:text-[170px]"
>
  ZELAN
</motion.h1> */}

<motion.h1
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
  className="font-extrabold tracking-tight leading-[0.9] whitespace-nowrap text-[60px] xs:text-[92px] sm:text-[120px] md:text-[140px] lg:text-[170px]"
>
  {"ZELAN".split("").map((letter, index) => (
  <HoverLetter key={index} letter={letter} />
))}
  {/* {"ZELAN".split("").map((letter, index) => (
    <span
      key={index}
      className="transition-colors duration-300 ease-out hover:text-[#c6ff57]"
    >
      {letter}
    </span>
  ))} */}
</motion.h1>
          </div>

          {/* Intro copy */}
          <div className="md:col-span-6 md:pb-2">
            <motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
>
            <div className="text-white/90 text-base sm:text-lg">
              <div className="mb-4 text-sm sm:text-base font tracking-wide">
                zi·lan / zeh·luhn / zee
              </div>
              <p className="leading-[1.3] text-justify">
                Welcome to my corner of the internet. Mainly a work portfolio,
                partially a love letter. Currently focused on{" "}
                  <span className="font-bold text-[#c6ff57]">
                    AI/ML (LLM Research)
                  </span>
                  ,{" "}
                  <span className="font-bold text-[#ffb5d0]">
                    full-stack dev
                  </span>
                  , and{" "}
                  <span className="font-bold text-[#ffed00]">
                    making sense of data
                  </span>
                . Outside the codebase, I have a strong desire to live life and
                see the world through visual art, food, travel, and
                conversations.
              </p>
            </div>
            </motion.div>
          </div>
        </div>
      </main>
      </div>

      
{/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
  <button
    onClick={() =>
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/40 hover:border-[#c6ff57] transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-all duration-300 group-hover:text-[#c6ff57] group-hover:translate-y-1"
    >
      <path d="m19 12-7 7-7-7" />
      <path d="M12 5v14" />
    </svg>
  </button>
</div> */}
      </div>

      
  );
}

