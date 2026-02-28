"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { type Post } from "./ThoughtsItems";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColor: Record<string, string> = {
  Travel:    "bg-[#0038de] text-[#fff5f2]",
  Tech:      "bg-[#FFEB00] text-[#0038de]",
  Reads:     "bg-[#ffb5d0] text-[#0038de]",
  Favorites: "bg-[#c6ff57] text-[#0038de]",
  Politics:  "bg-[#0038de]/10 text-[#0038de]",
  Personal:  "bg-[#fff5f2] text-[#0038de] ring-1 ring-[#0038de]/20",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ThoughtsPage({ post }: { post: Post }) {
  return (
    <div className="relative min-h-screen bg-[#fff5f2]">

      {/* Dot texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#0038de 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Top nav bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky top-0 z-20 bg-[#fff5f2]/90 backdrop-blur-sm border-b border-[#0038de]/10 px-[clamp(1rem,6vw,6rem)] py-4 flex items-center justify-between"
      >
        <Link
          href="/thoughts"
          className="group flex items-center gap-2 text-[11px] font-extrabold tracking-widest uppercase text-[#0038de]/50 hover:text-[#0038de] transition-colors duration-150"
        >
          <motion.span
            className="inline-block"
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ArrowLeft size={14} strokeWidth={3} />
          </motion.span>
          Back to Thoughts
        </Link>

        {/* Category badge */}
        <span
          className={`px-2 py-[3px] text-[10px] font-extrabold tracking-widest uppercase ${
            categoryColor[post.category] ?? "bg-[#0038de] text-white"
          }`}
        >
          {post.category}
        </span>
      </motion.div>

      {/* ── Content ── */}
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="relative z-10 mx-auto max-w-2xl px-6 py-12 md:py-16"
      >

        {/* Featured image */}
        <div className="w-full aspect-[16/9] overflow-hidden mb-10 bg-gradient-to-br from-[#0038de]/10 to-[#ffb5d0]/30 relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Fallback initial */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <span className="text-[#0038de]/10 font-extrabold text-[12rem] leading-none select-none">
              {post.title[0]}
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="mb-10">
          <h1 className="font-extrabold tracking-tight leading-[1.0] text-[#0038de] text-[clamp(2rem,5vw,3.25rem)] mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-[12px] text-[#0038de]/45">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={2.5} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} strokeWidth={2.5} />
              {post.readingTime} read
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-[3px] text-[10px] font-bold tracking-wide border border-[#0038de]/20 text-[#0038de]/50 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-8 flex gap-2">
            <div className="h-[2px] w-12 bg-[#0038de]" />
            <div className="h-[2px] w-6 bg-[#FFEB00]" />
            <div className="h-[2px] w-3 bg-[#ffb5d0]" />
          </div>
        </header>

        {/* Body — Markdown */}
        <article className="prose-thoughts">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-[#0038de]/75 text-base sm:text-[17px] leading-[1.75] mb-5 last:mb-0">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-extrabold text-[#0038de]">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-[#0038de]/80">{children}</em>
              ),
              h2: ({ children }) => (
                <h2 className="font-extrabold tracking-tight text-[#0038de] text-xl sm:text-2xl mt-10 mb-4 leading-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-extrabold text-[#0038de] text-lg mt-8 mb-3 leading-tight">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-5 pl-5 list-none">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="text-[#0038de]/75 text-base sm:text-[17px] leading-[1.75] before:content-['—'] before:mr-3 before:text-[#0038de]/30 before:font-bold">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-[3px] border-[#0038de] pl-5 my-6 text-[#0038de]/60 italic">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0038de] underline underline-offset-2 hover:text-[#c6ff57] transition-colors"
                >
                  {children}
                </a>
              ),
              hr: () => (
                <div className="my-8 flex gap-2">
                  <div className="h-[2px] w-8 bg-[#0038de]/20" />
                </div>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[#0038de]/10 flex items-center justify-between">
          <Link
            href="/thoughts"
            className="group flex items-center gap-2 text-[11px] font-extrabold tracking-widest uppercase text-[#0038de]/40 hover:text-[#0038de] transition-colors"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowLeft size={13} strokeWidth={3} />
            </motion.span>
            Back to Thoughts
          </Link>

          <div className="flex gap-2">
            <div className="h-1 w-8 bg-[#0038de]" />
            <div className="h-1 w-4 bg-[#FFEB00]" />
            <div className="h-1 w-2 bg-[#ffb5d0]" />
          </div>
        </div>

      </motion.main>
    </div>
  );
}