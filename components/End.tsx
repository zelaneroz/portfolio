import React, { useState } from "react";
import { track } from "@vercel/analytics";
import { motion, AnimatePresence } from "framer-motion";

export default function End() {
  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mqalkeoo", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        track("send");
        setShowNotification(true);
        form.reset();
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="relative bg-[#0038de] w-full min-h-screen flex flex-col items-center justify-center px-[clamp(1rem,6vw,6rem)] py-24 overflow-hidden"
    >
      {/* Subtle grid texture — matches site's layered depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff5f2 1px, transparent 1px), linear-gradient(90deg, #fff5f2 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Toast notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#c6ff57] text-[#0038de] font-extrabold tracking-wide px-6 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
          >
            sent. thanks for dropping by!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        {/* Heading */}
        <h2 className="text-[#fff5f2] font-extrabold tracking-tight leading-[0.95] text-[clamp(2.4rem,6vw,4rem)] mb-6">
          Let's make something{" "}
          <motion.span
            className="italic text-[#c6ff57] inline-block"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            great
          </motion.span>{" "}
          together.
        </h2>

        {/* Email + Resume */}
        <p className="text-[#fff5f2]/80 text-base sm:text-lg mb-1 tracking-wide">
          zeespanto@gmail.com
        </p>
        <a
          href="/ZelanErozEspantoResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block text-[#fff5f2]/80 text-base sm:text-lg mb-12 tracking-wide hover:text-[#ffed00] transition-colors duration-200"
        >
          Resume
          <span className="pointer-events-none absolute -bottom-[2px] left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#ffed00] transition-transform duration-200 ease-out group-hover:scale-x-100" />
        </a>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <input
            type="text"
            name="name"
            required
            placeholder="name"
            className="
              w-full bg-transparent border-b border-[#fff5f2]/30
              px-0 py-3 text-[#fff5f2] placeholder-[#fff5f2]/35
              text-base tracking-wide
              focus:outline-none focus:border-[#c6ff57]
              transition-colors duration-200
            "
          />
          <input
            type="email"
            name="email"
            placeholder="email (if you want a reply)"
            className="
              w-full bg-transparent border-b border-[#fff5f2]/30
              px-0 py-3 text-[#fff5f2] placeholder-[#fff5f2]/35
              text-base tracking-wide
              focus:outline-none focus:border-[#ffb5d0]
              transition-colors duration-200
            "
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="message"
            className="
              w-full bg-transparent border-b border-[#fff5f2]/30
              px-0 py-3 text-[#fff5f2] placeholder-[#fff5f2]/35
              text-base tracking-wide resize-none
              focus:outline-none focus:border-[#ffed00]
              transition-colors duration-200
            "
          />

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ backgroundColor: "#c6ff57", color: "#0038de" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="
              mt-2 w-full py-3
              border border-[#fff5f2]/60
              bg-transparent text-[#fff5f2]
              font-extrabold tracking-widest text-sm uppercase
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors duration-150
            "
          >
            {isSubmitting ? "sending…" : "send"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}