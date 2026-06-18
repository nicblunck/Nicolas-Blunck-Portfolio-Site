import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import CursorGlow from "@/components/CursorGlow";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import HomeFooter from "@/components/HomeFooter";
import RevealWords from "@/components/motion/RevealWords";
import { getCases } from "@/lib/cases";
import { navItems } from "@/constants/navItems";
import { contactLinks } from "@/constants/contactLinks";

export const metadata: Metadata = {
  title: "Nic Blunck — Work",
  description: "Selected projects, case studies, and craft by Nic Blunck.",
};

export default function WorkIndexPage() {
  const cases = getCases();
  const hasCases = cases.length > 0;

  return (
    <div className="relative min-h-screen bg-[var(--semantic-bg-base)] text-[var(--semantic-text-primary)]">
      <CursorGlow />
      <main
        id="main"
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start px-4 sm:px-8"
        style={{ paddingTop: "80px", paddingBottom: "160px" }}
      >
        <header className="w-full text-center">
          <div className="mb-6 flex justify-center">
            <span
              className="flex items-center gap-2 rounded-full bg-[var(--semantic-bg-elevated)] px-4 py-1.5"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(1.5rem, 2vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <span aria-hidden="true">🍑</span>
              Work
            </span>
          </div>
          <RevealWords
            as="h1"
            text="Things I've made with care"
            accentColor="var(--semantic-accent)"
            accentFrom={3}
            className="leading-[0.95] text-center"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(6rem, 6vw + 1.5rem, 8rem)",
              letterSpacing: "-0.02em",
            }}
          />
        </header>

        {hasCases ? (
          <WorkSection title="" ctaLabel="" cases={cases} className="mt-12" />
        ) : (
          <div
            className="animate-fade-in mt-16 w-full"
            style={{ animationDelay: "240ms" }}
          >
            <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-dashed border-[var(--semantic-border-strong)] px-8 py-20 text-center">
              <span aria-hidden="true" className="text-5xl">
                🍑
              </span>
              <p
                className="leading-tight"
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Case studies are on their way
              </p>
              <p className="text-body-xl max-w-[40ch] text-[var(--semantic-text-tertiary)]">
                I&apos;m polishing the next set of stories. In the meantime, say hello — I&apos;d love
                to hear what you&apos;re building.
              </p>
              <a href="/contact" className="mt-2">
                <span className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--semantic-accent)] px-6 text-[var(--olive-900)] transition-transform duration-200 ease-out hover:scale-[1.04] motion-reduce:transition-none">
                  Get in touch →
                </span>
              </a>
            </div>
          </div>
        )}

        <ContactSection
          links={contactLinks.map((link) => ({
            id: link.id,
            label: link.label,
            url: link.url,
            emoji: link.emoji,
          }))}
          formProps={{ idPrefix: "work-contact" }}
        />

        <HomeFooter />
      </main>

      <div className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2">
        <NavBar items={navItems} />
      </div>
    </div>
  );
}
