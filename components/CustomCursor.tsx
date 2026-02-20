"use client";
import { useEffect, useMemo, useState } from "react";
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
  const move = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) {
      setIsHovering(true);
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) {
      setIsHovering(false);
    }
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseover", handleMouseOver);
  window.addEventListener("mouseout", handleMouseOut);

  return () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseover", handleMouseOver);
    window.removeEventListener("mouseout", handleMouseOut);
  };
}, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-all duration-150 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-200 ease-out ${
          isHovering ? "w-8 h-8 bg-[#ffb5d0]" : "w-[13px] h-[13px] bg-[#c6ff57]"
        } -translate-x-1/2 -translate-y-1/2`}
      />
    </div>
  );
}