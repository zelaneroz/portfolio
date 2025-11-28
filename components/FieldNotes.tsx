import React from "react";
import {items} from "./fieldnotesItems";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./ui/draggable-card";

export function FieldNotes() {
  return (
    <main id="field-notes" className="w-full bg-white px-[clamp(1rem,6vw,6rem)] py-[clamp(2rem,6vh,4rem)] overflow-x-hidden flex flex-col">
        <span className="typewriter font-serif text-[#963267] italic leading-none text-[clamp(3rem,8vw,5.625rem)]">
            Field Notes
        </span>
      <p className="text-lg font-light text-neutral-700 dark:text-neutral-300"> Some treasured moments (algorithm randomly picks 5 each time). If you want my thoughts, I write weekly on{" "}
        <a
            href="/blog"
            className="underline font-bold underline-offset-1 text-[#963267] decoration-[#963267] mb-2 hover:decoration-[#963267]/50 hover:text-[#963267]/50"
        >blog</a></p>

    <DraggableCardContainer className="bg-[#963267] mt-5 relative flex min-h-[60vh] lg:min-h-[70vh] w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm text-white -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        Are you supposed to see these? I don't know, but here they are.
      </p>
      {[...items]
  .sort(() => 0.5 - Math.random()) // shuffle
  .slice(0, 5)                      // pick first 5
  .map((item) => (
        <DraggableCardBody className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-7 h-60 w-70 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-light italic text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
    </main>
  );
}
