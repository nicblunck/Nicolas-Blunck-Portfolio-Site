import NavBar from "@/components/NavBar";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";
import FixedNavObserver from "@/components/FixedNavObserver";
import CursorGlow from "@/components/CursorGlow";
import ScrollArrowLottie from "@/components/ScrollArrowLottie";
import ContactSection, { type ContactLink } from "@/components/ContactSection";
import HomeFooter from "@/components/HomeFooter";
import WorkSection from "@/components/WorkSection";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  casesQuery,
  clientLogosQuery,
  contactLinksQuery,
  competenciesQuery,
} from "@/sanity/queries";
type CaseEntry = {
  _id: string;
  title: string;
  client?: string;
  slug?: { current?: string };
  slugValue?: string;
  aspect?: "9-16" | "3-4" | "1-1" | "3-2";
  role?: string;
  competencies?: CompetencyEntry[];
  coverMedia?: {
    coverType?: "image" | "video";
    image?: unknown;
    videoUrl?: string;
    link?: string;
  };
};

type ContactLinkEntry = ContactLink & {
  _id: string;
};

type ClientLogoEntry = {
  _id: string;
  name: string;
  logo?: {
    asset?: {
      url?: string;
      mimeType?: string | null;
    };
  };
};

type CompetencyEntry = {
  _id: string;
  key?: string;
  label?: string;
  emoji?: string;
  bg?: string;
};

