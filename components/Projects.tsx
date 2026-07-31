"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projectCards } from "../data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-[#ffed00] px-6 py-20 text-[#0038de] md:px-12 lg:px-20"
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div className="mb-16">
        <h1
          className="text-[clamp(58px,9vw,130px)] font-normal italic leading-[0.82] tracking-[-0.075em] text-[#0038de]"
          style={{
            fontFamily: '"Times New Roman", Times, serif',
          }}
        >
          Projects &amp; Features
        </h1>
      </div>

      {/* Scattered project layout */}
      <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 lg:gap-x-28 lg:gap-y-28">
        {projectCards.map((project) => (
          <ProjectTile
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectTile({
  project,
}: {
  project: {
    id: string;
    title: string;
    date: string;
    tags: string;
    blurb: string;
    image: string;
    link: string;
  };
}) {
  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-opacity duration-300 hover:opacity-80"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Text */}
      <div className="mt-4">
        <div className="flex items-start gap-2">
          <h2
            className="text-[16px] font-normal strong leading-[0.9] tracking-[-0.06em] text-[#0038de] md:text-[20px]"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            {project.title}
          </h2>

          <ArrowUpRight
            size={18}
            strokeWidth={2.2}
            className="mt-1 shrink-0 text-[#0038de] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <p className="mt-2 text-[13px] leading-snug tracking-[-0.02em] text-[#0038de]">
          {project.blurb}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.split(",").map((tag) => (
            <span
              key={tag.trim()}
              className="border border-white bg-transparent px-2 py-0.5 text-[11px] font-medium leading-none text-[#0038de]"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}