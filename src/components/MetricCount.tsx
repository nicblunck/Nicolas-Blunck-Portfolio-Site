"use client";

import { useEffect, useRef, useState } from "react";
import { METRIC_COUNT_DURATION_MS } from "@/constants/animations";

type MetricCountProps = {
  value: string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
};

function parseNumericValue(value: string) {
  const cleaned = value.replace(/[^0-9.\-]/g, "");
  const parsed = Number(cleaned);
  if (Number.isNaN(parsed)) return null;
  return parsed;
}

export default function MetricCount({
  value,
  durationMs = METRIC_COUNT_DURATION_MS,
  className,
  style,
}: MetricCountProps) {
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const numericTarget = parseNumericValue(value);

    if (prefersReduced || numericTarget === null) {
      setDisplayValue(value);
      return;
    }

    let rafId = 0;
    let startTime = 0;
    let started = false;
    let hasAnimated = false;

    const cubicBezier = (t: number, p0: number, p1: number, p2: number, p3: number) => {
      const u = 1 - t;
      return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
    };

    const easeBezier = (t: number) => cubicBezier(t, 0, 0, 1, 1);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeBezier(progress);
      const nextValue = Math.round(numericTarget * eased);
      setDisplayValue(nextValue.toString());
      if (progress < 1) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        hasAnimated = true;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started || hasAnimated) return;
        started = true;
        rafId = window.requestAnimationFrame(animate);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [value, durationMs]);

  return (
    <span ref={targetRef} className={className} style={style} aria-label={value}>
      {displayValue}
    </span>
  );
}
