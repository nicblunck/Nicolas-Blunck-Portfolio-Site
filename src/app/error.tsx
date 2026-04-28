"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center"
    >
      <h1
        className="leading-none"
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          letterSpacing: "-0.02em",
          color: "var(--semantic-text-primary)",
        }}
      >
        Something went sideways.
      </h1>
      <p className="text-body-xl max-w-xl">
        We hit an unexpected snag rendering this page. Try again — and if it keeps
        happening, drop me a note.
      </p>
      <button
        type="button"
        onClick={reset}
        className="text-button-md inline-flex h-9 items-center justify-center rounded-full bg-[var(--olive-300)] px-4 text-[var(--semantic-text-primary)] transition-colors duration-200 hover:bg-[var(--olive-400)]"
      >
        Try again
      </button>
    </main>
  );
}
