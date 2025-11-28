"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "./projectItems";

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Scroll by 400px
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="projects"
      className="w-full h-screen bg-gradient-to-b from-white to-gray-50 px-[clamp(1rem,4vw,4rem)] py-[clamp(2rem,4vh,3rem)] overflow-hidden flex flex-col"
    >
      {/* Title */}
      <motion.div className="text-center mb-2">
        <motion.span
          className="text-[clamp(2.5rem,5vw,3.5rem)] font-serif text-[#DD4AFF] leading-none inline-flex flex-wrap justify-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {"Featured Projects".split("").map((char, i) => (
            <motion.span key={i} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </motion.div>

      {/* Subtitle */}
      <p className="text-center text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-6">
        Turning ideas into code. Explore projects ranging from AI research to full-stack apps—each one solving a different problem.
      </p>

      {/* Horizontal Scrollable Carousel */}
      <div className="relative flex-1 flex flex-col justify-center">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#DD4AFF]"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#DD4AFF]"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[280px] md:w-[360px] lg:w-[400px] snap-center"
            >
              <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-[380px] md:h-[420px]">
                {/* Project Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-serif">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-white/90 mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.split(',').slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* View Project Arrow */}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors self-end group-hover:translate-x-1 group-hover:-translate-y-1 duration-300"
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="text-center mt-4 text-xs md:text-sm text-gray-400">
          Scroll to explore more →
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar but keeping functionality */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}