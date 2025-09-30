"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { workItems } from "./workItems";
import { projects } from "./projectItems";

// Filter work items by category
const techStemItems = workItems.filter(item => item.category === "tech");
const businessLeadershipItems = workItems.filter(item => item.category === "business");

export default function Work() {
  const [active, setActive] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState<"tech" | "business">("tech");

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

  const currentWorkItems = activeTab === "tech" ? techStemItems : businessLeadershipItems;

  return (
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

      {/* Toggle Tabs */}
      <div className="flex gap-2 mb-6 mt-4">
        <button
          onClick={() => setActiveTab("tech")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === "tech"
              ? "bg-[#001152] text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Tech & STEM
        </button>
        <button
          onClick={() => setActiveTab("business")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === "business"
              ? "bg-[#001152] text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Business & Leadership
        </button>
      </div>

      {/* Work Items Display - Accordion Style */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-0"
        >
          {currentWorkItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group border-b border-gray-300 last:border-b-0"
              initial={false}
              onHoverStart={() => setActive(item)}
              onHoverEnd={() => setActive(null)}
            >
              {/* Accordion Header */}
              <div className="flex items-center justify-between font-sans-serif py-6 cursor-pointer">
                <div className="flex items-center gap-6 flex-1">
                  {/* Logo */}
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={item.logo}
                      alt={item.company}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  {/* Company Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#001152] mb-1">
                      {item.company}
                    </h3>
                    <p className="text-sm text-gray-600">{item.position}</p>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-500 flex-shrink-0">
                    {item.dates}
                  </div>
                </div>

                {/* Arrow Icon */}
                <motion.div
                  animate={{ rotate: active?.id === item.id ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 text-[#001152]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.div>
              </div>

              {/* Accordion Content */}
              <motion.div
                initial={false}
                animate={{
                  height: active?.id === item.id ? "auto" : 0,
                  opacity: active?.id === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-6 pl-[88px] pr-12">
                  {/* Location */}
                  {item.location && (
                    <p className="text-sm text-gray-500 mb-3">{item.location}</p>
                  )}

                  {/* Description bullets */}
                  <ul className="space-y-2 text-sm text-gray-700 mb-4">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#001152] mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-xs text-gray-700 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Projects Section remains the same... */}
      <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-2 mt-6">
        (2) Projects
      </p>

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
            <h3 className="text-lg font-semibold text-[#222] mb-2">{project.title}</h3>
            <p className="text-sm text-[#555] mb-2 leading-relaxed">{project.description}</p>
            <p className="text-xs text-[#333]">
              <strong>Tech Stack:</strong> {project.tech}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ ease: "easeInOut", duration: 0.3 }}
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
        )}
      </AnimatePresence>
    </section>
  );
}