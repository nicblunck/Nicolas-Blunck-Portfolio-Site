import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import CursorGlow from "@/components/CursorGlow";
import ContactSection from "@/components/ContactSection";
import HomeFooter from "@/components/HomeFooter";
import RevealWords from "@/components/motion/RevealWords";
import { navItems } from "@/constants/navItems";
import { contactLinks } from "@/constants/contactLinks";

export const metadata: Metadata = {
  title: "Nic Blunck — Contact",
  description: "Get in touch with Nic Blunck — design, art direction, and collaboration.",
};

export default function ContactPage() {
  const links = contactLinks.map((link) => ({
    id: link.id,
    label: link.label,
    url: link.url,
    emoji: link.emoji,
  }));

  return (
    <div className="relative min-h-screen bg-[var(--semantic-bg-base)] text-[var(--semantic-text-primary)]">
      <CursorGlow />
      <main
        id="main"
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start px-4 sm:px-8"
        style={{ paddingTop: "128px", paddingBottom: "160px" }}
      >
        <RevealWords
          as="h1"
          text="Let's make something good together"
          accentColor="var(--semantic-accent)"
          accentFrom={3}
          className="leading-[0.95]"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(6rem, 6vw + 1.5rem, 8rem)",
            letterSpacing: "-0.02em",
          }}
        />

        <ContactSection links={links} formProps={{ idPrefix: "contact-page" }} />

        <HomeFooter />
      </main>

      <div className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2">
        <NavBar items={navItems} />
      </div>
    </div>
  );
}
