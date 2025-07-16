import React from "react";
import { track } from '@vercel/analytics';

export default function End() {
  return (
    <div id="contact" className="bg-[#141414] font-light w-full max-w-full px-[clamp(1rem,6vw,6rem)] mx-auto min-h-screen flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] mb-6">
        Let's make something {''} <span className="italic font-bold font-serif hover:text-[#963267]">great</span> together.
      </h2>
      <p className="text-lg mb-2">zeespanto@gmail.com</p>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 mb-10 underline text-lg hover:text-[#963267] transition-all"
      >
        Resume
      </a>
      <form
        action="https://formspree.io/f/mqalkeoo"
        method="POST"
        className="flex flex-col gap-4 max-w-md"
      >
        <label className="flex flex-col text-sm">
          <input
            type="text"
            name="name"
            required
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="name"
          />
        </label>

        <label className="flex flex-col text-sm">
          <input
            type="email"
            name="email"
            placeholder="email (if you want a reply)"
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="flex flex-col text-sm">
          <textarea
            name="message"
            required
            rows={4}
            placeholder="message"
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>

        <button onClick={()=>{track('send')}} className="px-4 py-2 rounded-xl border border-white text-black bg-white hover:bg-[#963267] hover:text-white transition duration-200">
  send
</button>
      </form>

    </div>
  );
}
