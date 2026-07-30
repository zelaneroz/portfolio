"use client";

import { useState } from "react";
import Image from "next/image";
import menu from "../app/menu.svg";

import {
  experiences,
  type ExperienceCategory,
  type ExperienceItem,
} from "../data/experience";

type Accent = "lime" | "pink" | "blue";

type ExperienceCardProps = {
  item: ExperienceItem;
  accent: Accent;
};

type EducationItem = {
  institution: string;
  startDate: string;
  endDate: string;
  program: string;
  location: string;
  description: string;
  logo?: string;
  initials?: string;
};


const educationItems: EducationItem[] = [
  {
    institution: "Case Western Reserve University",
    startDate: "Aug 2024",
    endDate: "Present",
    program: "B.S. in Computer Science, Minor in Mathematics",
    location: "Cleveland, OH",
    description:
      "Studying computer science with a focus on artificial intelligence, machine learning, software engineering, and applied mathematics.",
    logo: "/logos/cwru.jpeg",
    initials: "C",
  },
  {
    institution: "Nanyang Technological University",
    startDate: "Jan 2026",
    endDate: "May 2026",
    program: "Exchange Program, College of Computing and Data Science",
    location: "Singapore",
    description:
      "Completed coursework in intelligent agents, machine learning, pattern recognition and deep learning, software engineering, and database systems.",
    logo: "/logos/ntu.png",
    initials: "NTU",
  },
  {
    institution: "UWC ISAK Japan",
    startDate: "Aug 2022",
    endDate: "May 2024",
    program: "International Baccalaureate Diploma",
    location: "Karuizawa, Japan",
    description:
      "Attended an international boarding school on a full scholarship, learning alongside students from diverse cultures and backgrounds.",
    logo: "/logos/uwcij.webp",
    initials: "U",
  },
  {
    institution: "Philippine Science High School - Caraga Region Campus",
    startDate: "Aug 2017",
    endDate: "June 2022",
    program: "Physics Core",
    location: "Butuan City, Philippines",
    description:
      "Attended an international boarding school on a full scholarship, learning alongside students from diverse cultures and backgrounds.",
    logo: "/logos/pshscrc.jpeg",
    initials: "U",
  },
];

const accentStyles: Record<
  Accent,
  {
    border: string;
    logo: string;
    tag: string;
  }
> = {
  lime: {
    border: "group-hover:border-[#c6ff57]",
    logo: "bg-[#c6ff57]",
    tag: "bg-[#efffcf]",
  },
  pink: {
    border: "group-hover:border-[#ffb5d0]",
    logo: "bg-[#ffb5d0]",
    tag: "bg-[#ffe7f0]",
  },
  blue: {
    border: "group-hover:border-[#0038de]",
    logo: "bg-[#dce5ff]",
    tag: "bg-[#e8edff]",
  },
};

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
  { label: "THOUGHTS", href: "#thoughts" },
];

function formatExperienceDate(item: ExperienceItem): string {
  if (!item.endDate) {
    return item.startDate;
  }

  return `${item.startDate} – ${item.endDate}`;
}

function getVisibleExperiences(
  category: ExperienceCategory
): ExperienceItem[] {
  return experiences
    .filter(
      (experience) =>
        experience.category === category &&
        experience.show
    )
    .sort(
      (firstExperience, secondExperience) =>
        (firstExperience.order ?? 999) -
        (secondExperience.order ?? 999)
    );
}

