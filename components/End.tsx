import React, { useState } from "react";
import { track } from '@vercel/analytics';

export default function End() {
  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mqalkeoo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        track('send');
        setShowNotification(true);
        form.reset();
        
        // Auto-hide notification after 3 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="bg-[#141414] font-light w-full max-w-full px-[clamp(1rem,6vw,6rem)] mx-auto min-h-screen flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] mb-6">
        Let's make something {''} <span className="italic font-bold font-serif hover:text-[#963267]">great</span> together.
      </h2>
      <p className="text-lg mb-2">zeespanto@gmail.com</p>
      <a
        href="/ZelanErozEspantoResume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 mb-10 underline text-lg hover:text-[#963267] transition-all"
      >
        Resume
      </a>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-[#963267] text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          sent. thanks for dropping by!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md"
      >
        <label className="flex flex-col text-sm">
          <input
            type="text"
            name="name"
            required
            className="px-3 py-2 border border-gray-300 rounded-md text-white"
            placeholder="name"
          />
        </label>
        <label className="flex flex-col text-sm">
          <input
            type="email"
            name="email"
            placeholder="email (if you want a reply)"
            className="px-3 py-2 border border-gray-300 rounded-md text-white"
          />
        </label>
        <label className="flex flex-col text-sm">
          <textarea
            name="message"
            required
            rows={4}
            placeholder="message"
            className="px-3 py-2 border border-gray-300 rounded-md text-white"
          />
        </label>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl border border-white text-black bg-white hover:bg-[#963267] hover:text-white transition duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'sending...' : 'send'}
        </button>
      </form>
    </div>
  );
}