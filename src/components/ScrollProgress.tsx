"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim accent bar pinned to the top that tracks page scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-[var(--semantic-accent)]"
    />
  );
}
