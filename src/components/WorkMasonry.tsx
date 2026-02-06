"use client";

import Masonry from "react-masonry-css";
import type { ReactNode } from "react";

type WorkMasonryProps = {
  children: ReactNode;
};

export default function WorkMasonry({ children }: WorkMasonryProps) {
  return (
      <Masonry
        breakpointCols={{ default: 3, 1024: 2, 640: 1 }}
        className="flex w-auto -ml-4"
        columnClassName="pl-4"
      >
      {children}
    </Masonry>
  );
}
