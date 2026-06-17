import styles from "./case-page.module.css";
import { getCaseBySlug, getCaseSlugs } from "@/lib/cases";
import { contactLinks } from "@/constants/contactLinks";
import MetricCount from "@/components/MetricCount";
import ContactSection from "@/components/ContactSection";
import HomeFooter from "@/components/HomeFooter";
import NavBar from "@/components/NavBar";
import WorkSection from "@/components/WorkSection";
import ParallaxCover from "@/components/ParallaxCover";
import { Reveal } from "@/components/motion/Reveal";
import { navItems } from "@/constants/navItems";
import type { Metadata } from "next";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug ?? "";
  const caseEntry = getCaseBySlug(slug);
  const projectTitle = caseEntry?.title?.trim();

  return {
    title: projectTitle ? `Nic Blunck — Work — ${projectTitle}` : "Nic Blunck — Work",
  };
}

export default async function CasePage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug ?? "";
  const caseEntry = getCaseBySlug(slug);

  const blocks = caseEntry?.content ?? [];
  const relatedCases = (caseEntry?.relatedCases ?? []).filter(
    (item) => item.id !== caseEntry?.id
  );
  const coverType = caseEntry?.coverMedia?.coverType ?? "image";
  const coverUrl = caseEntry?.coverMedia?.coverUrl;
  const coverIsVideo =
    coverType === "video" ||
    (coverType === "link" && coverUrl && /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(coverUrl));
  const coverImageUrl = !coverIsVideo ? coverUrl ?? "" : "";
  const competencies = (caseEntry?.competencies ?? []).filter((item) => item?.label);

  return (
    <div id="main" className={styles.pageWrap}>
      <div className={styles.landingContainer}>
        <div className={styles.coverImage}>
          {coverUrl && (coverIsVideo || coverImageUrl) ? (
            <ParallaxCover
              isVideo={Boolean(coverIsVideo)}
              url={coverUrl}
              alt={[caseEntry?.title, caseEntry?.client].filter(Boolean).join(" — ")}
              mediaClassName={styles.coverMedia}
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
                    key={item.key}
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
            {caseEntry?.liveLink ? (
              <div className={styles.linkBar}>
                <p className={styles.linkBarText}>See it live here:</p>
                <a
                  className={styles.linkBarButton}
                  href={caseEntry.liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{caseEntry.liveLinkLabel ?? "Case Website"}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {blocks.map((block, blockIndex) => {
        if (block.type === "metrics") {
          const metrics = (block.metrics ?? []).filter((metric) => metric?.value || metric?.label);
          if (!metrics.length) return null;
          return (
            <Reveal key={`metrics-${blockIndex}`} className={styles.metricsSection}>
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
            </Reveal>
          );
        }

        if (block.type === "section") {
          const galleryItems = block.gallery ?? [];

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
                  if (item.type === "video") {
                    return (
                      <Reveal
                        key={`section-video-${blockIndex}-${index}`}
                        className={styles.sectionMediaItem}
                        y={32}
                      >
                        <video
                          className={styles.sectionMedia}
                          src={item.url}
                          muted
                          autoPlay
                          loop
                          playsInline
                          suppressHydrationWarning
                        />
                      </Reveal>
                    );
                  }

                  return (
                    <Reveal
                      key={`section-image-${blockIndex}-${index}`}
                      className={styles.sectionMediaItem}
                      y={32}
                    >
                      <img className={styles.sectionMedia} src={item.url} alt={item.alt ?? ""} />
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        }

        if (block.type === "quote") {
          if (!block.text) return null;
          return (
            <Reveal key={`quote-${blockIndex}`} className={styles.quoteBlock} y={32}>
              <p className={styles.quoteText}>"{block.text}"</p>
              <div className={styles.quoteMeta}>
                {block.author ? <p>{block.author}</p> : null}
                {block.role ? <p className={styles.quoteRole}>{block.role}</p> : null}
              </div>
            </Reveal>
          );
        }

        return null;
      })}

      <div className={styles.caseFooterWrap}>
        {relatedCases.length ? (
          <>
            <Reveal className={styles.caseOutro} y={32}>
              <span className={styles.caseOutroAccent}>That's it!</span> Why not check out another
              case?
            </Reveal>
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
            id: link.id,
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
