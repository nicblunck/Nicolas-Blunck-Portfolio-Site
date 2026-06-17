"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Vertical offset to travel from (px). */
  y?: number;
  /** Delay before the reveal starts (s). */
  delay?: number;
  /** Duration of the reveal (s). */
  duration?: number;
};

/** Fades + slides content up the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  style,
  y = 24,
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const staggerChild = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
});

type StaggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delayChildren?: number;
};

/** Reveals direct <StaggerItem> children one after another as the group enters view. */
export function Stagger({
  children,
  className,
  style,
  stagger = 0.08,
  delayChildren = 0,
}: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
};

export function StaggerItem({ children, className, style, y = 18 }: StaggerItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={className} style={style} variants={staggerChild(y)}>
      {children}
    </motion.div>
  );
}
