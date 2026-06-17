"use client";

import { useMemo, useState } from "react";
import NavBar from "@/components/NavBar";
import NavButton from "@/components/NavButton";
import TextButton from "@/components/TextButton";
import Toggle from "@/components/Toggle";
import WorkCard from "@/components/WorkCard";
import WorkSection, { type WorkSectionCase } from "@/components/WorkSection";
import CompetenceChip from "@/components/CompetenceChip";
import ContactForm from "@/components/ContactForm";
import ContactSection, { type ContactLink } from "@/components/ContactSection";
import HomeFooter from "@/components/HomeFooter";
import ShowcasePageLayout from "@/components/ShowcasePageLayout";

export default function ComponentsPage() {
  const [workTitle, setWorkTitle] = useState("Project Title");
  const [workClient, setWorkClient] = useState("Client Name");
  const [workImage, setWorkImage] = useState(
    "https://www.figma.com/api/mcp/asset/8010730a-a532-4ea8-b490-a755433bed02",
  );
  const [workAspect, setWorkAspect] = useState<"9-16" | "3-4" | "1-1" | "3-2">("3-4");
  const [chipState, setChipState] = useState([
    { key: "art-direction", label: "Art Direction", emoji: "🎨", color: "#d8e2b8", enabled: true },
    { key: "ui", label: "UI", emoji: "📱", color: "#ffd4c7", enabled: true },
    { key: "ux", label: "UX", emoji: "🧭", color: "#cbebff", enabled: true },
    { key: "motion", label: "Motion", emoji: "🏃", color: "#fdcfcf", enabled: true },
    { key: "illustration", label: "Illustration", emoji: "🖌", color: "#fedab8", enabled: true },
    { key: "branding", label: "Branding", emoji: "🪧", color: "#fdf9c1", enabled: true },
  ]);

  const enabledTags = useMemo(() => {
    return chipState.reduce<Record<string, boolean>>((acc, chip) => {
      acc[chip.key] = chip.enabled;
      return acc;
    }, {});
  }, [chipState]);

  const contactLinksPreview: ContactLink[] = [
    { id: "behance", label: "Behance", url: "https://www.behance.net", emoji: "🧩" },
    { id: "dribbble", label: "Dribbble", url: "https://dribbble.com", emoji: "🏀" },
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com", emoji: "💼" },
  ];

  const chipPalette = useMemo(() => {
    return chipState.reduce<Record<string, string>>((acc, chip) => {
      acc[chip.key] = chip.color;
      return acc;
    }, {});
  }, [chipState]);

  const workSectionCases: WorkSectionCase[] = [
    {
      id: "work-section-1",
      title: workTitle,
      client: workClient,
      slug: "work-section-1",
      aspect: workAspect,
      competencies: chipState
        .filter((chip) => chip.enabled)
        .map((chip) => ({
          key: chip.key,
          label: chip.label,
          emoji: chip.emoji,
          bg: chip.color,
        })),
      coverMedia: { coverType: "image", coverUrl: workImage },
    },
    {
      id: "work-section-2",
      title: "Another Project",
      client: "Another Client",
      slug: "work-section-2",
      aspect: workAspect,
      competencies: chipState
        .filter((chip) => chip.enabled)
        .map((chip) => ({
          key: chip.key,
          label: chip.label,
          emoji: chip.emoji,
          bg: chip.color,
        })),
      coverMedia: { coverType: "image", coverUrl: workImage },
    },
  ];

  const handleChipUpdate = (index: number, next: Partial<(typeof chipState)[number]>) => {
    setChipState((prev) =>
      prev.map((chip, chipIndex) => (chipIndex === index ? { ...chip, ...next } : chip)),
    );
  };

  const sectionClassName = "rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8";

  return (
    <ShowcasePageLayout eyebrow="Design System" title="UI Components">
      <section className={sectionClassName}>
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Navigation
              </p>
            </div>
            <NavBar
              items={[
                { label: "Work", href: "#" },
                { label: "Play", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Styles", href: "/styles" },
                { label: "Components", href: "/components" },
              ]}
            />
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Contact Form
              </p>
            </div>
            <ContactForm idPrefix="components-contact" />
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Contact Section
              </p>
            </div>
            <ContactSection
              title="Where you can find me 👀"
              links={contactLinksPreview}
              formProps={{ idPrefix: "components-contact-section" }}
              className="mt-0"
            />
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Work Cards
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <WorkCard
                title={workTitle}
                client={workClient}
                aspect={workAspect}
                imageSrc={workImage}
                enabledTags={enabledTags}
                chipPalette={chipPalette}
              />
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--semantic-text-secondary)]">
                Showing {workAspect}
              </p>
            </div>
            <div className="mt-2 grid gap-4 rounded-lg border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/85 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--semantic-text-secondary)]">Work Card Controls</p>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[var(--semantic-text-secondary)]">
                  Title
                  <input
                    value={workTitle}
                    onChange={(event) => setWorkTitle(event.target.value)}
                    className="rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] px-3 py-2 text-sm uppercase tracking-[0.08em] text-[var(--semantic-text-primary)]"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[var(--semantic-text-secondary)]">
                  Subline
                  <input
                    value={workClient}
                    onChange={(event) => setWorkClient(event.target.value)}
                    className="rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] px-3 py-2 text-sm uppercase tracking-[0.08em] text-[var(--semantic-text-primary)]"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[var(--semantic-text-secondary)]">
                  Image URL
                  <input
                    value={workImage}
                    onChange={(event) => setWorkImage(event.target.value)}
                    className="rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] px-3 py-2 text-sm text-[var(--semantic-text-primary)]"
                  />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-1">
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[var(--semantic-text-secondary)]">
                  Aspect Ratio
                  <select
                    value={workAspect}
                    onChange={(event) =>
                      setWorkAspect(event.target.value as "9-16" | "3-4" | "1-1" | "3-2")
                    }
                    className="rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] px-3 py-2 text-sm uppercase tracking-[0.08em] text-[var(--semantic-text-primary)]"
                  >
                    <option value="9-16">9:16</option>
                    <option value="3-4">3:4</option>
                    <option value="1-1">1:1</option>
                    <option value="3-2">3:2</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-3">
                {chipState.map((chip, index) => (
                  <div
                    key={chip.key}
                    className="grid items-center gap-2 md:grid-cols-[auto_1fr_1fr_1fr]"
                  >
                    <label className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--semantic-text-secondary)]">
                      <input
                        type="checkbox"
                        checked={chip.enabled}
                        onChange={(event) =>
                          handleChipUpdate(index, { enabled: event.target.checked })
                        }
                      />
                      Show
                    </label>
                    <input
                      value={chip.label}
                      onChange={(event) => handleChipUpdate(index, { label: event.target.value })}
                      className="rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] px-3 py-2 text-sm text-[var(--semantic-text-primary)]"
                      placeholder="Label"
                    />
                    <input
                      value={chip.emoji}
                      onChange={(event) => handleChipUpdate(index, { emoji: event.target.value })}
                      className="rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] px-3 py-2 text-sm text-[var(--semantic-text-primary)]"
                      placeholder="Emoji"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={chip.color}
                        onChange={(event) =>
                          handleChipUpdate(index, { color: event.target.value })
                        }
                        className="h-9 w-12 cursor-pointer rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] p-1"
                        aria-label={`${chip.label} color`}
                      />
                      <input
                        value={chip.color}
                        onChange={(event) =>
                          handleChipUpdate(index, { color: event.target.value })
                        }
                        className="flex-1 rounded-md border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] px-3 py-2 text-sm text-[var(--semantic-text-primary)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Work Section
              </p>
            </div>
            <WorkSection
              className="mt-0"
              title="Some of my work 💼"
              ctaLabel="All Work"
              ctaUrl="#"
              cases={workSectionCases}
              animationDelayMs={0}
            />
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Competence Chip
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {chipState.map((chip) => (
                <CompetenceChip
                  key={`preview-${chip.key}`}
                  label={chip.label}
                  emoji={chip.emoji}
                  bgColor={chip.color}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Toggle
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Toggle />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Text Button
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <TextButton text="Lorem Ipsum" />
              <TextButton text="All Work" className="text-[var(--semantic-text-secondary)] gap-4" />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Nav Button
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <NavButton text="Lorem Ipsum" />
              <NavButton text="Lorem Ipsum" className="bg-[var(--semantic-border-default)]" />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]/75 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Footer
              </p>
            </div>
            <HomeFooter className="mt-0" />
          </div>
        </section>
    </ShowcasePageLayout>
  );
}
