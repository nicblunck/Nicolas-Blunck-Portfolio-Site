"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, type CSSProperties } from "react";

type RevealWordsProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Per-word stagger (s). */
  stagger?: number;
  /** Color applied to words from `accentFrom` onward (e.g. a trailing highlight). */
  accentColor?: string;
  /** Word index (0-based) from which `accentColor` is applied. */
  accentFrom?: number;
  /** Element to render as. Defaults to a paragraph. */
  as?: "p" | "h1" | "h2";
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Splits a line into words and reveals them one by one as it scrolls into view. */
export default function RevealWords({
  text,
  className,
  style,
  stagger = 0.06,
  accentColor,
  accentFrom,
  as = "p",
}: RevealWordsProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ").filter(Boolean);
  const colorFor = (index: number) =>
    accentColor !== undefined && accentFrom !== undefined && index >= accentFrom
      ? accentColor
      : undefined;

  const Tag = as;
  const MotionTag = motion[as];

  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span style={{ color: colorFor(index) }}>{word}</span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              // Leave room for serif descenders so tight line-heights don't clip them,
              // then pull the box back so the extra space doesn't affect layout.
              paddingBottom: "0.2em",
              marginBottom: "-0.2em",
            }}
          >
            <motion.span
              style={{ display: "inline-block", color: colorFor(index) }}
              variants={{
                hidden: { y: "130%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