function ExperienceCard({
  item,
  accent,
}: ExperienceCardProps) {
  const styles = accentStyles[accent];

  return (
    <article
      className={[
        "group border-b border-black/10 py-8",
        "transition-colors duration-200",
        styles.border,
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div
          className={[
            "relative flex h-10 w-10 shrink-0 items-center justify-center",
            "overflow-hidden rounded-md font-extrabold",
            styles.logo,
          ].join(" ")}
        >
          {item.logo ? (
            <Image
              src={item.logo}
              alt={`${item.org} logo`}
              fill
              sizes="40px"
              className="object-contain p-1.5"
            />
          ) : (
            <span className="text-sm">
              {item.initials ?? item.org.charAt(0)}
            </span>
          )}
        </div>

        {/* Information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <h3 className="text-[20px] font-extrabold leading-tight">
              {item.org}
            </h3>

            <span className="shrink-0 text-[15px] font-medium text-[#6d7586] sm:text-right">
              {formatExperienceDate(item)}
            </span>
          </div>

          <p className="mt-1 text-[17px] leading-snug text-[#596274]">
            {item.role}

            {item.location && (
              <>
                <span aria-hidden="true"> · </span>
                {item.location}
              </>
            )}
          </p>

          <p className="mt-3 max-w-[62ch] text-[14px] leading-6 text-[#8a909c] md:text-[15px]">
            {item.description}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={[
                    "rounded px-2.5 py-1 text-[13px] font-semibold",
                    "text-[#303746]",
                    styles.tag,
                  ].join(" ")}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <article className="group border-b border-black/15 py-6 transition-colors duration-200 hover:border-[#ffb5d0]">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden font-extrabold">
          {item.logo ? (
            <Image
              src={item.logo}
              alt={`${item.institution} logo`}
              fill
              sizes="40px"
              className="object-contain p-1.5"
            />
          ) : (
            <span className="text-xs">
              {item.initials ?? item.institution.charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Institution and dates */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <h3 className="text-[20px] font-extrabold leading-tight">
              {item.institution}
            </h3>

            <span className="shrink-0 text-[15px] font-medium text-[#6d7586] sm:text-right">
              {item.startDate} – {item.endDate}
            </span>
          </div>

          {/* Program and location */}
          <p className="mt-1 text-[17px] leading-snug text-[#596274]">
            {item.program}
            <span aria-hidden="true"> · </span>
            {item.location}
          </p>

          {/* Description */}
          <p className="mt-3 max-w-[62ch] text-[14px] leading-6 text-[#8a909c] md:text-[15px]">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function NewWork() {
  const [menuOpen, setMenuOpen] = useState(false);

  const technicalItems =
    getVisibleExperiences("technical");

  const researchItems =
    getVisibleExperiences("research");

  const communityItems =
    getVisibleExperiences("community");

  return (
    <section
      id="work"
      className="relative w-full bg-white text-black"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-12">
        {/* Header */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-[clamp(42px,6vw,78px)] font-extrabold leading-[0.95] tracking-tight">
              EXPERIENCE
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#8a909c] md:text-[16px]">
              Building intelligent systems, studying how they
              behave, and creating communities where more people
              can participate.
            </p>
          </div>

          {/* Navigation menu */}
          <div
            className="relative mt-2"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen((currentValue) => !currentValue)
              }
              className="rounded-sm p-2 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-black/40"
            >
              <Image
                src={menu}
                alt=""
                width={34}
                height={34}
                priority
              />
            </button>

            <div
              className="absolute right-0 top-full h-4 w-64"
              aria-hidden="true"
            />

            <div
              className={[
                "absolute right-0 top-full z-20 mt-3 w-56",
                "bg-[#0038de] px-6 py-6",
                "shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
                "origin-top-right transition-all duration-200",
                menuOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
              ].join(" ")}
            >
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[26px] font-extrabold leading-none tracking-wide text-white hover:text-[#c6ff57]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Technical Experience */}
        <section
          aria-labelledby="technical-heading"
          className="mt-20"
        >
          <div className="flex items-center gap-3 border-b-2 border-black pb-4">
            <span
              className="h-4 w-4 bg-[#c6ff57]"
              aria-hidden="true"
            />

            <h2
              id="technical-heading"
              className="text-[14px] font-extrabold uppercase tracking-[0.18em] text-[#596170]"
            >
              Technical Experience
            </h2>
          </div>

          <div className="grid gap-x-16 lg:grid-cols-2">
            {technicalItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                accent="lime"
              />
            ))}
          </div>
        </section>

        {/* Research */}
        <section
          aria-labelledby="research-heading"
          className="mt-24"
        >
          <div className="flex items-center gap-3 border-b-2 border-black pb-4">
            <span
              className="h-4 w-4 bg-[#0038de]"
              aria-hidden="true"
            />

            <h2
              id="research-heading"
              className="text-[14px] font-extrabold uppercase tracking-[0.18em] text-[#596170]"
            >
              Research
            </h2>
          </div>

          <div className="grid gap-x-16 lg:grid-cols-2">
            {researchItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                accent="blue"
              />
            ))}
          </div>
        </section>

        {/* Education */}
        <section
          aria-labelledby="education-heading"
          className="mt-24"
        >
          <div className="border-b-2 border-black pb-4">
            <h2
              id="education-heading"
              className="text-[14px] font-extrabold uppercase tracking-[0.18em] text-[#596170]"
            >
              Education
            </h2>
          </div>

          <div className="grid gap-x-16 lg:grid-cols-2">
            {educationItems.map((item) => (
              <EducationCard
                key={`${item.institution}-${item.program}`}
                item={item}
              />
            ))}
          </div>
        </section>

        {/* Community & Leadership */}
        <section
          aria-labelledby="community-heading"
          className="mt-24"
        >
          <div className="flex items-center gap-3 border-b-2 border-black pb-4">
            <span
              className="h-4 w-4 bg-[#ffb5d0]"
              aria-hidden="true"
            />

            <h2
              id="community-heading"
              className="text-[14px] font-extrabold uppercase tracking-[0.18em] text-[#596170]"
            >
              Community &amp; Leadership
            </h2>
          </div>

          <div className="grid gap-x-16 lg:grid-cols-2">
            {communityItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                accent="pink"
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}