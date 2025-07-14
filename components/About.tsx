// components/About.tsx
"use client"
import { motion } from "framer-motion";
import IntGlobe from "@/components/IntGlobe";

export default function About() {
  return (
    <section id="about" className="w-full bg-[#1a1a1a] text-white px-[clamp(1rem,6vw,6rem)] py-[clamp(4rem,10vh,6rem)]">
      <motion.h2
        className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-accent-400 mb-10 leading-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        ABOUT ME<span className="text-accent-400">/</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        {/* Left Column */}
        <motion.div
          className="md:col-span-5 flex flex-col gap-4"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="uppercase text-[#c0c0c0] text-[0.875rem] font-medium tracking-widest">
            (01)
          </span>
          <p className="text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-[#e0e0e0] max-w-[40ch]">
            The world is my classroom, and curiosity is the teacher I trust most...
          </p>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="md:col-span-6 md:col-start-7"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Placeholder for animation object */}
          <div className="w-full h-[clamp(200px,30vw,400px)] bg-[#e5e5e5] rounded-md flex items-center justify-center text-black text-center font-medium">
           <IntGlobe/>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