export default async function Home() {
  const navItems = [
    { label: "Work", href: "#" },
    { label: "Play", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Styles", href: "/styles" },
    { label: "Components", href: "/components" },
  ];
  let cases: CaseEntry[] = [];
  let contactLinks: ContactLinkEntry[] = [];
  let clientLogos: ClientLogoEntry[] = [];
  let competencies: CompetencyEntry[] = [];

  try {
    [cases, contactLinks, clientLogos, competencies] = await Promise.all([
      client.fetch<CaseEntry[]>(casesQuery),
      client.fetch<ContactLinkEntry[]>(contactLinksQuery),
      client.fetch<ClientLogoEntry[]>(clientLogosQuery),
      client.fetch<CompetencyEntry[]>(competenciesQuery),
    ]);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
  }

  const heroLine1 = "Shaping stories";
  const heroLine2 = "through digital craft";
  const heroLine1Words = heroLine1.split(" ").filter(Boolean);
  const heroLine2Words = heroLine2.split(" ").filter(Boolean);
  const heroName = "Nic Blunck";
  const introText =
    "Hi there, I'm Nicolas Blunck 👋 I approach design as storytelling, using craft to transform abstract ideas into experiences people can feel. My work is defined by clarity, playfulness, and an ability to translate complex concepts into simple, engaging narratives. Collaboration sits at the center of my process, ensuring every project grows from strong ideas into memorable outcomes.";
  const fallbackCompetencies: CompetencyEntry[] = [
    { _id: "fallback-art", key: "art-direction", label: "Art Direction", emoji: "🎨", bg: "#dfe8c2" },
    { _id: "fallback-ui", key: "ui", label: "UI", emoji: "📱", bg: "#ffd6c9" },
    { _id: "fallback-ux", key: "ux", label: "UX", emoji: "🧭", bg: "#cfe9ff" },
    { _id: "fallback-motion", key: "motion", label: "Motion", emoji: "🏃‍♂️", bg: "#ffd0d6" },
    { _id: "fallback-illustration", key: "illustration", label: "Illustration", emoji: "🖌️", bg: "#ffd9b8" },
    { _id: "fallback-branding", key: "branding", label: "Branding", emoji: "🪧", bg: "#fff6b8" },
  ];
  const coreCompetencies =
    (competencies ?? []).filter((item): item is CompetencyEntry => Boolean(item?.label)) ??
    fallbackCompetencies;
  const resolvedCompetencies = coreCompetencies.length ? coreCompetencies : fallbackCompetencies;
  const workSectionTitle = "Some of my work 💼";
  const workSectionCtaLabel = "All Work";
  const workSectionCtaUrl = "#";
  const clientsSectionTitle = "Some people I've worked with";
  const philosophyLine = "Work that's playful, precise, and human.";

  const marqueeLogos = clientLogos
    .map((logo) => ({
      alt: logo.name,
      src:
        logo.logo?.asset?.url ??
        (logo.logo ? urlFor(logo.logo).width(400).height(400).url() : ""),
      mimeType: logo.logo?.asset?.mimeType ?? null,
    }))
    .filter((logo) => Boolean(logo.src));

  return (
    <div className="relative min-h-screen bg-[var(--semantic-bg-base)] text-[var(--semantic-text-primary)]">
      <CursorGlow />
      <div className="relative z-10">
        <section className="relative flex h-screen w-screen flex-col items-center justify-center text-center">
          <div className="w-full">
            <div
              className="animate-fade-in mb-8 flex w-full items-center justify-center gap-2"
              style={{ animationDelay: "1300ms" }}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: "clamp(1.5rem, 2vw, 3rem)",
                  height: "clamp(1.5rem, 2vw, 3rem)",
                  fontSize: "clamp(1.5rem, 2vw, 3rem)",
                }}
              >
                🍑
              </span>
              <span
                className="leading-none"
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(1.5rem, 2vw, 3rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {heroName}
              </span>
            </div>
          </div>

          <h1
            className="w-full leading-none"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(4.5rem, 12vw, 100rem)",
              letterSpacing: "-0.02em",
              color: "var(--semantic-text-primary)",
            }}
          >
            {heroLine1Words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="animate-word-bounce"
                style={{
                  animationDelay: `${200 + index * 160}ms`,
                  marginRight: index < heroLine1Words.length - 1 ? "0.2em" : undefined,
                }}
              >
                {word}
              </span>
            ))}
          </h1>
          <h2
            className="w-full leading-none"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(4.5rem, 12vw, 100rem)",
              letterSpacing: "-0.02em",
              color: "var(--semantic-accent)",
            }}
          >
            {heroLine2Words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="animate-word-bounce"
                style={{
                  animationDelay: `${760 + index * 160}ms`,
                  marginRight: index < heroLine2Words.length - 1 ? "0.2em" : undefined,
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          <div
            id="landing-navbar"
            className="animate-fade-in mt-10 flex w-full justify-center"
            style={{ animationDelay: "1300ms" }}
          >
            <NavBar shadow={false} background={false} variant="landing" items={navItems} />
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-[175%] rotate-[10deg]"
            style={{ bottom: "calc(24px + env(safe-area-inset-bottom))" }}
          >
            <ScrollArrowLottie size="clamp(24px, 3vh, 48px)" delayMs={1500} />
          </div>
        </section>

      <main
        className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-8"
        style={{
          paddingTop: "calc(64px + 36px)",
          paddingBottom: "calc(128px + 96px + var(--safe-area-bottom))",
        }}
      >

        <section className="animate-fade-in grid w-full grid-cols-12 gap-4" style={{ animationDelay: "1300ms" }}>
          <p
            className="col-span-12 md:col-span-9"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1.5rem",
              lineHeight: 1.25,
              letterSpacing: "-0.04em",
              color: "var(--semantic-text-primary)",
            }}
          >
            {introText}
          </p>

          <div className="col-span-12 flex flex-col gap-2 md:col-span-3">
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                letterSpacing: "-0.02em",
                fontWeight: 600,
                color: "var(--semantic-text-secondary)",
                lineHeight: 1.25,
              }}
            >
              Core Competencies
            </p>
            <div className="flex flex-wrap gap-1">
              {resolvedCompetencies.map((item, index) => (
                <span
                  key={`${item.label ?? "competency"}-${index}`}
                  className="flex items-center gap-2 bg-[var(--semantic-bg-elevated)] text-[var(--olive-900)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "1rem",
                    letterSpacing: "-0.04em",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    height: "32px",
                    backgroundColor: item.bg ?? "var(--semantic-bg-elevated)",
                  }}
                >
                  {item.label}
                  <span aria-hidden="true">{item.emoji}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <WorkSection
          title={workSectionTitle}
          ctaLabel={workSectionCtaLabel}
          ctaUrl={workSectionCtaUrl}
          cases={cases}
        />

        <section className="mt-16 w-full">
          <div
            className="animate-fade-in flex items-center"
            style={{ animationDelay: "1300ms" }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1.5rem",
                letterSpacing: "-0.04em",
              }}
            >
              {clientsSectionTitle}
            </p>
          </div>
          <div
            className="animate-fade-in relative left-1/2 mt-6 w-screen -translate-x-1/2"
            style={{ animationDelay: "1300ms" }}
          >
            <ClientLogoMarquee logos={marqueeLogos} />
          </div>
        </section>

        <section className="mt-24 w-full">
          <p
            className="leading-[0.95] max-w-[18ch] sm:max-w-none"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(6rem, 6vw + 1.5rem, 8rem)",
              letterSpacing: "-0.02em",
              color: "var(--semantic-text-primary)",
            }}
          >
            {philosophyLine}
          </p>
        </section>

        <ContactSection
          links={contactLinks.map((link) => ({
            id: link._id,
            label: link.label,
            url: link.url,
            emoji: link.emoji,
          }))}
          formProps={{ idPrefix: "home-contact" }}
        />

        <HomeFooter />

        <FixedNavObserver items={navItems} observeId="landing-navbar" />
        </main>
      </div>
    </div>
  );
}
