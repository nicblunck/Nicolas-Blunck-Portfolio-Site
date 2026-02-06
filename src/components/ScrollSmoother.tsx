"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function ScrollSmoother() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.6,
      lerp: 0.04,
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
