export default function RootLoading() {
  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-[var(--semantic-bg-base)]"
    >
      <span className="sr-only">Loading…</span>
      <span
        aria-hidden="true"
        className="inline-block animate-pulse leading-none"
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          letterSpacing: "-0.02em",
          color: "var(--semantic-text-tertiary)",
        }}
      >
        🍑
      </span>
    </main>
  );
}
