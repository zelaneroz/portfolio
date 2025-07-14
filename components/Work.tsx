"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {workItems} from "./workItems";

export default function Work() {
  const [active, setActive] = useState(null);

  return (
    <section id="work" className="w-full bg-white px-6 py-20 overflow-x-hidden">        
      <span className="text-[clamp(3rem,8vw,5.625rem)] font-bold text-[#963267] leading-none"> {"<Work/>"}</span>
      <p className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-6">
          SWE | ML/AI | CS Education | Public Interest Tech
        </p>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {workItems.map((item) => (
          <motion.div
            key={item.id}
            className="min-w-[200px] h-[200px] bg-gray-100 rounded-xl p-4 flex items-center justify-center cursor-pointer shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(item)}
          >
            <Image
              src={item.logo}
              alt={item.company}
              width={100}
              height={100}
              className="object-contain"
            />
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
    </section>
  );
}
