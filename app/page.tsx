"use client";
import About from "../components/About";
import Work from "../components/Work";

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] text-black w-screen min-h-screen relative scroll-smooth">
      {/* Section 1: Landing */}
      <section className="w-full max-w-[1280px] px-[clamp(1rem,6vw,6rem)] mx-auto min-h-screen flex flex-col justify-between">
        {/* Optional decorative lines */}
        <p> This is a dummy</p>
      </section>
      {/* Section 2: About */}
      <About />
      <Work />
    </main>
  );
}
