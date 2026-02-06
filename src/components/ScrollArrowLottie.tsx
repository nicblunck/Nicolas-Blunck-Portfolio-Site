"use client";

import { useEffect, useMemo, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";

type ScrollArrowLottieProps = {
  size?: number | string;
  delayMs?: number;
  className?: string;
};

export default function ScrollArrowLottie({
  size = 96,
  delayMs = 0,
  className,
}: ScrollArrowLottieProps) {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);
  const lottieRef = useMemo<React.MutableRefObject<LottieRefCurrentProps | null>>(
    () => ({ current: null }),
    []
  );
  const shouldReduceMotion = useReducedMotion();
  const src = useMemo(() => encodeURI("/Down Arrow.json"), []);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) return;
        const data = (await response.json()) as Record<string, unknown>;
        if (isMounted) setAnimationData(data);
      } catch {
        // Swallow fetch errors to avoid breaking the landing page.
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setTimeout(() => {
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.play();
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [delayMs, shouldReduceMotion, lottieRef]);

  if (!animationData) return null;

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        pointerEvents: "none",
      }}
    >
      <Lottie lottieRef={lottieRef} animationData={animationData} loop={false} autoplay={false} />
    </div>
  );
}
