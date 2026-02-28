"use client";
import dynamic from "next/dynamic";
import NewLanding from "../components/NewLanding";

const NewWork = dynamic(() => import("../components/NewWork"));
const ProjectsFeaturesSection = dynamic(() => import("../components/NewProject"));
const FieldNotes = dynamic(() =>
  import("../components/FieldNotes").then((mod) => ({ default: mod.FieldNotes }))
);
const End = dynamic(() => import("../components/End"));

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] w-screen min-h-screen relative scroll-smooth">
      <NewLanding />       {/* loads immediately — above fold */}
      <NewWork />
      <ProjectsFeaturesSection />
      <FieldNotes />
      <End />
    </main>
  );
}