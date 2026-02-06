"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let rafId = 0;
    let targetX = -9999;
    let targetY = -9999;
    const trail: Array<{ x: number; y: number }> = [];
    const trailSize = 6;
    let currentX = -9999;
    let currentY = -9999;
    const ease = 0.04;

    const tick = () => {
      const oldest = trail[0];
      if (oldest) {
        targetX = oldest.x;
        targetY = oldest.y;
        if (trail.length > 1) {
          trail.shift();
        }
      }
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;
      currentX = currentX + deltaX * ease;
      currentY = currentY + deltaY * ease;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;

      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const handleMove = (event: MouseEvent) => {
      if (trail.length >= trailSize) {
        trail.shift();
      }
      trail.push({ x: event.clientX, y: event.clientY });
      if (rafId) return;
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
