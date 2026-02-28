"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Point = { x: number; y: number };

export default function CustomCursor() {
  const TRAIL_LEN = 5;
  const HEAD_SIZE = 18;
  const TAIL_SHRINK = 0.82;
  const BASE_OPACITY = 0.9;
  const OPACITY_DECAY = 0.78;

  // Controls “lag” feel (higher = tighter, lower = more floaty)
  const FOLLOW_LERP_HEAD = 0.35;
  const FOLLOW_LERP_TAIL = 0.28;

  const [isHovering, setIsHovering] = useState(false);
  const color = isHovering ? "#ffb5d0" : "#c6ff57";

  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const trailRef = useRef<Point[]>(
    Array.from({ length: TRAIL_LEN }, () => ({ x: 0, y: 0 }))
  );
  const rafRef = useRef<number | null>(null);

  // Hold DOM nodes for direct style updates (fast)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Precompute sizes/opacities once (no per-frame React work)
  const segments = useMemo(() => {
    return Array.from({ length: TRAIL_LEN }, (_, i) => {
      const scale = Math.pow(TAIL_SHRINK, i);
      const size = HEAD_SIZE * scale;
      const opacity = Math.max(0, BASE_OPACITY * Math.pow(OPACITY_DECAY, i));
      const blur = i === 0 ? 0 : Math.min(10, i * 1.1);

      return { i, size, opacity, blur };
    });
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const hoverOn = () => setIsHovering(true);
    const hoverOff = () => setIsHovering(false);

    const attachHover = () => {
      const els = document.querySelectorAll(
        "a, button, [role='button'], [data-cursor='hover']"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", hoverOn);
        el.addEventListener("mouseleave", hoverOff);
      });
      return () => {
        els.forEach((el) => {
          el.removeEventListener("mouseenter", hoverOn);
          el.removeEventListener("mouseleave", hoverOff);
        });
      };
    };

    window.addEventListener("mousemove", onMove);
    const detachHover = attachHover();

    // Initialize trail at current mouse to avoid “catch-up lag”
    const init = () => {
      const { x, y } = mouseRef.current;
      for (let i = 0; i < trailRef.current.length; i++) {
        trailRef.current[i].x = x;
        trailRef.current[i].y = y;
      }
    };
    init();

    const tick = () => {
      const trail = trailRef.current;

      // Head follows mouse
      trail[0].x += (mouseRef.current.x - trail[0].x) * FOLLOW_LERP_HEAD;
      trail[0].y += (mouseRef.current.y - trail[0].y) * FOLLOW_LERP_HEAD;

      // Tail follows previous segments
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * FOLLOW_LERP_TAIL;
        trail[i].y += (trail[i - 1].y - trail[i].y) * FOLLOW_LERP_TAIL;
      }

      // Update DOM directly (no React re-render)
      for (let i = 0; i < trail.length; i++) {
        const node = nodeRefs.current[i];
        if (!node) continue;

        const x = trail[i].x;
        const y = trail[i].y;

        // GPU-friendly transform
        node.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      detachHover?.();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {segments.map(({ i, size, opacity, blur }) => (
        <div
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: size,
            height: size,
            opacity,
            willChange: "transform",
            background: color,
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              boxShadow: i === 0 ? `0 0 14px ${color}` : "none",
            filter: blur ? `blur(${blur}px)` : undefined,
            transition: "background 150ms ease, box-shadow 150ms ease",
          }}
        />
      ))}
    </div>
  );
}