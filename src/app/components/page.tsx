 "use client";

import { useMemo, useState } from "react";
import NavBar from "@/components/NavBar";
import NavButton from "@/components/NavButton";
import TextButton from "@/components/TextButton";
import Toggle from "@/components/Toggle";
import WorkCard from "@/components/WorkCard";
import CompetenceChip from "@/components/CompetenceChip";

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

  const chipPalette = useMemo(() => {
    return chipState.reduce<Record<string, string>>((acc, chip) => {
      acc[chip.key] = chip.color;
      return acc;
    }, {});
  }, [chipState]);

  const handleChipUpdate = (index: number, next: Partial<(typeof chipState)[number]>) => {
    setChipState((prev) =>
      prev.map((chip, chipIndex) => (chipIndex === index ? { ...chip, ...next } : chip)),
    );
  };

  return (
    <main className="min-h-screen bg-[#f3f5f0] px-8 py-16 text-[#192500]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <header className="flex flex-col gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase text-[#334d23]"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.2em" }}
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </a>
          <p
            className="text-xs uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              letterSpacing: "0.2em",
              color: "#334d23",
            }}
          >
            Components
          </p>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "3rem",
              letterSpacing: "-0.02em",
            }}
          >
            UI Components
          </h1>
        </header>

        <section className="rounded-xl border border-[#e2eccc] bg-white/60 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "#334d23",
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

        <section className="rounded-xl border border-[#e2eccc] bg-white/60 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "#334d23",
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
              <p className="text-xs uppercase tracking-[0.2em] text-[#334d23]">
                Showing {workAspect}
              </p>
            </div>
            <div className="mt-2 grid gap-4 rounded-lg border border-[#e2eccc] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#334d23]">Work Card Controls</p>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[#334d23]">
                  Title
                  <input
                    value={workTitle}
                    onChange={(event) => setWorkTitle(event.target.value)}
                    className="rounded-md border border-[#e2eccc] bg-white px-3 py-2 text-sm uppercase tracking-[0.08em] text-[#192500]"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[#334d23]">
                  Subline
                  <input
                    value={workClient}
                    onChange={(event) => setWorkClient(event.target.value)}
                    className="rounded-md border border-[#e2eccc] bg-white px-3 py-2 text-sm uppercase tracking-[0.08em] text-[#192500]"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[#334d23]">
                  Image URL
                  <input
                    value={workImage}
                    onChange={(event) => setWorkImage(event.target.value)}
                    className="rounded-md border border-[#e2eccc] bg-white px-3 py-2 text-sm text-[#192500]"
                  />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-1">
                <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.12em] text-[#334d23]">
                  Aspect Ratio
                  <select
                    value={workAspect}
                    onChange={(event) =>
                      setWorkAspect(event.target.value as "9-16" | "3-4" | "1-1" | "3-2")
                    }
                    className="rounded-md border border-[#e2eccc] bg-white px-3 py-2 text-sm uppercase tracking-[0.08em] text-[#192500]"
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
                    <label className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#334d23]">
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
                      className="rounded-md border border-[#e2eccc] bg-white px-3 py-2 text-sm text-[#192500]"
                      placeholder="Label"
                    />
                    <input
                      value={chip.emoji}
                      onChange={(event) => handleChipUpdate(index, { emoji: event.target.value })}
                      className="rounded-md border border-[#e2eccc] bg-white px-3 py-2 text-sm text-[#192500]"
                      placeholder="Emoji"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={chip.color}
                        onChange={(event) =>
                          handleChipUpdate(index, { color: event.target.value })
                        }
                        className="h-9 w-12 cursor-pointer rounded-md border border-[#e2eccc] bg-white p-1"
                        aria-label={`${chip.label} color`}
                      />
                      <input
                        value={chip.color}
                        onChange={(event) =>
                          handleChipUpdate(index, { color: event.target.value })
                        }
                        className="flex-1 rounded-md border border-[#e2eccc] bg-white px-3 py-2 text-sm text-[#192500]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#e2eccc] bg-white/60 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "#334d23",
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

        <section className="rounded-xl border border-[#e2eccc] bg-white/60 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "#334d23",
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

        <section className="rounded-xl border border-[#e2eccc] bg-white/60 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "#334d23",
                }}
              >
                Text Button
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <TextButton text="Lorem Ipsum" />
              <TextButton text="All Work" className="text-[#334d23] gap-4" />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#e2eccc] bg-white/60 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.2em",
                  color: "#334d23",
                }}
              >
                Nav Button
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <NavButton text="Lorem Ipsum" />
              <NavButton text="Lorem Ipsum" className="bg-[#e2eccc]" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
