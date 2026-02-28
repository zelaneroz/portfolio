"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import menu from "../app/blue_menu.svg";

type ProjectCard = {
  id: string;
  title: string;
  date: string;
  tags: string;
  blurb: string;
  image: string;
  link: string; // ← URL the card opens
};

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/#work" },
  { label: "CONTACT", href: "/#contact" },
  { label: "THOUGHTS", href: "/thoughts" },
];

const cards: ProjectCard[] = [
  {
    id: "0",
    title: "Energy-efficiency Score",
    date: "(c. 2025)",
    tags: "Python, HuggingFace, Machine Learning",
    blurb: "Built a regression model for KPMG & Break Through Tech to predict building energy scores from municipal datasets.",
    image: "/projects/energy.png",
    link: "https://github.com/zelaneroz", // ← replace with real URL
  },
  {
    id: "1",
    title: "Powering progress: Women driving science at CWRU",
    date: "(c. 2024)",
    tags: "Feature",
    blurb: "International Women and Girls in Science Day 2026",
    image: "/projects/cwru-women.jpg",
    link: "https://case.edu/news/powering-progress-women-driving-science-cwru?utm_source=sfmc&utm_medium=email&utm_campaign=thedaily_people", // ← replace with real URL
  },
  {
    id: "2",
    title: "Weatherhead students collaborate with iconic Cleveland market hub",
    date: "(c. 2024)",
    tags: "Feature",
    blurb: "CWRU Weatherhead School of Management, pairs a multidisciplinary team of students with long-standing Cleveland staple.",
    image: "/projects/wsm.avif",
    link: "https://case.edu/news/weatherhead-students-collaborate-iconic-cleveland-market-hub", // ← replace with real URL
  },
];

// ─── Skill block ──────────────────────────────────────────────────────────────

function SkillBlock({ label, tags }: { label: string; tags: string[] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="group">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          backgroundColor: hovered ? "#0038de" : "transparent",
          color: hovered ? "#FFEB00" : "#0038de",
        }}
        transition={{ duration: 0.15 }}
        className="inline-block cursor-default border border-[#0038de] px-2 py-[3px] font-extrabold tracking-wide text-[clamp(0.7rem,1.1vw,0.8rem)] uppercase leading-none select-none"
      >
        {label}
      </motion.div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <motion.span
            key={tag}
            whileHover={{ backgroundColor: "#FFEB00", color: "#0038de", scale: 1.04 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="cursor-default bg-[#0038de]/8 text-[#0038de] border border-[#0038de]/20 px-2 py-[2px] text-[clamp(0.58rem,0.9vw,0.68rem)] font-medium leading-snug"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectsFeaturesSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="projects" className="relative min-h-screen w-full bg-[#FFEB00] overflow-hidden">

      {/* ─── DECOR LAYER ─── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image src="/projects-trinkets/stamp_deutsche.webp" alt="" width={220} height={220}
          className="absolute -right-6 -top-6 w-[clamp(7rem,12vw,12rem)] h-auto" />
        <Image src="/projects-trinkets/strawberry.webp" alt="" width={160} height={160}
          className="absolute right-[2.5vw] top-[34vh] w-[clamp(4rem,6vw,6rem)] h-auto" />
        <Image src="/projects-trinkets/metal_button.webp" alt="" width={120} height={120}
          className="absolute right-[6vw] top-[50vh] w-[clamp(3.5rem,5vw,5rem)] h-auto opacity-80" />
        <Image src="/projects-trinkets/clip.webp" alt="" width={140} height={140}
          className="absolute left-0 bottom-[clamp(8rem,15vh,14rem)] w-[clamp(2.5rem,4vw,4rem)] h-auto" />
        <Image src="/projects-trinkets/star.webp" alt="" width={220} height={220}
          className="absolute left-0 bottom-4 w-[clamp(5rem,10vw,8rem)] h-auto" />
        <Image src="/projects-trinkets/coins.webp" alt="" width={520} height={520}
          className="absolute -right-6 -bottom-6 w-[clamp(12rem,28vw,24rem)] h-auto" />
      </div>

      {/* ─── MENU ─── */}
      <div
        className="absolute left-6 top-6 z-30"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="rounded-sm p-2 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-black/40"
        >
          <Image src={menu} alt="Menu" width={34} height={34} priority />
        </button>
        <div className="absolute left-0 top-full h-4 w-56" aria-hidden="true" />
        <div
          className={[
            "absolute left-0 top-full mt-3 w-56 bg-[#0038de] px-6 py-6",
            "shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
            "transition-all duration-200 ease-out origin-top-left",
            menuOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none",
          ].join(" ")}
        >
          <nav className="flex flex-col gap-5">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-white font-extrabold tracking-wide text-[clamp(1.1rem,2.2vw,1.625rem)] leading-none hover:text-[#c6ff57] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-16 pt-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[clamp(13rem,22vw,16rem)_1fr] md:gap-14">

          {/* Left sidebar */}
          <aside className="text-[#003BFF]">
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-[0.95] tracking-tight">
              PROJECTS
              <br />
              &amp;
              <br />
              FEATURES
            </h1>

            <div className="mt-10 space-y-6">
              <SkillBlock
                label="Full-stack Dev"
                tags={["TypeScript", "Java", "SQL", "React", "FastAPI", "Docker"]}
              />
              <SkillBlock
                label="AI / ML"
                tags={["Python", "PyTorch", "HuggingFace", "LLM Fine-Tuning", "Generative AI"]}
              />
              <SkillBlock
                label="Data Analytics"
                tags={["PowerBI", "Tableau", "Snowflake", "MS Excel"]}
              />
            </div>
          </aside>

          {/* Cards grid */}
          <main className="min-w-0">
            <div className="grid grid-cols-1 gap-[clamp(1rem,2vw,1.75rem)] sm:grid-cols-2">
              {cards.map((c, index) => (
                <Link
                  key={c.id}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative z-20 bg-white shadow-[0_2px_0_rgba(0,0,0,0.18)] ring-1 ring-black/10 block hover:ring-[#0038de]/40 hover:shadow-[0_4px_20px_rgba(0,56,222,0.12)] transition-all duration-200"
                >
                  {/* Image + index */}
                  <div className="relative p-4">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>

                    {/* Index badge */}
                    <span className="absolute left-6 top-6 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-none text-white/60 select-none tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* External link icon — appears on hover */}
                    <span className="absolute right-6 top-6 flex items-center justify-center w-7 h-7 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowUpRight size={14} strokeWidth={2.5} className="text-[#0038de]" />
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[clamp(0.65rem,1vw,0.75rem)] font-extrabold leading-tight">
                        {c.title}{" "}
                        <span className="font-normal">{c.date}</span>
                      </div>
                      {/* Persistent small icon so it's always visible */}
                      <ArrowUpRight
                        size={12}
                        strokeWidth={2.5}
                        className="text-[#0038de]/30 group-hover:text-[#0038de] transition-colors duration-200 shrink-0 ml-2"
                      />
                    </div>
                    <div className="mt-1 text-[clamp(0.6rem,0.9vw,0.6875rem)] italic text-black/75">
                      {c.tags}
                    </div>
                    <div className="mt-2 text-[clamp(0.6rem,0.9vw,0.6875rem)] leading-snug text-black/85">
                      {c.blurb}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>

        </div>
      </div>
    </section>
  );
}