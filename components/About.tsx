// components/About.tsx
export default function About() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-start px-[clamp(1rem,6vw,6rem)] py-[clamp(4rem,8vh,8rem)] bg-white">
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold mb-6">About Me</h2>
      <p className="text-[clamp(1rem,2.5vw,1.25rem)] leading-relaxed max-w-[700px] text-neutral-700">
        I'm a creative technologist who thrives at the intersection of design and code. I build things
        inspired by people, places, and ideas I've encountered — from culture-preserving apps to dynamic
        web experiences. This is a placeholder for now, but one day, you'll read my actual story here. 
      </p>
    </section>
  );
}
