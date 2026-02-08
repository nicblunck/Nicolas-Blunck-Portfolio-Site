const clientLogos = Array.from({ length: 8 }, (_, index) => {
  const isBudgie = index % 2 === 0;
  return {
    alt: isBudgie ? "Budgie" : "Charm",
    src: isBudgie
      ? "/Budgie_Icon_v02-iOS-Default-1024x1024@1x.png"
      : "/Charm%20Icon%20v01-iOS-Default-1024x1024@1x.png",
  };
});
import NavBar from "@/components/NavBar";
import TextButton from "@/components/TextButton";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";
import WorkCard from "@/components/WorkCard";
import WorkMasonry from "@/components/WorkMasonry";
import FixedNavObserver from "@/components/FixedNavObserver";
import CursorGlow from "@/components/CursorGlow";
import ScrollArrowLottie from "@/components/ScrollArrowLottie";
import { getClient } from "@/sanity/lib/client";
import { casesQuery, contactLinksQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

type CaseEntry = {
  _id: string;
  title: string;
  client?: string;
  aspect?: "9-16" | "3-4" | "1-1" | "3-2";
  role?: string;
  competencies?: {
    artDirection?: boolean;
    ui?: boolean;
    ux?: boolean;
    motion?: boolean;
    illustration?: boolean;
    branding?: boolean;
  };
  coverMedia?: {
    coverType?: "image" | "video";
    image?: unknown;
    videoUrl?: string;
    link?: string;
  };
};

type ContactLink = {
  _id: string;
  label: string;
  url: string;
  emoji?: string;
};

export default async function Home() {
  const navItems = [
    { label: "Work", href: "#" },
    { label: "Play", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Styles", href: "/styles" },
    { label: "Components", href: "/components" },
  ];
  const isDraft = process.env.SANITY_USE_DRAFTS !== "false";
  const client = getClient(isDraft);
  const [cases, contactLinks] = client
    ? await Promise.all([
        client.fetch<CaseEntry[]>(casesQuery),
        client.fetch<ContactLink[]>(contactLinksQuery),
      ])
    : [[], []];

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
                Nic Blunck
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
            <span className="animate-word-bounce" style={{ animationDelay: "200ms" }}>
              Shaping
            </span>{" "}
            <span className="animate-word-bounce" style={{ animationDelay: "360ms" }}>
              stories
            </span>
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
            <span className="animate-word-bounce" style={{ animationDelay: "760ms" }}>
              through
            </span>{" "}
            <span className="animate-word-bounce" style={{ animationDelay: "920ms" }}>
              digital
            </span>{" "}
            <span className="animate-word-bounce" style={{ animationDelay: "1080ms" }}>
              craft
            </span>
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
          paddingBottom: "128px",
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
            Hi there, I&apos;m{" "}
            <span style={{ color: "var(--semantic-accent)" }}>Nicolas Blunck 👋</span> I approach
            design as storytelling, using craft to transform abstract ideas into experiences people can
            feel. My work is defined by clarity, playfulness, and an ability to translate complex concepts
            into simple, engaging narratives. Collaboration sits at the center of my process, ensuring
            every project grows from strong ideas into memorable outcomes.
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
              {[
                { label: "Art Direction", emoji: "🎨", bg: "#dfe8c2" },
                { label: "UI", emoji: "📱", bg: "#ffd6c9" },
                { label: "UX", emoji: "🧭", bg: "#cfe9ff" },
                { label: "Motion", emoji: "🏃‍♂️", bg: "#ffd0d6" },
                { label: "Illustration", emoji: "🖌️", bg: "#ffd9b8" },
                { label: "Branding", emoji: "🪧", bg: "#fff6b8" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 bg-[var(--semantic-bg-elevated)] text-[var(--olive-900)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "1rem",
                    letterSpacing: "-0.04em",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    height: "32px",
                    backgroundColor: item.bg,
                  }}
                >
                  {item.label}
                  <span aria-hidden="true">{item.emoji}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 w-full">
          <div
            className="animate-fade-in flex items-center justify-between"
            style={{ animationDelay: "1300ms" }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1.5rem",
                letterSpacing: "-0.04em",
              }}
            >
              Some of my work 💼
            </p>
            <a href="#">
              <TextButton text="All Work" />
            </a>
          </div>
          <div
            className="animate-fade-in relative left-1/2 mt-6 w-screen -translate-x-1/2 px-[32px]"
            style={{ animationDelay: "1300ms" }}
          >
            <WorkMasonry>
              {cases.map((item) => {
                const enabledTags: Partial<
                  Record<
                    "art-direction" | "ui" | "ux" | "motion" | "illustration" | "branding",
                    boolean
                  >
                > = {
                  "art-direction": item.competencies?.artDirection,
                  ui: item.competencies?.ui,
                  ux: item.competencies?.ux,
                  motion: item.competencies?.motion,
                  illustration: item.competencies?.illustration,
                  branding: item.competencies?.branding,
                };

                const coverType = item.coverMedia?.coverType ?? "image";
                const coverImage = item.coverMedia?.image;
                const imageSrc =
                  coverType === "image" && coverImage
                    ? urlFor(coverImage, isDraft).width(1200).height(1200).url()
                    : coverType === "link"
                      ? item.coverMedia?.link
                      : undefined;
                const videoSrc =
                  coverType === "video" ? item.coverMedia?.videoUrl : undefined;

                return (
                  <WorkCard
                    key={item._id}
                    title={item.title}
                    client={item.client ?? ""}
                    aspect={item.aspect ?? "3-2"}
                    imageSrc={imageSrc}
                    videoSrc={videoSrc}
                    enabledTags={enabledTags}
                    className="mb-4"
                  />
                );
              })}
            </WorkMasonry>
          </div>
        </section>

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
              Some people I&apos;ve worked with
            </p>
          </div>
          <div
            className="animate-fade-in relative left-1/2 mt-6 w-screen -translate-x-1/2"
            style={{ animationDelay: "1300ms" }}
          >
            <ClientLogoMarquee logos={clientLogos} />
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
            Work that&apos;s playful, precise, and human.
          </p>
        </section>

        <section className="mt-16 w-full">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p
                className="mb-4"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.5rem",
                  lineHeight: 1.25,
                  letterSpacing: "-0.04em",
                  color: "var(--semantic-text-primary)",
                }}
              >
                Where you can find me 👀
              </p>
              <div className="flex flex-col gap-4">
                {contactLinks.map((link) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 transition-[color,gap] duration-200 ease-out hover:gap-4 hover:text-[var(--semantic-text-secondary)] active:gap-4 active:text-[var(--semantic-text-secondary)]"
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: "3rem",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.1,
                      color: "var(--semantic-text-primary)",
                    }}
                  >
                    <span>
                      {link.label}
                      {link.emoji ? ` ${link.emoji}` : ""}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "3rem",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col gap-4">
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.5rem",
                  lineHeight: 1.25,
                  letterSpacing: "-0.04em",
                  color: "var(--semantic-text-primary)",
                }}
              >
                Get in touch ✉️
              </p>
              <form className="flex flex-1 flex-col gap-4" action="#">
                {[
                  { label: "Name", placeholder: "Bilbo Baggins", type: "text", id: "contact-name" },
                  {
                    label: "Email",
                    placeholder: "bilbo@bagend.shire",
                    type: "email",
                    id: "contact-email",
                  },
                ].map((field) => (
                  <label key={field.id} className="flex flex-col gap-2">
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.25,
                        color: "var(--semantic-text-secondary)",
                      }}
                    >
                      {field.label}
                    </span>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="h-11 rounded-lg bg-[var(--form-input-bg)] px-3 text-[var(--semantic-text-primary)] placeholder:text-[var(--semantic-text-primary)] placeholder:opacity-45"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                      }}
                    />
                  </label>
                ))}
                <label className="flex flex-1 flex-col gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.25,
                      color: "var(--semantic-text-secondary)",
                    }}
                  >
                    Message
                  </span>
                  <textarea
                    id="contact-message"
                    placeholder="Say something!"
                    className="min-h-[120px] flex-1 resize-none rounded-lg bg-[var(--form-input-bg)] px-3 py-2 text-[var(--semantic-text-primary)] placeholder:text-[var(--semantic-text-primary)] placeholder:opacity-45"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1 inline-flex h-9 w-full items-center justify-center rounded-full bg-[var(--nav-button-bg)] px-3 text-[var(--semantic-text-primary)] transition-colors duration-200 hover:bg-[var(--olive-300)] active:bg-[var(--olive-300)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "1rem",
                    letterSpacing: "-0.04em",
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="mt-16 w-full">
          <div className="flex w-full flex-col gap-6 md:flex-row md:items-start">
            <div className="flex flex-1 flex-col gap-1">
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  color: "var(--semantic-text-secondary)",
                }}
              >
                About 💬
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.25,
                  color: "var(--semantic-text-tertiary)",
                }}
              >
                Hi there, I&apos;m Nicolas Blunck 👋 I approach design as storytelling, using craft
                to transform abstract ideas into experiences people can feel. My work is defined by
                clarity, playfulness, and an ability to translate complex concepts into simple,
                engaging narratives. Collaboration sits at the center of my process, ensuring every
                project grows from strong ideas into memorable outcomes.
              </p>
            </div>
            <div className="flex flex-1 flex-col items-start gap-[2px] md:items-end">
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Quick Links 🔗
              </p>
              <div className="flex flex-col items-start gap-[2px] md:items-end">
                <a href="#">
                  <TextButton
                    text="Work"
                    className="text-[12px] text-[var(--semantic-text-tertiary)]"
                  />
                </a>
                <a href="#">
                  <TextButton
                    text="Play"
                    className="text-[12px] text-[var(--semantic-text-tertiary)]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 flex w-full flex-col items-center gap-1 text-center">
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1.5rem",
                letterSpacing: "-0.04em",
                lineHeight: 1.25,
                color: "var(--semantic-text-tertiary)",
              }}
            >
              🌍 + 🍑
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                letterSpacing: "-0.04em",
                lineHeight: 1.25,
                color: "var(--semantic-text-tertiary)",
              }}
            >
              Made on{" "}
              <span style={{ fontWeight: 600, color: "var(--semantic-text-secondary)" }}>Earth</span>
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                letterSpacing: "-0.04em",
                lineHeight: 1.25,
                color: "var(--semantic-text-tertiary)",
              }}
            >
              By an{" "}
              <span style={{ fontWeight: 600, color: "var(--semantic-text-secondary)" }}>
                Earthling
              </span>
            </p>
          </div>
        </footer>

        <FixedNavObserver items={navItems} observeId="landing-navbar" />
        </main>
      </div>
    </div>
  );
}
