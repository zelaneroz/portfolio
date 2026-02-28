import React from "react";
import { motion } from "framer-motion";
import { items } from "./fieldnotesItems";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./ui/draggable-card";

export function FieldNotes() {
  return (
    <main
      id="field-notes"
      className="relative w-full bg-[#fff5f2] px-[clamp(1rem,6vw,6rem)] py-[clamp(2rem,6vh,4rem)] overflow-x-hidden flex flex-col"
    >
      {/* Subtle dot-grid texture — same depth language as the other pages */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#0038de 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-extrabold tracking-tight leading-[0.9] text-[#0038de] text-[clamp(3rem,8vw,5.625rem)]"
        >
          FIELD
          <br />
          NOTES
        </motion.h2>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-base sm:text-lg font-light text-[#0038de]/70 max-w-xl"
        >
          Some treasured moments — algorithm randomly picks 5 photos each time. 
          Words, favorites, stories, and more on {" "}
          <a
            href="https://substack.com/@zelaneroz?utm_campaign=profile&utm_medium=profile-page"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block font-extrabold text-[#0038de] hover:text-[#c6ff57] transition-colors duration-200"
            style={{ WebkitTextStroke: "0px" }}
          >
            Thoughts
            {/* animated underline — same pattern as nav links */}
            <span className="pointer-events-none absolute -bottom-[2px] left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#0038de] transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:bg-[#c6ff57]" />
          </a>
          .
        </motion.p>

        {/* Draggable card stage */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <DraggableCardContainer className="mt-8 relative flex min-h-[60vh] lg:min-h-[70vh] w-full items-center justify-center overflow-clip bg-[#ffb5d0]">
            {/* Watermark text inside the stage */}
            <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-extrabold tracking-tight text-[#0038de]/10 md:text-4xl select-none">
              Are you supposed to see these? I don't know, but here they are.
            </p>

            {[...items]
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((item) => (
                <DraggableCardBody key={item.title} className={item.className}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="pointer-events-none relative z-[7] h-60 w-70 object-cover"
                  />
                  <h3 className="mt-4 text-center text-base font-extrabold tracking-wide text-[#0038de] uppercase drop-shadow-sm">
                    {item.title}
                  </h3>
                </DraggableCardBody>
              ))}
          </DraggableCardContainer>
        </motion.div>

        {/* Bottom accent strip — ties into the yellow page palette */}
        <div className="mt-6 flex gap-2">
          <div className="h-1 w-12 bg-[#ffb5d0]" />
          <div className="h-1 w-6 bg-[#c6ff57]" />
          <div className="h-1 w-3 bg-[#0038de]" />
        </div>
      </div>
    </main>
  );
}