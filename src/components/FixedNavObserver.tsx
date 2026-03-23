"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

type FixedNavObserverProps = {
  items: { label: string; href: string }[];
  observeId?: string;
  alwaysVisible?: boolean;
};

export default function FixedNavObserver({
  items,
  observeId,
  alwaysVisible = false,
}: FixedNavObserverProps) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible) {
      setIsVisible(true);
      return;
    }
    if (!observeId) {
      setIsVisible(true);
      return;
    }
    const target = document.getElementById(observeId);
    if (!target) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [observeId, alwaysVisible]);

  return (
    <div
      className={`pointer-events-none fixed bottom-8 left-0 right-0 flex justify-center px-4 ${
        alwaysVisible
          ? "translate-y-0 opacity-100"
          : isVisible
            ? "translate-y-0 opacity-100 transition-all duration-300 ease-out"
            : "translate-y-10 opacity-0 transition-all duration-300 ease-out"
      }`}
    >
      <div className="pointer-events-auto w-full lg:w-fit">
        <NavBar items={items} />
      </div>
    </div>
  );
}
