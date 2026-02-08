"use client";

import { useEffect, useMemo } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/DownArrow.json";

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
  const lottieRef = useMemo<React.MutableRefObject<LottieRefCurrentProps | null>>(
    () => ({ current: null }),
    []
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setTimeout(() => {
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.play();
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [delayMs, shouldReduceMotion, lottieRef]);

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
