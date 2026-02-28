"use client";
import { FieldNotes } from "../components/FieldNotes";
import End from "../components/End";
import NewLanding from "../components/NewLanding";
import NewWork from "../components/NewWork";
import ProjectsFeaturesSection from "../components/NewProject";

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] text-blasck w-screen min-h-screen relative scroll-smooth">
      <NewLanding />
      <NewWork/>
      <ProjectsFeaturesSection />
      <FieldNotes />
      <End />
    </main>
  );


}
