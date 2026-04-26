import ShowcasePageLayout from "@/components/ShowcasePageLayout";

const serifScale = [
  {
    label: "Display",
    size: "var(--font-size-display)",
    responsiveSize: "clamp(52px, 10vw, var(--font-size-display))",
    lineHeight: "var(--line-height-display)",
    letterSpacing: "var(--tracking-display-serif)",
  },
  {
    label: "H1",
    size: "var(--font-size-h1)",
    responsiveSize: "clamp(42px, 8vw, var(--font-size-h1))",
    lineHeight: "var(--line-height-h1)",
    letterSpacing: "var(--tracking-h1-serif)",
  },
  {
    label: "H2",
    size: "var(--font-size-h2)",
    responsiveSize: "clamp(34px, 6.5vw, var(--font-size-h2))",
    lineHeight: "var(--line-height-h2)",
    letterSpacing: "var(--tracking-h2-serif)",
  },
  {
    label: "H3",
    size: "var(--font-size-h3)",
    responsiveSize: "clamp(28px, 5.5vw, var(--font-size-h3))",
    lineHeight: "var(--line-height-h3)",
    letterSpacing: "var(--tracking-h3-serif)",
  },
  {
    label: "H4",
    size: "var(--font-size-h4)",
    responsiveSize: "clamp(22px, 4.5vw, var(--font-size-h4))",
    lineHeight: "var(--line-height-h4)",
    letterSpacing: "var(--tracking-h4-serif)",
  },
];

const sansScale = [
  {
    label: "Display",
    size: "var(--font-size-display)",
    responsiveSize: "clamp(44px, 9vw, var(--font-size-display))",
    lineHeight: "var(--line-height-display)",
    letterSpacing: "var(--tracking-display-sans)",
  },
  {
    label: "H1",
    size: "var(--font-size-h1)",
    responsiveSize: "clamp(36px, 7.5vw, var(--font-size-h1))",
    lineHeight: "var(--line-height-h1)",
    letterSpacing: "var(--tracking-h1-sans)",
  },
  {
    label: "H2",
    size: "var(--font-size-h2)",
    responsiveSize: "clamp(30px, 6.5vw, var(--font-size-h2))",
    lineHeight: "var(--line-height-h2)",
    letterSpacing: "var(--tracking-h2-sans)",
  },
  {
    label: "H3",
    size: "var(--font-size-h3)",
    responsiveSize: "clamp(24px, 5.5vw, var(--font-size-h3))",
    lineHeight: "var(--line-height-h3)",
    letterSpacing: "var(--tracking-h3-sans)",
  },
  {
    label: "H4",
    size: "var(--font-size-h4)",
    responsiveSize: "clamp(20px, 4.5vw, var(--font-size-h4))",
    lineHeight: "var(--line-height-h4)",
    letterSpacing: "var(--tracking-h4-sans)",
  },
  {
    label: "Body XL",
    size: "var(--font-size-body-xl)",
    responsiveSize: "var(--font-size-body-xl)",
    lineHeight: "var(--line-height-body-xl)",
    letterSpacing: "var(--tracking-body-xl)",
  },
  {
    label: "Body L",
    size: "var(--font-size-body-l)",
    responsiveSize: "var(--font-size-body-l)",
    lineHeight: "var(--line-height-body-l)",
    letterSpacing: "var(--tracking-body-l)",
  },
  {
    label: "Body M",
    size: "var(--font-size-body-m)",
    responsiveSize: "var(--font-size-body-m)",
    lineHeight: "var(--line-height-body-m)",
    letterSpacing: "var(--tracking-body-m)",
  },
  {
    label: "Body S",
    size: "var(--font-size-body-s)",
    responsiveSize: "var(--font-size-body-s)",
    lineHeight: "var(--line-height-body-s)",
    letterSpacing: "var(--tracking-body-s)",
  },
  {
    label: "Body XS",
    size: "var(--font-size-body-xs)",
    responsiveSize: "var(--font-size-body-xs)",
    lineHeight: "var(--line-height-body-xs)",
    letterSpacing: "var(--tracking-body-xs)",
  },
];

