"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {workItems} from "./workItems";
import {projects} from "./projectItems";

export default function Work() {
  const [active, setActive] = useState(null);

  return (
    // ========== Work Section =========
    <section id="work" className="w-full min-h-screen bg-white px-[clamp(1rem,6vw,6rem)] py-[clamp(2rem,6vh,4rem)] gap-8 overflow-x-hidden">        
      <span className="text-[clamp(3rem,8vw,5.625rem)] font-bold text-[#963267] leading-none">{"<Work />"}</span>
      {/* <span className="text-[clamp(3rem,8vw,5.625rem)] font-bold text-[#963267] leading-none"> {"<Work/>"}</span> */}
      <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-6 mt-6">(1) Experience</p>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {workItems.map((item) => (
          <motion.div
            key={item.id}
            className="group min-w-[220px] bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(item)}
          >
    {/* Logo */}
    <div className="w-20 h-20 flex items-center justify-center shadow-inner transition duration-300 group-hover:rotate-6">
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
      <h3 className="text-base font-semibold text-gray-800">{item.company}</h3>
      <p className="text-sm text-gray-600">{item.position}</p>
      <p className="text-xs text-gray-500">{item.dates}</p>
    </div>
  </motion.div>
))}


      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-xl"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              &#x2715;
            </button>

            <div className="flex gap-4 items-center mb-4">
              <Image
                src={active.logo}
                alt={active.company}
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <h3 className="text-lg font-bold">{active.company}</h3>
                <p className="text-sm text-gray-500">{active.position}</p>
                <p className="text-sm text-gray-500">
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

    {/*/ ========== PROJECTS SECTION =========*/}
    <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-6 mt-6">(2) Projects</p>
    

    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" id="project-grid">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link group"
              >
                <div className="project-card bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all transform duration-300 hover:scale-[1.03]">
                  <div className="overflow-hidden rounded-md mb-3">
                    <Image
                      src={project.img}
                      alt={`${project.title} preview`}
                      width={400}
                      height={200}
                      className="w-full h-[180px] object-cover rounded-md"
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
                </div>
              </a>
            ))}
          </div>
    

    
    </section>
  );
}
