"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import menu from "../app/menu.svg"

type Tab = "computing" | "ev";

type WorkItem = {
  id: string;
  org: string;
  role: string;
  date: string;
};

export default function NewWork() {
  const [activeTab, setActiveTab] = useState<Tab>("computing");

  const computingItems: WorkItem[] = useMemo(
  () => [
    { id: "algoverse", org: "ALGOVERSE", role: "Independent Researcher", date: "FEB ‘26 -" },
    { id: "kpmg", org: "KPMG", role: "AI Fellow", date: "AUG ‘25 to DEC ‘25" },
    { id: "biswas", org: "Biswas Lab", role: "Research Assistant (IPV Detection - LLMs)", date: "AUG ‘25 to DEC ‘25" },
    { id: "cwru-ta", org: "Department of Computer Science at CWRU", role: "Teaching Assistant (Intro to Data Structures)", date: "JAN ‘25 to DEC ‘25" },
  ],
  []
);

const evItems: WorkItem[] = useMemo(
  () => [
    { id: "other-1", org: "United World College (UWC) Philippinces National Committe", role: "Finance Team Member", date: "AUG ‘25 -" },
    { id: "other-2", org: "Center for Career Success at CWRU", role: "Career Consulting Intern", date: "NOV ‘24 -" },
    { id: "other-3", org: "Cleveland Public Market Corporation (West Side Market)", role: "Business Strategy Consulting (xLab)", date: "AUG ‘25 to DEC ‘25" },
    { id: "other-4", org: "Fowler Center, Weatheheard School of Management", role: "ThinkImpact Fellow (Iceland)", date: "AUG ‘24 to MAY ‘25" },
  ],
  []
);

  const items = activeTab === "computing" ? computingItems : evItems;

  // Color system
  const blockBg =
    activeTab === "computing" ? "bg-[#c6ff57]" : "bg-[#ffb5d0]";
  const hoverComputing = "hover:text-[#c6ff57]";
  const hoverEV = "hover:text-[#ffb5d0]";

  const [menuOpen, setMenuOpen] = useState(false);

const navLinks = useMemo(
  () => [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
    { label: "MUSINGS", href: "#musings" },
  ],
  []
);

  return (
    <section className="relative h-screen w-full bg-white text-black overflow-hidden">
  <div className="mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_1fr_auto] px-6 py-6 md:px-10 md:py-8">
        {/* Top row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[clamp(36px,5vw,72px)] leading-[0.95] font-extrabold tracking-tight md:text-[72px]">
              EXPERIENCE
            </h1>
            {/* Category line */}
            <div className="mt-3 text-[18px] md:text-[20px] font-semibold flex items-center gap-2">
            
            {/* Computing */}
            <button
                type="button"
                onClick={() => setActiveTab("computing")}
                className="relative px-4 py-1 text-black overflow-hidden group"
            >
                {/* highlight layer */}
                <span
                className={[
                    "absolute inset-0 origin-left transition-transform duration-300 ease-out",
                    activeTab === "computing"
                    ? "scale-x-100 bg-[#c6ff57]"
                    : "scale-x-0 bg-[#c6ff57] group-hover:scale-x-100",
                ].join(" ")}
                />
                <span className="relative z-10">Computing</span>
            </button>

            <span className="mx-1 text-black">·</span>

            {/* Other */}
            <button
                type="button"
                onClick={() => setActiveTab("ev")}
                className="relative px-4 py-1 text-black overflow-hidden group"
            >
                <span
                className={[
                    "absolute inset-0 origin-left transition-transform duration-300 ease-out",
                    activeTab === "ev"
                    ? "scale-x-100 bg-[#ffb5d0]"
                    : "scale-x-0 bg-[#ffb5d0] group-hover:scale-x-100",
                ].join(" ")}
                />
                <span className="relative z-10">Other</span>
            </button>
            </div>
          </div>

          {/* Menu icon */}
          {/* <button
            type="button"
            aria-label="Open menu"
            className="mt-2 rounded-sm p-2 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-black/40"
          >
            <Image src={menu} alt="Menu" width={34} height={34} priority />
          </button> */}
            {/* Menu (hover OR click) */}
{/* Menu (hover OR click) */}
        <div
        className="relative mt-2"
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

        {/* Hover bridge: prevents the "dead zone" gap */}
        <div className="absolute right-0 top-full h-4 w-64" aria-hidden="true" />

        {/* Dropdown */}
        <div
            className={[
            "absolute right-0 top-full mt-3 w-56 bg-[#0038de] px-6 py-6",
            "shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
            "transition-all duration-200 ease-out origin-top-right",
            menuOpen
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none",
            ].join(" ")}
        >
            <nav className="flex flex-col gap-5">
            {navLinks.map((l) => (
                <a
                key={l.label}
                href={l.href}
                className="text-white font-extrabold tracking-wide text-[26px] leading-none hover:text-[#c6ff57]"
                onClick={() => setMenuOpen(false)}
                >
                {l.label}
                </a>
            ))}
            </nav>
        </div>
        </div>

        </div>

        {/* List */}
        {/* <div className="mt-8 flex flex-1 flex-col justify-between"> */}
        {/* <div className="mt-6 grid flex-1 grid-rows-4 gap-5"> */}
        {/* List */}
        {/* List */}
        <div className="mt-5 max-h-[68vh] md:max-h-[64vh] min-h-0">
        <div className="grid h-full min-h-0 grid-rows-4 gap-4 md:gap-5">
            {items.map((it) => (
            <div
                key={it.id}
                className={[
                blockBg,
                "w-full h-full overflow-hidden", // critical: stable size, no spill
                "px-6 py-4 md:px-8 md:py-5",
                ].join(" ")}
            >
                <div className="flex h-full min-h-0 flex-col md:flex-row md:items-start md:justify-between">
                {/* Left */}
                <div className="min-w-0 min-h-0">
                    <div className="text-[clamp(16px,1.8vw,22px)] font-extrabold leading-tight">
                    {it.org}
                    </div>

                    {/* Role: clamp so it can't expand the card */}
                    <div className="mt-1 text-[clamp(14px,1.6vw,18px)] leading-snug overflow-hidden">
                    <span className="block md:truncate">
                        {it.role}
                    </span>
                    {/* On smaller screens, allow up to 2 lines then clip */}
                    <span className="hidden max-md:block [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                        {it.role}
                    </span>
                    </div>
                </div>

                {/* Right date */}
                <div className="mt-2 shrink-0 text-[clamp(14px,1.6vw,18px)] leading-snug md:mt-0 md:text-right">
                    {it.date}
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* Bottom breathing space */}
        <div className="h-10 md:h-12" />
        </div>
    </section>
  );
}
