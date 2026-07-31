"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import menu from "../app/menu.svg";

import {
  experiences,
  type ExperienceCategory,
  type ExperienceItem,
} from "../data/experience";

type Accent = "lime" | "pink" | "blue";
type PanelId = "technical" | "research" | "community" | null;

type ExperienceCardProps = {
  item: ExperienceItem;
  accent: Accent;
};

const accentStyles: Record<
  Accent,
  {
    border: string;
    logo: string;
    tag: string;
    dot: string;
    text: string;
    glow: string;
  }
> = {
  lime: {
    border: "group-hover/card:border-[#c6ff57]",
    logo: "bg-[#c6ff57]",
    tag: "bg-[#efffcf]",
    dot: "bg-[#c6ff57]",
    text: "text-[#8cc900]",
    glow: "hover:shadow-[0_18px_70px_rgba(198,255,87,0.22)]",
  },
  pink: {
    border: "group-hover/card:border-[#ffb5d0]",
    logo: "bg-[#ffb5d0]",
    tag: "bg-[#ffe7f0]",
    dot: "bg-[#ffb5d0]",
    text: "text-[#d655c2]",
    glow: "hover:shadow-[0_18px_70px_rgba(214,85,194,0.18)]",
  },
  blue: {
    border: "group-hover/card:border-[#0038de]",
    logo: "bg-[#dce5ff]",
    tag: "bg-[#e8edff]",
    dot: "bg-[#0038de]",
    text: "text-[#0038de]",
    glow: "hover:shadow-[0_18px_70px_rgba(0,56,222,0.16)]",
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
        experience.category === category && experience.show
    )
    .sort(
      (firstExperience, secondExperience) =>
        (firstExperience.order ?? 999) -
        (secondExperience.order ?? 999)
    );
}

function ExperiencePanel({
  id,
  title,
  accent,
  activePanel,
  setActivePanel,
  children,
}: {
  id: Exclude<PanelId, null>;
  title: string;
  accent: Accent;
  activePanel: PanelId;
  setActivePanel: (id: PanelId) => void;
  children: ReactNode;
}) {
  const isActive = activePanel === id;
  const styles = accentStyles[accent];

  return (
    <section
      onMouseEnter={() => setActivePanel(id)}
      onMouseLeave={() => setActivePanel(null)}
      className={[
        "group/panel overflow-hidden border-b border-black/15",
        "transition-all duration-500 ease-out",
        isActive ? "py-8" : "py-5",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setActivePanel(isActive ? null : id)}
        onFocus={() => setActivePanel(id)}
        className="flex w-full items-center justify-between gap-6 text-left"
        aria-expanded={isActive}
      >
        <div className="flex items-center gap-4">
          <span
            className={[
              "h-3 w-3 shrink-0 rounded-full transition-transform duration-500",
              styles.dot,
              isActive ? "scale-125" : "scale-100",
            ].join(" ")}
            aria-hidden="true"
          />

          <h2
            className={[
              "font-normal italic leading-[0.85] tracking-[-0.075em]",
              "text-[clamp(30px,5vw,64px)]",,
              "transition-all duration-500 ease-out",
              isActive ? styles.text : "text-black",
            ].join(" ")}
            style={{
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            {title}
          </h2>
        </div>

        <span
          className={[
            "shrink-0 text-[24px] leading-none transition-transform duration-500",
            isActive ? "rotate-45 opacity-100" : "rotate-0 opacity-40",
          ].join(" ")}
        >
          +
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-700 ease-out",
          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div
            className={[
              "pt-6 transition-all duration-700 ease-out",
              isActive
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0",
            ].join(" ")}
          >
            <div
              className={[
                "rounded-2xl border border-black/10 bg-white/80 p-5",
                "transition-shadow duration-500",
                styles.glow,
              ].join(" ")}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ item, accent }: ExperienceCardProps) {
  const styles = accentStyles[accent];

  return (
    <article
      className={[
        "group/card border-b border-black/10 py-4 last:border-b-0",
        "transition-colors duration-200",
        styles.border,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "relative flex h-8 w-8 shrink-0 items-center justify-center",
            "overflow-hidden rounded-sm font-bold",
            styles.logo,
          ].join(" ")}
        >
          {item.logo ? (
            <Image
              src={item.logo}
              alt={`${item.org} logo`}
              fill
              sizes="32px"
              className="object-contain p-1"
            />
          ) : (
            <span className="text-[10px]">
              {item.initials ?? item.org.charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <h3 className="text-[15px] font-bold leading-tight text-black">
              {item.org}
            </h3>

            <span className="shrink-0 text-[11px] font-medium leading-tight text-[#6d7586] sm:text-right">
              {formatExperienceDate(item)}
            </span>
          </div>

          <p className="mt-1 text-[12px] leading-snug text-[#596274]">
            {item.role}

            {item.location && (
              <>
                <span aria-hidden="true"> · </span>
                {item.location}
              </>
            )}
          </p>

          <p className="mt-2 max-w-[90ch] text-[12px] leading-[1.45] text-[#8a909c]">
            {item.description}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={[
                    "rounded px-2 py-0.5 text-[10px] font-semibold",
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

export default function NewWork() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId>(null);

  const technicalItems = getVisibleExperiences("technical");
  const researchItems = getVisibleExperiences("research");
  const communityItems = getVisibleExperiences("community");

  return (
    <section
      id="work"
      className="relative w-full bg-white text-black"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20 lg:px-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1
              className="text-[clamp(54px,9vw,125px)] font-normal italic leading-[0.82] tracking-[-0.075em] text-[#d655c2]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
              }}
            >
              Experience
            </h1>

            <p className="mt-4 max-w-xl text-[13px] leading-[1.55] text-[#8a909c] md:text-[14px]">
              Building intelligent systems, researching how to make LLMs more aligned,
              and creating communities where more people can participate.
            </p>
          </div>

          {/* Navigation menu */}
          <div
            className="relative mt-2 shrink-0"
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

        {/* Stacked hover panels */}
        <div className="mt-14 border-t border-black/15">
          <ExperiencePanel
            id="technical"
            title="Technical"
            accent="lime"
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          >
            {technicalItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                accent="lime"
              />
            ))}
          </ExperiencePanel>

          <ExperiencePanel
            id="research"
            title="Research"
            accent="blue"
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          >
            {researchItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                accent="blue"
              />
            ))}
          </ExperiencePanel>

          <ExperiencePanel
            id="community"
            title="Community & Leadership"
            accent="pink"
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          >
            {communityItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                accent="pink"
              />
            ))}
          </ExperiencePanel>
        </div>
      </div>
    </section>
  );
}