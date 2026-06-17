import Link from "next/link";
import TextButton from "@/components/TextButton";
import WorkCard from "@/components/WorkCard";
import WorkMasonry from "@/components/WorkMasonry";
import type { CaseEntry, CoverMedia } from "@/lib/types";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slug";
import { HERO_REVEAL_DELAY_MS } from "@/constants/animations";

export type WorkSectionCase = CaseEntry;

type WorkSectionProps = {
  title?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  cases?: WorkSectionCase[];
  animationDelayMs?: number;
  className?: string;
};

function resolveCoverMedia(coverMedia?: CoverMedia) {
  const coverType = coverMedia?.coverType ?? "image";
  const coverUrl = coverMedia?.coverUrl;
  if (!coverUrl) return {};

  if (coverType === "video") {
    return { videoSrc: coverUrl };
  }

  if (coverType === "link") {
    const isVideo = /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(coverUrl);
    return isVideo ? { videoSrc: coverUrl } : { imageSrc: coverUrl };
  }

  return { imageSrc: coverUrl };
}

export default function WorkSection({
  title = "Some of my work 💼",
  ctaLabel = "All Work",
  ctaUrl = "#",
  cases = [],
  animationDelayMs = HERO_REVEAL_DELAY_MS,
  className,
}: WorkSectionProps) {
  const animationDelay = `${animationDelayMs}ms`;

  return (
    <section className={cn("mt-16 w-full", className)}>
      <div
        className="animate-fade-in flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        style={{ animationDelay }}
      >
        <p className="text-body-xl">{title}</p>
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
              .filter((competency) => Boolean(competency?.key && competency?.label))
              .map((competency) => ({
                key: competency.key,
                label: competency.label,
                emoji: competency.emoji ?? "",
                bgColor: competency.bg ?? "var(--semantic-bg-elevated)",
              }));

            const { imageSrc, videoSrc } = resolveCoverMedia(item.coverMedia);
            const caseSlug = item.slug || slugify(item.title);
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

            if (!workLink) return <div key={item.id}>{card}</div>;

            return (
              <Link key={item.id} href={workLink} className="block">
                {card}
              </Link>
            );
          })}
        </WorkMasonry>
      </div>
    </section>
  );
}
