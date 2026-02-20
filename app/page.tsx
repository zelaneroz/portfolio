"use client";
import About from "../components/About";
import Work from "../components/Work";
import Projects from "../components/Projects";
import Hero from "../components/Hero";
import { FieldNotes } from "../components/FieldNotes";
import End from "../components/End";
import NewLanding from "../components/NewLanding";
import NewWork from "../components/NewWork";

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] text-blasck w-screen min-h-screen relative scroll-smooth">
      <NewLanding />
      {/* <Hero/> */}
      <NewWork/>
      {/* <About /> */}
      {/* <Work /> */}
      <Projects />
      <FieldNotes />
      <End />
    </main>
  );


}
