"use client";

import { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import Image from "next/image";
import {workItems} from "./workItems";
import {projects} from "./projectItems";

export default function Work() {
  const [active, setActive] = useState(null);
  const [activeProject, setActiveProject] = useState(null); // <-- Add this
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
    // ========== Work Section =========
    <section id="work" className="w-full min-h-screen bg-white px-[clamp(1rem,6vw,6rem)] py-[clamp(2rem,6vh,4rem)] gap-8 overflow-x-hidden">        
      <motion.span
        className="text-[clamp(3rem,8vw,5.625rem)] font-serif text-[#001152] italic leading-none inline-flex flex-wrap"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {"Things I've Worked on".split("").map((char, i) => (
          <motion.span key={i} variants={letter}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>

      
      <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light pt-2 leading-snug text-black mb-2 mt-6">(1) Experience</p>
      <div className="flex gap-6 overflow-x-auto pb-4 pt-4">
        {workItems.map((item) => (
          <motion.div
            key={item.id}
            className="group min-w-[220px] bg-white rounded-xl p-4 border border-[#001152] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(item)}
          >
    {/* Logo */}
    <div className="w-20 h-20 flex items-center justify-center transition duration-300 group-hover:rotate-6">
      <Image
        src={item.logo}
        alt={item.company}
        width={60}
        height={60}
        className="object-contain"
      />
    </div>

    {/* Always-visible info */}
    <div className="text-center space-y-1 mt-2">
      <h3 className="text-base font-semibold text-[#001152]">{item.company}</h3>
      <p className="text-sm text-gray-600">{item.position}</p>
      <p className="text-xs text-gray-500">{item.dates}</p>
    </div>
  </motion.div>
))}
      </div>
      {/* Modal */}

      <AnimatePresence>
      {active && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setActive(null)}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
            transition={{ease:"easeInOut", duration: 0.3 }}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              &#x2715;
            </button>

            <div className="flex items-center mb-4">
              <Image
                src={active.logo}
                alt={active.company}
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="ml-5">
                <h3 className="text-base font-semibold text-[#001152]">{active.company}</h3>
                <p className="text-sm text-gray-500 font-light">{active.position}</p>
                <p className="text-sm text-gray-500 font-light">
                  {active.location} &mdash; {active.dates}
                </p>
              </div>
            </div>

            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {active.bullets.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {active.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#f0f0f0] text-xs text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

    {/*/ ========== PROJECTS SECTION =========*/}
    <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-2 mt-6">(2) Projects</p>

    <div className="flex gap-6 overflow-x-auto pt-4 pb-4" id="project-scroll">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="group min-w-[320px] bg-white rounded-xl p-4 shadow-md border border-[#001152] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center gap-3"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveProject(project)}
        >
          <div className="overflow-hidden rounded-md mb-3 w-full h-[180px] flex items-center justify-center">
            <Image
              src={project.img}
              alt={`${project.title} preview`}
              width={300}
              height={180}
              className="object-cover rounded-md w-full h-[180px] text-[#001152]"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#222] mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-[#555] mb-2 leading-relaxed">
            {project.description}
          </p>
          <p className="text-xs text-[#333]">
            <strong>Tech Stack:</strong> {project.tech}
          </p>
        </motion.div>
      ))}
    </div>
    <AnimatePresence>
    {activeProject && (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setActiveProject(null)}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-xl"
      onClick={(e) => e.stopPropagation()}
      transition={{ease:"easeInOut", duration: 0.3 }}
    >
      <button
        onClick={() => setActiveProject(null)}
        className="absolute top-4 right-4 text-gray-600 hover:text-black"
      >
        &#x2715;
      </button>
      <div className="mb-4">
        <Image
          src={activeProject.img}
          alt={activeProject.title}
          width={400}
          height={200}
          className="object-cover rounded-md w-full h-[180px]"
        />
      </div>
      <h3 className="text-lg font-bold mb-2">{activeProject.title}</h3>
      <p className="text-sm text-gray-700 mb-2">{activeProject.description}</p>
      <p className="text-xs text-[#333] mb-2">
        <strong>Tech Stack:</strong> {activeProject.tech}
      </p>
      <a
        href={activeProject.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-blue-600 hover:underline text-sm"
      >
        View on GitHub
      </a>
    </motion.div>
  </div>
)}</AnimatePresence>
    
    </section>
  );
}
