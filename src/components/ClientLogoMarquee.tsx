type ClientLogo = {
  alt: string;
  src: string;
  mimeType?: string | null;
};

type ClientLogoMarqueeProps = {
  logos: ClientLogo[];
  /** Seconds for one full loop. */
  durationSeconds?: number;
  className?: string;
};

export default function ClientLogoMarquee({
  logos,
  durationSeconds = 26,
  className,
}: ClientLogoMarqueeProps) {
  const duration = `${durationSeconds}s`;
  const repeatCount = Math.max(2, Math.ceil(12 / Math.max(logos.length, 1)));
  const repeatedLogos = Array.from({ length: repeatCount }, () => logos).flat();

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      <style>{`
        @keyframes client-logo-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      <div
        className="flex w-max will-change-transform"
        style={{ animation: `client-logo-marquee ${duration} linear infinite` }}
      >
        <div className="flex gap-4 pr-4">
          {repeatedLogos.map((logo, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${logo.alt}-${index}`}
              className="flex h-32 w-32 flex-none items-center justify-center overflow-hidden rounded-[8px] p-4"
            >
              {logo.mimeType === "image/svg+xml" ? (
                <span
                  aria-label={logo.alt}
                  role="img"
                  className="block h-full w-full"
                  style={{
                    backgroundColor: "var(--semantic-text-secondary)",
                    WebkitMaskImage: `url(${logo.src})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskImage: `url(${logo.src})`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                  }}
                />
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-full object-contain"
                  draggable={false}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 pr-4" aria-hidden="true">
          {repeatedLogos.map((logo, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${logo.alt}-duplicate-${index}`}
              className="flex h-32 w-32 flex-none items-center justify-center overflow-hidden rounded-[8px] p-4"
            >
              {logo.mimeType === "image/svg+xml" ? (
                <span
                  aria-hidden="true"
                  className="block h-full w-full"
                  style={{
                    backgroundColor: "var(--semantic-text-secondary)",
                    WebkitMaskImage: `url(${logo.src})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskImage: `url(${logo.src})`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                  }}
                />
              ) : (
                <img
                  src={logo.src}
                  alt=""
                  className="h-full w-full object-contain"
                  draggable={false}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
