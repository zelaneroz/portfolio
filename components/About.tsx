"use client";
import { motion, useInView} from "framer-motion";
import { useRef } from "react";

import Image from "next/image";

export default function About() {
  const ref = useRef(null);
const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      id="about"
      className="w-full min-h-screen bg-white px-[clamp(1rem,6vw,6rem)] py-[clamp(2rem,6vh,4rem)] flex flex-col lg:flex-row items-start justify-between gap-8"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Left Column: Text * 8C64FF    /}
      {/*<div className="flex flex-col max-w-xl z-10">*/}
      <div className="flex flex-col max-w-[32ch] z-10">
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-[clamp(3rem,8vw,5.625rem)] font-bold text-[#6c00a2] leading-none">
            Z
          </span>
          <span className="text-[clamp(2rem,6vw,5.625rem)] font-sans-serif text-black leading-none">
            z
          </span>
        </div>
        
        <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-6">
          The world is my classroom, and curiosity is the teacher I trust most. Every person, project, and place has taught me something—so I try to build with purpose, empathy, and wonder.
        </p>

        <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-6">
          I study Computer Science and Math at Case Western Reserve, where I work across research, teaching, and tech for social good.
        </p>
        <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black">
          What drives me: real-world impact, a global lens, and stories worth telling.
        </p>
      </div>

      {/* Middle Image */}
      {/*<div className="flex justify-center lg:justify-end w-full max-w-[425px]">*/}
      <div className="flex justify-center lg:justify-center w-full max-w-[clamp(300px,32vw,425px)]">
        <Image
          src="/images/about/zelan-doodle.jpg"
          alt="Zelan"
          width={425}
          height={635}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Column: some favs */}
      <div className="flex flex-col items-start gap-4">
        <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-light">
          some favs
        </p>

        <Image
          src="/images/about/favs.png"
          alt="Favorites"
          width={240}
          height={240}
          className="w-[clamp(160px,18vw,280px)] h-auto object-contain"
        />

      {/* Spotify Embed */}
      <div className="w-full max-w-[clamp(250px,20vw,350px)]">
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/1DNPmQcwc1TwXOYDP99iaV?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
</div>

    </motion.section>
  );
}
