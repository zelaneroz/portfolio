"use client";
import dynamic from "next/dynamic";
import NewLanding from "../components/NewLanding";
import About from "../components/About";

const NewWork = dynamic(() => import("../components/NewWork"));
const Projects = dynamic(() => import("../components/Projects"));
// const FieldNotes = dynamic(() =>
//   import("../components/FieldNotes").then((mod) => ({ default: mod.FieldNotes }))
// );
const End = dynamic(() => import("../components/End"));

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] w-screen min-h-screen relative scroll-smooth">
      <NewLanding />       {/* loads immediately — above fold */}
      <About />
      <NewWork />
      <Projects />
      <End />
    </main>
  );
}