"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SquareArrowLeftIcon } from "./icons/square-arrow-left";

import { favTrinkets, type FavTrinket } from "../data/favs";
import { brainPostTypes } from "../data/blog-config";
import type { BrainPost } from "../lib/brain-posts";

export default function Brain({ posts = [] }: { posts?: BrainPost[] }) {
  const [selected, setSelected] = useState<FavTrinket | null>(null);
  const [selectedPost, setSelectedPost] = useState<BrainPost | null>(null);

  return (
    <main
      className="relative overflow-hidden text-black"
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
        backgroundColor: "#f8f6f1",
        backgroundImage:
          "linear-gradient(rgba(96, 185, 224, 0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 185, 224, 0.28) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    >
      {/* Back button */}
      <Link
        href="/"
        aria-label="Back to main page"
        className="fixed left-6 top-6 z-40 text-black transition-transform duration-300 hover:-translate-x-1 hover:opacity-70"
      >
        <SquareArrowLeftIcon className="h-9 w-9" />
      </Link>

      {/* Intro + trinkets + photo */}
      <section className="relative z-10 mx-auto max-w-6xl px-8 pb-16 pt-12 md:px-12 md:pt-14">
        {/* Intro row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="max-w-[380px]">
            <p className="font-mono text-[12px] uppercase leading-7 tracking-[0.08em]">
              A digitized collection of favorites and core memories. Click on
              each trinket!
            </p>
          </div>

          <div className="md:justify-self-end">
            <h1 className="text-left text-[clamp(32px,5vw,54px)] font-light leading-none tracking-[-0.08em] md:text-right">
              welcome to my
              <br />
              <span className="font-black italic tracking-[-0.09em]">
                brain
              </span>{" "}
              🧠
            </h1>
          </div>
        </div>

        {/* Trinkets + photo row */}
        <div className="mt-5 grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_370px] md:gap-8">
          {/* Trinkets */}
          <div
            aria-label="Brain trinkets"
            className="grid grid-cols-3 gap-x-8 gap-y-12 sm:grid-cols-4"
          >
            {favTrinkets.map((trinket, index) => {
              const scatterClasses = [
                "justify-self-start rotate-[-8deg]",
                "justify-self-center translate-y-5 rotate-[5deg]",
                "justify-self-end -translate-y-2 rotate-[-3deg]",
                "justify-self-center translate-y-8 rotate-[7deg]",
                "justify-self-start -translate-y-3 rotate-[4deg]",
                "justify-self-end translate-y-4 rotate-[-6deg]",
                "justify-self-center rotate-[9deg]",
                "justify-self-start translate-y-6 rotate-[-4deg]",
              ];

              return (
                <button
                  key={trinket.id}
                  type="button"
                  onClick={() => setSelected(trinket)}
                  className={[
                    "group flex aspect-square min-h-[88px] items-center justify-center",
                    "cursor-pointer transition duration-300 ease-out",
                    "hover:-translate-y-2 hover:rotate-3 hover:scale-105",
                    "focus:outline-none focus:ring-2 focus:ring-black/40",
                    scatterClasses[index % scatterClasses.length],
                  ].join(" ")}
                  aria-label={`Open ${trinket.name}`}
                >
                  <Image
                    src={trinket.image}
                    alt={trinket.name}
                    width={trinket.size}
                    height={trinket.size}
                    className="h-auto max-h-[78px] w-auto max-w-[78px] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)] md:max-h-[96px] md:max-w-[96px]"
                  />
                </button>
              );
            })}
          </div>

          {/* Photo */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[370px] overflow-hidden md:mx-0 md:justify-self-end">
            <Image
              src="/images/zee_at_met.jpg"
              alt="Zelan looking up at the camera"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 370px"
              className="object-cover"
            />
          </div>
        </div>

        <p className="mt-10 max-w-[430px] font-mono text-[12px] uppercase leading-7 tracking-[0.08em]">
          Recommend me some of your fav media!
        </p>
      </section>

      {/* Blog section */}
      <section className="relative z-10 bg-[#ff5ad4] px-8 py-14 md:px-12">
        {/* Blog header */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
          <div className="max-w-[420px]">
            <p className="font-mono text-[11px] uppercase leading-6 tracking-[0.08em]">
              Thoughts, build logs, taste files, and things taking up space in
              my brain.
            </p>
          </div>

          <div className="mt-8 justify-self-start md:mt-0 md:justify-self-end md:pr-24">
            <h2
              className="text-[clamp(58px,8vw,120px)] font-black italic leading-none tracking-[-0.09em] text-black"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
              }}
            >
              blog
            </h2>
          </div>
        </div>

        {/* Blog posts */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => setSelectedPost(post)}
                className="group border border-black bg-transparent p-4 text-left transition-transform duration-300 hover:-translate-y-1 hover:bg-black hover:text-[#ff5ad4]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
                    {brainPostTypes[post.type]?.label}
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
                    {post.date}
                  </span>
                </div>

                <h3
                  className="text-[28px] font-black italic leading-[0.9] tracking-[-0.08em]"
                  style={{
                    fontFamily: '"Times New Roman", Times, serif',
                  }}
                >
                  {post.title}
                </h3>

                <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.07em]">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(post.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="border border-current px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))
          ) : (
            <p className="font-mono text-[11px] uppercase leading-6 tracking-[0.08em]">
              No blog posts yet.
            </p>
          )}
        </div>
      </section>

      {/* Trinket modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-sm border border-black bg-[#f8f6f1] p-6 text-black shadow-[10px_10px_0_#0038de]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-6">
              <h2 className="text-[28px] font-black italic tracking-[-0.08em]">
                {selected.name}
              </h2>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="font-mono text-[12px] uppercase hover:opacity-60"
              >
                close
              </button>
            </div>

            <Image
              src={selected.image}
              alt={selected.name}
              width={120}
              height={120}
              className="mb-5 h-auto w-[90px]"
            />

            <p className="font-mono text-[12px] uppercase leading-6 tracking-[0.06em]">
              {selected.note}
            </p>
          </div>
        </div>
      )}

      {/* Blog modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
        >
          <article
            className="max-h-[82vh] w-full max-w-3xl overflow-y-auto border border-black bg-[#f8f6f1] p-6 text-black shadow-[10px_10px_0_#ff5ad4] md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em]">
                  {selectedPost.date} ·{" "}
                  {brainPostTypes[selectedPost.type]?.label}
                </p>

                <h1
                  className="mt-3 text-[clamp(42px,7vw,78px)] font-black italic leading-[0.82] tracking-[-0.09em]"
                  style={{
                    fontFamily: '"Times New Roman", Times, serif',
                  }}
                >
                  {selectedPost.title}
                </h1>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="font-mono text-[11px] uppercase tracking-[0.1em] hover:opacity-60"
              >
                close
              </button>
            </div>

            <div
              className="brain-post-content text-[15px] leading-8 tracking-[-0.015em]"
              dangerouslySetInnerHTML={{
                __html: selectedPost.contentHtml,
              }}
            />
          </article>
        </div>
      )}
    </main>
  );
}