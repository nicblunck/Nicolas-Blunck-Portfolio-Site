import Link from "next/link";
import TextButton from "@/components/TextButton";
import WorkCard from "@/components/WorkCard";
import WorkMasonry from "@/components/WorkMasonry";
import type { CaseEntry, CoverMedia } from "@/lib/types";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slug";
import { Reveal } from "@/components/motion/Reveal";

export type WorkSectionCase = CaseEntry;

type WorkSectionProps = {
  title?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  cases?: WorkSectionCase[];
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
  className,
}: WorkSectionProps) {
  const showCta = Boolean(ctaLabel && ctaUrl);
  const showHeader = Boolean(title) || showCta;

  return (
    <section className={cn("mt-16 w-full", className)}>
      {showHeader ? (
        <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {title ? <p className="text-body-xl">{title}</p> : <span />}
          {showCta ? (
            <a href={ctaUrl}>
              <TextButton text={ctaLabel} />
            </a>
          ) : null}
        </Reveal>
      ) : null}
      <div className={cn("relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-[32px]", showHeader && "mt-6")}>
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
              />
            );

            const inner = workLink ? (
              <Link href={workLink} className="block">
                {card}
              </Link>
            ) : (
              card
            );

            return (
              <Reveal key={item.id} className="mb-4" y={28}>
                {inner}
              </Reveal>
            );
          })}
        </WorkMasonry>
      </div>
    </section>
  );
}
