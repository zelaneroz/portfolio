"use client";
import About from "../components/About";
import Work from "../components/Work";
import Hero from "../components/Hero";
// import {BentoGrid, BentoGridItem} from "./components/ui/bento-grid"; 

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] text-blasck w-screen min-h-screen relative scroll-smooth">
      <Hero />
      <About />
      <Work />
    </main>
  );

  

}
