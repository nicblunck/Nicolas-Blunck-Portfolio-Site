"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const EMOJIS = ["🍑", "✨", "🎉", "💫", "🌿"];

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
  size: number;
  drift: number;
  rotate: number;
};

function createBurst(): Particle[] {
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2.4 + Math.random() * 2,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    size: 18 + Math.random() * 26,
    drift: (Math.random() - 0.5) * 240,
    rotate: (Math.random() - 0.5) * 720,
  }));
}

/** Hidden delight: the Konami code rains peaches across the screen. */
export default function EasterEgg() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let progress = 0;

    const handleKey = (event: KeyboardEvent) => {
      const expected = KONAMI[progress];
      if (event.key.toLowerCase() === expected.toLowerCase()) {
        progress += 1;
        if (progress === KONAMI.length) {
          progress = 0;
          setParticles(createBurst());
          window.setTimeout(() => setParticles([]), 5000);
        }
      } else {
        // Allow restarting the sequence from a fresh first key.
        progress = event.key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-10%] will-change-transform"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `peach-fall ${p.duration}s cubic-bezier(0.4, 0, 0.6, 1) ${p.delay}s forwards`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