const colorRamps = [
  {
    title: "Olive",
    prefix: "olive",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
  {
    title: "Peach",
    prefix: "peach",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
  {
    title: "Neutral",
    prefix: "neutral",
    steps: ["0", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950", "1000"],
  },
];

const semanticColors = [
  { label: "bg-base", value: "var(--semantic-bg-base)" },
  { label: "bg-subtle", value: "var(--semantic-bg-subtle)" },
  { label: "bg-elevated", value: "var(--semantic-bg-elevated)" },
  { label: "text-primary", value: "var(--semantic-text-primary)" },
  { label: "text-secondary", value: "var(--semantic-text-secondary)" },
  { label: "text-tertiary", value: "var(--semantic-text-tertiary)" },
  { label: "accent", value: "var(--semantic-accent)" },
  { label: "border-default", value: "var(--semantic-border-default)" },
  { label: "border-strong", value: "var(--semantic-border-strong)" },
];

const spacingScale = [
  "1",
  "2",
  "4",
  "8",
  "12",
  "16",
  "24",
  "32",
  "48",
  "64",
  "80",
  "96",
  "128",
];

const radiusScale = ["none", "sm", "md", "lg", "xl", "2xl", "full"];

export default function StylesPage() {
  return (
    <ShowcasePageLayout eyebrow="Design System" title="Styles">
      <section className="-mt-2 mb-16">
        <h2 className="mb-6 text-sm uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
          Typography
        </h2>
        <div className="flex flex-col gap-12">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--semantic-text-tertiary)]">
              Instrument Serif
            </p>
            <div className="flex flex-col gap-4">
              {serifScale.map((item) => (
                <div key={`serif-${item.label}`}>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: item.responsiveSize,
                      lineHeight: item.lineHeight,
                      letterSpacing: item.letterSpacing,
                    }}
                  >
                    Lorem Ipsum
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--semantic-text-tertiary)]">
              Inter
            </p>
            <div className="flex flex-col gap-6">
              {sansScale.map((item) => (
                <div key={`sans-${item.label}`}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
                      {item.label}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
                      Regular · Semibold · Italic
                    </p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {[
                      { label: "Regular", weight: 400, style: "normal" },
                      { label: "Semibold", weight: 600, style: "normal" },
                      { label: "Italic", weight: 400, style: "italic" },
                    ].map((variant) => (
                      <p
                        key={`${item.label}-${variant.label}`}
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: item.responsiveSize,
                          lineHeight: item.lineHeight,
                          letterSpacing: item.letterSpacing,
                          fontWeight: variant.weight,
                          fontStyle: variant.style,
                        }}
                      >
                        Lorem Ipsum
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-sm uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
          Color Ramps
        </h2>
        <div className="flex flex-col gap-8">
          {colorRamps.map((ramp) => (
            <div key={ramp.title}>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--semantic-text-tertiary)]">
                {ramp.title}
              </p>
              <div className="flex flex-wrap gap-3">
                {ramp.steps.map((step) => (
                  <div key={`${ramp.prefix}-${step}`} className="flex flex-col items-center gap-2">
                    <div
                      className="h-14 w-14 border border-[var(--semantic-border-default)]"
                      style={{
                        backgroundColor: `var(--${ramp.prefix}-${step})`,
                        borderRadius: "var(--radius-sm)",
                      }}
                    />
                    <span className="text-[11px] text-[var(--semantic-text-tertiary)]">
                      {ramp.prefix}-{step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-sm uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
          Semantic Colors
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {semanticColors.map((token) => (
            <div
              key={token.label}
              className="flex items-center justify-between border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)] p-4"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <div>
                <p className="text-sm font-medium">{token.label}</p>
                <p className="text-xs text-[var(--semantic-text-tertiary)]">{token.value}</p>
              </div>
              {token.label.startsWith("text-") ? (
                <p className="text-sm font-medium" style={{ color: token.value }}>
                  Sample
                </p>
              ) : token.label.startsWith("border-") ? (
                <div
                  className="h-10 w-10 border-2"
                  style={{
                    borderColor: token.value,
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              ) : (
                <div
                  className="h-10 w-10 border border-[var(--semantic-border-default)]"
                  style={{
                    backgroundColor: token.value,
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-sm uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
          Spacing
        </h2>
        <div className="grid gap-3">
          {spacingScale.map((step) => (
            <div key={`space-${step}`} className="flex items-center gap-4">
              <div
                className="rounded-full bg-[var(--semantic-accent)]"
                style={{
                  width: `max(12px, var(--spacing-${step}))`,
                  height: `max(6px, var(--spacing-${step}))`,
                }}
              />
              <p className="text-sm text-[var(--semantic-text-secondary)]">
                {`spacing-${step} · var(--spacing-${step})`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-sm uppercase tracking-[0.2em] text-[var(--semantic-text-tertiary)]">
          Radius
        </h2>
        <div className="flex flex-wrap gap-4">
          {radiusScale.map((radius) => (
            <div
              key={`radius-${radius}`}
              className="flex h-24 w-24 flex-col items-center justify-center gap-3 border border-[var(--semantic-border-default)] bg-[var(--semantic-bg-elevated)]"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <div
                className="h-12 w-12 border border-[var(--semantic-border-strong)] bg-white"
                style={{ borderRadius: `var(--radius-${radius})` }}
              />
              <p className="text-xs text-[var(--semantic-text-tertiary)]">radius-{radius}</p>
            </div>
          ))}
        </div>
      </section>
    </ShowcasePageLayout>
  );
}
