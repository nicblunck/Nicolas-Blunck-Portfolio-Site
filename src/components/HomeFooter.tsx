import TextButton from "@/components/TextButton";
import { cn } from "@/lib/utils";

type FooterLink = {
  label: string;
  href: string;
};

type SignatureLine = {
  text: string;
  emphasis?: string;
};

type HomeFooterProps = {
  aboutTitle?: string;
  aboutText?: string;
  quickLinksTitle?: string;
  quickLinks?: FooterLink[];
  signatureEmoji?: string;
  signatureLines?: SignatureLine[];
  className?: string;
};

const defaultAboutText =
  "Hi there, I'm Nicolas Blunck 👋 I approach design as storytelling, using craft to transform abstract ideas into experiences people can feel. My work is defined by clarity, playfulness, and an ability to translate complex concepts into simple, engaging narratives. Collaboration sits at the center of my process, ensuring every project grows from strong ideas into memorable outcomes.";

const defaultQuickLinks: FooterLink[] = [
  { label: "Work", href: "#" },
  { label: "Play", href: "#" },
];

const defaultSignatureLines: SignatureLine[] = [
  { text: "Made on ", emphasis: "Earth" },
  { text: "By an ", emphasis: "Earthling" },
];

export default function HomeFooter({
  aboutTitle = "About 💬",
  aboutText = defaultAboutText,
  quickLinksTitle = "Quick Links 🔗",
  quickLinks = defaultQuickLinks,
  signatureEmoji = "🌍 + 🍑",
  signatureLines = defaultSignatureLines,
  className,
}: HomeFooterProps) {
  return (
    <footer className={cn("mt-16 w-full", className)}>
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-start">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-label">{aboutTitle}</p>
          <p className="text-footer-body">{aboutText}</p>
        </div>
        <div className="flex flex-1 flex-col items-start gap-[2px] md:items-end">
          <p className="text-label">{quickLinksTitle}</p>
          <div className="flex flex-col items-start gap-[2px] md:items-end">
            {quickLinks.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href}>
                <TextButton
                  text={link.label}
                  className="text-[12px] text-[var(--semantic-text-tertiary)]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center gap-1 text-center">
        <p className="text-body-xl text-[var(--semantic-text-tertiary)]">{signatureEmoji}</p>
        {signatureLines.map((line, index) => (
          <p key={`${line.text}-${index}`} className="text-footer-body">
            {line.text}
            {line.emphasis ? (
              <span className="font-semibold text-[var(--semantic-text-secondary)]">
                {line.emphasis}
              </span>
            ) : null}
          </p>
        ))}
      </div>
    </footer>
  );
}
