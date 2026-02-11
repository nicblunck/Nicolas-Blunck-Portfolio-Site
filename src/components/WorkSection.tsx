import Link from "next/link";
import TextButton from "@/components/TextButton";
import WorkCard from "@/components/WorkCard";
import WorkMasonry from "@/components/WorkMasonry";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

export type WorkSectionCase = {
  _id: string;
  title?: string;
  client?: string;
  slug?: { current?: string };
  slugValue?: string;
  aspect?: "9-16" | "3-4" | "1-1" | "3-2";
  competencies?: CompetencyEntry[];
  coverMedia?: {
    coverType?: "image" | "video" | "link";
    image?: unknown;
    videoUrl?: string;
    link?: string;
  };
};

type CompetencyEntry = {
  _id: string;
  key?: string;
  label?: string;
  emoji?: string;
  bg?: string;
};

type WorkSectionProps = {
  title?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  cases?: WorkSectionCase[];
  animationDelayMs?: number;
  className?: string;
};

function deriveSlug(input?: string) {
  if (!input) return "";
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveImageUrl(image?: unknown) {
  if (!image) return "";
  if (typeof image === "string") return image;
  return urlFor(image).width(1200).height(1200).url();
}

function resolveCoverMedia(coverMedia?: WorkSectionCase["coverMedia"]) {
  const coverType = coverMedia?.coverType ?? "image";
  const coverImage = coverMedia?.image;
  const coverVideo = coverMedia?.videoUrl;
  const coverLink = coverMedia?.link;
  const linkIsVideo = coverLink
    ? /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(coverLink)
    : false;
  const linkIsImage = coverLink
    ? /\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i.test(coverLink)
    : false;

  if (coverType === "video") {
    return { videoSrc: coverVideo };
  }

  if (coverType === "link" && coverLink) {
    if (linkIsVideo) return { videoSrc: coverLink };
    if (linkIsImage) return { imageSrc: coverLink };
    if (coverImage) return { imageSrc: resolveImageUrl(coverImage) };
    return {};
  }

  return { imageSrc: resolveImageUrl(coverImage) };
}

export default function WorkSection({
  title = "Some of my work 💼",
  ctaLabel = "All Work",
  ctaUrl = "#",
  cases = [],
  animationDelayMs = 1300,
  className,
}: WorkSectionProps) {
  const animationDelay = `${animationDelayMs}ms`;

  return (
    <section className={cn("mt-16 w-full", className)}>
      <div
        className="animate-fade-in flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        style={{ animationDelay }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "1.5rem",
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </p>
        <a href={ctaUrl}>
          <TextButton text={ctaLabel} />
        </a>
      </div>
      <div
        className="animate-fade-in relative left-1/2 mt-6 w-screen -translate-x-1/2 px-[32px]"
        style={{ animationDelay }}
      >
        <WorkMasonry>
          {cases.map((item) => {
            const cardTags = (item.competencies ?? [])
              .filter((competency): competency is CompetencyEntry =>
                Boolean(competency?.key && competency?.label)
              )
              .map((competency) => ({
                key: competency.key ?? competency.label ?? "competency",
                label: competency.label ?? "Competency",
                emoji: competency.emoji ?? "",
                bgColor: competency.bg ?? "var(--semantic-bg-elevated)",
              }));

            const { imageSrc, videoSrc } = resolveCoverMedia(item.coverMedia);
            const caseSlug = item.slugValue ?? item.slug?.current ?? deriveSlug(item.title ?? "");
            const workLink = caseSlug ? `/work/${caseSlug}` : undefined;

            const card = (
              <WorkCard
                title={item.title ?? ""}
                client={item.client ?? ""}
                aspect={item.aspect ?? "3-2"}
                imageSrc={imageSrc}
                videoSrc={videoSrc}
                tags={cardTags}
                className="mb-4"
              />
            );

            if (!workLink) return <div key={item._id}>{card}</div>;

            return (
              <Link key={item._id} href={workLink} className="block">
                {card}
              </Link>
            );
          })}
        </WorkMasonry>
      </div>
    </section>
  );
}
