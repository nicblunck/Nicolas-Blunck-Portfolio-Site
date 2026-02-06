type ClientLogo = {
  alt: string;
  src: string;
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
          {logos.map((logo, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${logo.alt}-${index}`}
              className="flex h-32 w-32 flex-none items-center justify-center overflow-hidden rounded-[8px] bg-white p-4 shadow-[0px_4px_12px_rgba(25,37,0,0.08)]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-full object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 pr-4" aria-hidden="true">
          {logos.map((logo, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${logo.alt}-duplicate-${index}`}
              className="flex h-32 w-32 flex-none items-center justify-center overflow-hidden rounded-[8px] bg-white p-4 shadow-[0px_4px_12px_rgba(25,37,0,0.08)]"
            >
              <img
                src={logo.src}
                alt=""
                className="h-full w-full object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
