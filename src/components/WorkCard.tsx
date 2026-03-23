import CompetenceChip from "@/components/CompetenceChip";

type WorkCardProps = {
  title: string;
  client: string;
  aspect: "9-16" | "3-4" | "1-1" | "3-2";
  state?: "default" | "hover";
  imageSrc?: string;
  videoSrc?: string;
  tags?: Array<{ key: TagKey; label: string; emoji: string; bgColor: string }>;
  enabledTags?: Partial<Record<TagKey, boolean>>;
  chipPalette?: Partial<Record<TagKey, string>>;
  className?: string;
};

const defaultImage =
  "https://www.figma.com/api/mcp/asset/8010730a-a532-4ea8-b490-a755433bed02";

const aspectClassMap: Record<WorkCardProps["aspect"], string> = {
  "9-16": "aspect-[9/16]",
  "3-4": "aspect-[3/4]",
  "1-1": "aspect-[1/1]",
  "3-2": "aspect-[3/2]",
};

type TagKey = string;

const defaultTags: Array<{ key: TagKey; label: string; emoji: string; bgColor: string }> = [
  { key: "art-direction", label: "Art Direction", emoji: "🎨", bgColor: "#d8e2b8" },
  { key: "ui", label: "UI", emoji: "📱", bgColor: "#ffd4c7" },
  { key: "ux", label: "UX", emoji: "🧭", bgColor: "#cbebff" },
  { key: "motion", label: "Motion", emoji: "🏃", bgColor: "#fdcfcf" },
  { key: "illustration", label: "Illustration", emoji: "🖌", bgColor: "#fedab8" },
  { key: "branding", label: "Branding", emoji: "🪧", bgColor: "#fdf9c1" },
];

export default function WorkCard({
  title,
  client,
  aspect,
  state = "default",
  imageSrc = defaultImage,
  videoSrc,
  tags,
  enabledTags,
  chipPalette,
  className,
}: WorkCardProps) {
  const isControlled = state !== "default";
  const isHovered = state === "hover";
  const allTags = tags ?? defaultTags;
  const visibleTags = enabledTags
    ? allTags.filter((tag) => enabledTags[tag.key] === true)
    : allTags;

  return (
    <article
      className={`group relative flex w-full flex-col items-start justify-end gap-2.5 overflow-hidden rounded-lg ${
        aspectClassMap[aspect]
      } ${className ?? ""}`}
      style={{ backgroundImage: "none" }}
    >
      {!videoSrc && imageSrc ? (
        <img
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={imageSrc}
          alt=""
          aria-hidden="true"
        />
      ) : null}
      {videoSrc ? (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          muted
          autoPlay
          loop
          playsInline
          aria-hidden="true"
          suppressHydrationWarning
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : null}
      <div
        className={`relative z-10 flex w-full flex-1 flex-col items-start justify-between p-4 ${
          isHovered ? "bg-[rgba(15,21,0,0.35)]" : "bg-[#f3f5f073]"
        } ${isControlled ? "" : "transition-colors duration-300 group-hover:bg-[rgba(15,21,0,0.35)]"}`}
      >
        <header className="flex w-full flex-col items-start">
          <h1
            className={`mt-[-1px] w-full font-[var(--font-instrument-serif)] text-[32px] font-normal leading-8 tracking-[-0.64px] ${
              isHovered ? "text-[#f3f5f0]" : "text-[#192500]"
            } ${isControlled ? "" : "transition-colors duration-300 group-hover:text-[#f3f5f0]"}`}
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            {title}
          </h1>
          <h2
            className={`w-full font-[var(--font-instrument-serif)] text-[32px] font-normal leading-8 tracking-[-0.64px] ${
              isHovered ? "text-[#d8e2b8]" : "text-[#334c22]"
            } ${isControlled ? "" : "transition-colors duration-300 group-hover:text-[#d8e2b8]"}`}
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            {client}
          </h2>
        </header>

        <div
          className="flex w-full flex-wrap items-end gap-[4px_4px]"
          role="list"
          aria-label="Project tags"
        >
          {visibleTags.map((tag) => (
            <div key={tag.key} role="listitem">
              <CompetenceChip
                label={tag.label}
                emoji={tag.emoji}
                bgColor={chipPalette?.[tag.key] ?? tag.bgColor}
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
