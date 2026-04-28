import styles from "./case-page.module.css";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { caseBySlugQuery, contactLinksQuery } from "@/sanity/queries";
import MetricCount from "@/components/MetricCount";
import ContactSection from "@/components/ContactSection";
import HomeFooter from "@/components/HomeFooter";
import NavBar from "@/components/NavBar";
import WorkSection from "@/components/WorkSection";
import type {
  CompetencyEntry,
  ContentBlock,
  ContactLinkEntry,
  CoverMedia,
} from "@/sanity/types";
import type { WorkSectionCase } from "@/components/WorkSection";
import type { Metadata } from "next";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug ?? "";
  const caseEntry = await client
    .fetch<{ title?: string } | null>(caseBySlugQuery, { slug })
    .catch(() => null);
  const projectTitle = caseEntry?.title?.trim();

  return {
    title: projectTitle ? `Nic Blunck — Work — ${projectTitle}` : "Nic Blunck — Work",
  };
}

export default async function CasePage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug ?? "";
  const navItems = [
    { label: "Work", href: "#" },
    { label: "Play", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Styles", href: "/styles" },
    { label: "Components", href: "/components" },
  ];
  const [caseEntry, contactLinks] = await Promise.all([
    client
      .fetch<{
        _id?: string;
        title?: string;
        client?: string;
        intro?: string;
        liveLink?: string;
        liveLinkLabel?: string;
        competencies?: CompetencyEntry[];
        coverMedia?: CoverMedia;
        content?: ContentBlock[];
        relatedCases?: WorkSectionCase[];
      } | null>(caseBySlugQuery, { slug })
      .catch(() => null),
    client.fetch<ContactLinkEntry[]>(contactLinksQuery).catch(() => []),
  ]);

  const blocks = caseEntry?.content ?? [];
  const relatedCases = (caseEntry?.relatedCases ?? []).filter(
    (item) => item._id !== caseEntry?._id
  );
  const coverType = caseEntry?.coverMedia?.coverType ?? "image";
  const coverImage = caseEntry?.coverMedia?.image;
  const coverVideo = caseEntry?.coverMedia?.videoUrl;
  const coverLink = caseEntry?.coverMedia?.link;
  const coverLinkIsVideo =
    coverType === "link" && coverLink
      ? /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(coverLink)
      : false;
  const coverImageUrl =
    coverType === "image" && coverImage
      ? urlFor(coverImage).width(2400).height(1500).url()
      : coverType === "link" && coverLink && !coverLinkIsVideo
        ? coverLink
        : coverType === "link" && coverImage
          ? urlFor(coverImage).width(2400).height(1500).url()
          : "";
  const competencies = (caseEntry?.competencies ?? []).filter((item) => item?.label);

  return (
    <div id="main" className={styles.pageWrap}>
      <div className={styles.landingContainer}>
        <div className={styles.coverImage}>
          {coverType === "video" && coverVideo ? (
            <video
              className={styles.coverMedia}
              src={coverVideo}
              muted
              autoPlay
              loop
              playsInline
              suppressHydrationWarning
            />
          ) : coverType === "link" && coverLinkIsVideo && coverLink ? (
            <video
              className={styles.coverMedia}
              src={coverLink}
              muted
              autoPlay
              loop
              playsInline
              suppressHydrationWarning
            />
          ) : coverImageUrl ? (
            <img
              className={styles.coverMedia}
              src={coverImageUrl}
              alt={[caseEntry?.title, caseEntry?.client].filter(Boolean).join(" — ")}
            />
          ) : (
            <div className={styles.coverFallback} />
          )}
        </div>
        <div className={styles.landingInfoContainer}>
          <div className={styles.infoContainerLeading}>
            <p className={styles.infoLeadingTitle}>{caseEntry?.title ?? ""}</p>
            <p className={styles.infoLeadingClient}>{caseEntry?.client ?? ""}</p>
            {competencies.length ? (
              <div className={styles.infoChips}>
                {competencies.map((item) => (
                  <span
                    key={item._id}
                    className={styles.infoChip}
                    style={{ backgroundColor: item.bg ?? "var(--neutral-0)" }}
                  >
                    <span className={styles.infoChipLabel}>{item.label ?? ""}</span>
                    <span className={styles.infoChipEmoji}>{item.emoji ?? ""}</span>
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className={styles.infoContainerTrailing}>
            {caseEntry?.intro ? <p className={styles.infoTrailingText}>{caseEntry.intro}</p> : null}
            <div className={styles.linkBar}>
              <p className={styles.linkBarText}>See it live here:</p>
              {caseEntry?.liveLink ? (
                <a
                  className={styles.linkBarButton}
                  href={caseEntry.liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{caseEntry.liveLinkLabel ?? "Case Website"}</span>
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {blocks.map((block, blockIndex) => {
        if (block._type === "caseMetrics") {
          const metrics = (block.metrics ?? []).filter((metric) => metric?.value || metric?.label);
          if (!metrics.length) return null;
          return (
            <section key={`metrics-${blockIndex}`} className={styles.metricsSection}>
              <div
                className={styles.metricsGrid}
                style={{ "--metrics-count": metrics.length } as React.CSSProperties}
              >
                {metrics.map((metric, index) => (
                  <div key={`${metric.label ?? "metric"}-${index}`} className={styles.metricItem}>
                    <MetricCount value={metric.value ?? ""} className={styles.metricValue} />
                    <p className={styles.metricLabel}>{metric.label ?? ""}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (block._type === "caseSection") {
          const galleryItems = (block.gallery ?? []).filter(
            (item): item is NonNullable<typeof item> => Boolean(item)
          );

          return (
            <div
              key={`section-${block.heading ?? "section"}-${blockIndex}`}
              className={styles.sectionContainer}
            >
              <div className={styles.sectionInnerLeading}>
                {block.heading ? (
                  <p className={styles.sectionLeadingTitle}>{block.heading}</p>
                ) : null}
                {block.body ? <p className={styles.sectionLeadingBody}>{block.body}</p> : null}
              </div>
              <div className={styles.sectionInnerTrailing}>
                {galleryItems.map((item, index) => {
                  const videoUrl = item.video?.asset?.url;
                  if (item.mediaType === "video" && videoUrl) {
                    return (
                      <div
                        key={item._id ?? `section-video-${blockIndex}-${index}`}
                        className={styles.sectionMediaItem}
                      >
                        <video
                          className={styles.sectionMedia}
                          src={videoUrl}
                          muted
                          autoPlay
                          loop
                          playsInline
                          suppressHydrationWarning
                        />
                      </div>
                    );
                  }

                  const imageUrl =
                    item.mediaType === "image" && item.image
                      ? urlFor(item.image).width(2400).auto("format").url()
                      : "";
                  if (!imageUrl) return null;
                  return (
                    <div
                      key={item._id ?? `section-image-${blockIndex}-${index}`}
                      className={styles.sectionMediaItem}
                    >
                      <img className={styles.sectionMedia} src={imageUrl} alt={item.alt ?? ""} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (block._type === "caseQuote") {
          if (!block.text) return null;
          return (
            <section key={`quote-${blockIndex}`} className={styles.quoteBlock}>
              <p className={styles.quoteText}>"{block.text}"</p>
              <div className={styles.quoteMeta}>
                {block.author ? <p>{block.author}</p> : null}
                {block.role ? <p className={styles.quoteRole}>{block.role}</p> : null}
              </div>
            </section>
          );
        }

        return null;
      })}

      <div className={styles.caseFooterWrap}>
        {relatedCases.length ? (
          <>
            <div className={styles.caseOutro}>
              <span className={styles.caseOutroAccent}>That's it!</span> Why not check out another
              case?
            </div>
            <WorkSection
              title="Some of my work 💼"
              ctaLabel="All Work"
              ctaUrl="#"
              cases={relatedCases}
              className="mb-20"
            />
          </>
        ) : null}
        <ContactSection
          className="mt-0"
          links={contactLinks.map((link) => ({
            id: link._id,
            label: link.label,
            url: link.url,
            emoji: link.emoji,
          }))}
          formProps={{ idPrefix: `case-contact-${slug || "case"}` }}
        />
        <HomeFooter />
      </div>

      <div className={styles.caseNav}>
        <NavBar items={navItems} />
      </div>
    </div>
  );
}
