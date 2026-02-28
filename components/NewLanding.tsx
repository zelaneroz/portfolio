import { useEffect, useMemo, useState } from "react";
import zelan from "../app/zelan.webp";
import Image from "next/image";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { AtSignIcon } from "./icons/at-sign-icon";
import { GithubIcon } from "./icons/github-icon";
import { LinkedinIcon } from "./icons/linkedin-icon";
import { XIcon } from "./icons/x-icon";
import { FileText } from "lucide-react";

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
  const [color, setColor] = useState("#fff5f2");
  return (
    <span
      onMouseEnter={() =>
        setColor(brandColors[Math.floor(Math.random() * brandColors.length)])
      }
      style={{ color }}
      className="transition-colors duration-300 ease-out"
    >
      {letter}
    </span>
  );
}

/** Wraps a single word — lifts it and flashes a random brand color on hover */
function HoverWord({ word }: { word: string }) {
  const [color, setColor] = useState<string | null>(null);
  return (
    <motion.span
      className="inline-block cursor-default"
      style={{ color: color ?? "inherit" }}
      onHoverStart={() =>
        setColor(brandColors[Math.floor(Math.random() * brandColors.length)])
      }
      onHoverEnd={() => setColor(null)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {word}
    </motion.span>
  );
}

/** Splits a plain string into space-separated HoverWord spans */
function AnimatedText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          <HoverWord word={word} />{" "}
        </span>
      ))}
    </>
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
      { label: "PROJECTS", href: "#project", accent: "white" },
      { label: "CONTACT", href: "#contact", accent: "yellow" },
      { label: "THOUGHTS", href: "/thoughts", accent: "pink" },
    ],
    []
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const coords = useMemo(() => ({ lat: 1.3586, lng: 103.9899 }), []);

  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen bg-[#0038de] text-[#fff5f2] cursor-none overflow-hidden"
    >
    <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
      {mounted && (
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
      )}
    </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
        >
          <div className="flex items-start justify-between gap-6">
            {/* Left nav */}
            <nav className="grid grid-cols-2 gap-x-10 gap-y-0.7 leading-none">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "group relative inline-block",
                    "font-extrabold tracking-wide",
                    "text-[#fff5f2]",
                    "text-[18px] sm:text-[20px] md:text-[22px]",
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
                </Link>
              ))}
            </nav>

            {/* Right — email + icons */}
            <div className="shrink-0 text-right leading-tight">
              <div className="text-sm sm:text-base tracking-wide mb-2">
                zeespanto@gmail.com
              </div>
              <div className="flex items-center justify-end gap-3">
                <Link
                  href="https://github.com/zelaneroz"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <GithubIcon className="h-10 w-10" />
                </Link>
                {/* <Link
                  href="mailto:zeespanto@gmail.com"
                  aria-label="email"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <AtSignIcon className="h-8 w-8" />
                </Link> */}
                <Link
                  href="https://www.linkedin.com/in/zelanespanto/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="linkedin"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <LinkedinIcon className="h-10 w-10" />
                </Link>
                <Link
                  href="https://x.com/yourhandle"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="x"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <XIcon className="h-10 w-10" />
                </Link>
                <Link
                  href="/ZelanErozEspantoResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="resume"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <FileText className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </motion.header>

        {/* ── Hero image ── */}
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
        </motion.section>

        {/* ── Bottom content ── */}
        <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-12 md:items-start">
            {/* Big name */}
            <div className="md:col-span-6 mt-4 md:pb-2">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="font-extrabold tracking-tight leading-[0.9] whitespace-nowrap text-[60px] xs:text-[92px] sm:text-[120px] md:text-[140px] lg:text-[170px]"
              >
                {"ZELAN".split("").map((letter, i) => (
                  <HoverLetter key={i} letter={letter} />
                ))}
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

                  {/*
                    Each plain word is wrapped in HoverWord — lifts 2px and
                    flashes a random brand color on hover, then snaps back.
                    The three keyword spans keep their fixed color but also
                    get the spring-lift so the whole paragraph feels unified.
                  */}
                  <p className="leading-[1.3] text-justify">
                    <AnimatedText text="Welcome to my corner of the internet. Mainly a work portfolio, partially a love letter. Currently focused on" />
                    <motion.span
                      className="font-bold text-[#c6ff57] inline-block"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      AI/ML (LLM Research)
                    </motion.span>
                    {", "}
                    <motion.span
                      className="font-bold text-[#ffb5d0] inline-block"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      full-stack dev
                    </motion.span>
                    {", and "}
                    <motion.span
                      className="font-bold text-[#ffed00] inline-block"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      making sense of data
                    </motion.span>
                    {". "}
                    <AnimatedText text="Outside the codebase, I have a strong desire to live life and experience the world to the fullest through travel, visual art, food, and meaningful conversations." />
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}