"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, X, ArrowRight } from "lucide-react";
import { posts, type Post } from "./ThoughtsItems";
import menu from "../app/blue_menu.svg";

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTER_TAGS = ["Travel", "Reads", "Tech", "Personal", "Society, Policy, & Economics"];

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/#work" },
  { label: "PROJECTS", href: "/#project" },
  { label: "CONTACT", href: "/#contact" },
];

const categoryColor: Record<string, string> = {
  Travel:    "bg-[#0038de] text-[#fff5f2]",
  Tech:      "bg-[#FFEB00] text-[#0038de]",
  Reads:     "bg-[#ffb5d0] text-[#0038de]",
  // Favorites: "bg-[#c6ff57] text-[#0038de]",
  Politics:  "bg-[#0038de]/10 text-[#0038de]",
  Personal:  "bg-[#fff5f2] text-[#0038de] ring-1 ring-[#0038de]/20",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
      className="group bg-white ring-1 ring-black/8 shadow-[0_2px_0_rgba(0,0,0,0.10)] flex flex-col overflow-hidden"
    >
      {/* Image */}
      <Link href={`/thoughts/${post.id}`} className="block relative aspect-square overflow-hidden bg-[#0038de]/5">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0038de]/10 to-[#ffb5d0]/30 flex items-center justify-center">
          <span className="text-[#0038de]/20 font-extrabold text-6xl select-none">
            {String(post.title[0])}
          </span>
        </div>
        <span
          className={`absolute top-3 left-3 px-2 py-[3px] text-[10px] font-extrabold tracking-widest uppercase ${
            categoryColor[post.category] ?? "bg-[#0038de] text-white"
          }`}
        >
          {post.category}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-4 text-[11px] text-[#0038de]/50 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={11} strokeWidth={2.5} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} strokeWidth={2.5} />
            {post.readingTime} read
          </span>
        </div>

        <Link href={`/thoughts/${post.id}`}>
          <h3 className="font-extrabold tracking-tight leading-[1.1] text-[#0038de] text-[clamp(0.95rem,1.4vw,1.1rem)] mb-3 hover:opacity-70 transition-opacity">
            {post.title}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-[2px] text-[10px] font-bold tracking-wide border border-[#0038de]/20 text-[#0038de]/60 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/thoughts/${post.id}`}
          className="mt-auto pt-4 flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest uppercase text-[#0038de]/40 hover:text-[#0038de] transition-colors group/link"
        >
          Read more
          <motion.span
            className="inline-block"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ArrowRight size={11} strokeWidth={3} />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Thoughts() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (!activeFilter) return sorted;
    return sorted.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="thoughts"
      className="relative w-full bg-[#fff5f2] px-[clamp(1rem,6vw,6rem)] py-[clamp(2rem,6vh,4rem)] overflow-x-hidden"
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#0038de 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* ── Menu ── */}
        <div
          className="relative mb-8 inline-block"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-sm p-2 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#0038de]/40"
          >
            <Image src={menu} alt="Menu" width={34} height={34} priority />
          </button>

          {/* Hover bridge */}
          <div className="absolute left-0 top-full h-4 w-56" aria-hidden="true" />

          {/* Dropdown */}
          <div
            className={[
              "absolute left-0 top-full mt-3 w-56 bg-[#0038de] px-6 py-6 z-30",
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

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <h2 className="font-extrabold tracking-tight leading-[0.9] text-[#0038de] text-[clamp(3rem,8vw,5.625rem)]">
            THOUGHTS
          </h2>
          <p className="mt-3 text-[#0038de]/60 text-base sm:text-lg font-light max-w-lg">
            Words, notes, and things I keep returning to.
          </p>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveFilter(null)}
            className={`flex items-center gap-1.5 px-3 py-[6px] text-[11px] font-extrabold tracking-widest uppercase border transition-all duration-150 ${
              activeFilter === null
                ? "bg-[#0038de] text-[#FFEB00] border-[#0038de]"
                : "bg-transparent text-[#0038de]/50 border-[#0038de]/20 hover:border-[#0038de] hover:text-[#0038de]"
            }`}
          >
            {activeFilter && <X size={10} strokeWidth={3} />}
            All
          </button>

          {FILTER_TAGS.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`px-3 py-[6px] text-[11px] font-extrabold tracking-widest uppercase border transition-all duration-150 ${
                activeFilter === tag
                  ? "bg-[#0038de] text-[#FFEB00] border-[#0038de]"
                  : "bg-transparent text-[#0038de]/50 border-[#0038de]/20 hover:border-[#0038de] hover:text-[#0038de]"
              }`}
            >
              {tag}
            </motion.button>
          ))}

          <span className="ml-auto text-[11px] text-[#0038de]/35 font-bold tracking-wide">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          </span>
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center text-[#0038de]/30 font-extrabold tracking-widest uppercase text-sm"
            >
              No posts match this filter yet.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent */}
        <div className="mt-12 flex gap-2">
          <div className="h-1 w-12 bg-[#0038de]" />
          <div className="h-1 w-6 bg-[#FFEB00]" />
          <div className="h-1 w-3 bg-[#ffb5d0]" />
        </div>

      </div>
    </section>
  );
}