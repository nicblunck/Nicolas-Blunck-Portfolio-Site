"use client";

import { usePathname } from "next/navigation";
import ScrollSmoother from "@/components/ScrollSmoother";

export default function ScrollSmootherGate() {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return <ScrollSmoother />;
}
