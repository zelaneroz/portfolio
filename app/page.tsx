import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] text-black w-screen min-h-screen justify-center relative">
    {/*<main className="bg-[#f8f8f8] text-black w-screen min-h-screen flex justify-center relative">*/}
      {/* Container (shared padding and max-width) */}
      <section className="relative w-full max-w-[1280px] px-[clamp(1rem,6vw,6rem)] mx-auto min-h-screen flex flex-col justify-between">
      {/*<section className="relative w-full max-w-[1280px] px-[clamp(1rem,6vw,6rem)] mx-auto">*/}
        {/* Decorative Frame Lines */}
        <div className="pointer-events-none absolute inset-0 z-50">
          {/* top line */}
          <div className="absolute top-[clamp(2rem,6vh,6rem)] left-0 w-full h-[1px] bg-black" />
          {/* bottom line */}
          <div className="absolute bottom-[clamp(2rem,6vh,6rem)] left-0 w-full h-[1px] bg-black" />
          {/* left line aligned with padding */}
          <div className="absolute top-[clamp(2rem,6vh,6rem)] bottom-[clamp(2rem,6vh,6rem)] left-[clamp(2rem,6vh,6rem)] w-[1px] bg-black" />
        </div>

        {/* Main content */}
        <Navbar />
        <Hero />
      </section>

      <section className="w-full bg-white">
        <About />
      </section>
    </main>
  );
}
