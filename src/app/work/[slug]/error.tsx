"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CaseError({ error, reset }: ErrorProps) {
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
        Couldn&apos;t load this case.
      </h1>
      <p className="text-body-xl max-w-xl">
        Something went wrong fetching this project. You can retry, or head back to
        the rest of the work.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="text-button-md inline-flex h-9 items-center justify-center rounded-full bg-[var(--olive-300)] px-4 text-[var(--semantic-text-primary)] transition-colors duration-200 hover:bg-[var(--olive-400)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-button-md inline-flex h-9 items-center justify-center rounded-full px-4 text-[var(--semantic-text-secondary)] underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
