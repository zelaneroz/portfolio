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

  const toggleAccordion = (item) => {
    setActive(active?.id === item.id ? null : item);
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
      <div className="flex gap-2 mb-8 mt-8">
        <button
          onClick={() => setActiveTab("tech")}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-serif ${
            activeTab === "tech"
              ? "bg-[#001152] text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Tech & STEM
        </button>
        <button
          onClick={() => setActiveTab("business")}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-serif ${
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
              onMouseEnter={() => setActive(item)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Accordion Header */}
              <div 
                className="flex items-center justify-between py-6 cursor-pointer"
                onClick={() => toggleAccordion(item)}
              >
                <div className="flex items-center gap-4 md:gap-6 flex-1">
                  {/* Logo */}
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={item.logo}
                      alt={item.company}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-semibold text-[#001152] mb-1 font-serif truncate">
                      {item.company}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-serif italic line-clamp-2">
                      {item.position}
                    </p>
                  </div>

                  {/* Date - Hidden on mobile, shown on tablet+ */}
                  <div className="hidden sm:block text-xs md:text-sm text-gray-500 flex-shrink-0 font-serif">
                    {item.dates}
                  </div>
                </div>

                {/* Arrow Icon */}
                <motion.div
                  animate={{ rotate: active?.id === item.id ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 md:ml-4 text-[#001152] flex-shrink-0"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="md:w-6 md:h-6"
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
                <div className="pb-6 pl-12 md:pl-[88px] pr-4 md:pr-12">
                  {/* Date - Shown on mobile only */}
                  <p className="sm:hidden text-xs text-gray-500 mb-2 font-serif">
                    {item.dates}
                  </p>
                  
                  {/* Location */}
                  {item.location && (
                    <p className="text-xs md:text-sm text-gray-500 mb-3">{item.location}</p>
                  )}

                  {/* Description bullets */}
                  <ul className="space-y-2 text-xs md:text-sm text-gray-700 mb-4">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#001152] mt-1 flex-shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-[10px] md:text-xs text-gray-700 px-2 md:px-3 py-1 rounded-full"
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
    </section>
  );
}