import Link from "next/link";
import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";

type ShowcasePageLayoutProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

const navItems = [
  { label: "Work", href: "#" },
  { label: "Play", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Styles", href: "/styles" },
  { label: "Components", href: "/components" },
];

export default function ShowcasePageLayout({ eyebrow, title, children }: ShowcasePageLayoutProps) {
  return (
    <main className="min-h-screen bg-[var(--semantic-bg-base)] px-6 py-12 text-[var(--semantic-text-primary)] md:px-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <header className="flex flex-col gap-6">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)] transition-colors hover:text-[var(--semantic-text-primary)]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
          <div className="flex flex-col gap-2">
            <p
              className="text-xs uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {eyebrow}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.5rem, 5vw, var(--font-size-h2))",
                lineHeight: "var(--line-height-h2)",
                letterSpacing: "var(--tracking-h2-serif)",
              }}
            >
              {title}
            </h1>
          </div>
          <NavBar items={navItems} />
        </header>

        {children}
      </div>
    </main>
  );
}
