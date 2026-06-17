"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

type ParallaxCoverProps = {
  isVideo: boolean;
  url: string;
  alt: string;
  mediaClassName: string;
};

/** Cover media that gently zooms and fades as the case study scrolls past. */
export default function ParallaxCover({
  isVideo,
  url,
  alt,
  mediaClassName,
}: ParallaxCoverProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [range, setRange] = useState({ start: 0, end: 1 });

  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      setRange({ start: top, end: top + rect.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scale = useTransform(scrollY, [range.start, range.end], [1, 1.14], {
    clamp: true,
  });
  const opacity = useTransform(scrollY, [range.start, range.end], [1, 0.55], {
    clamp: true,
  });

  const style = reduce ? undefined : { scale, opacity };

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      {isVideo ? (
        <motion.video
          className={mediaClassName}
          style={style}
          src={url}
          muted
          autoPlay
          loop
          playsInline
          suppressHydrationWarning
        />
      ) : (
        <motion.img className={mediaClassName} style={style} src={url} alt={alt} />
      )}
    </div>
  );
}
