import ContactForm, { type ContactFormProps } from "@/components/ContactForm";
import { cn } from "@/lib/utils";

export type ContactLink = {
  id?: string;
  label: string;
  url: string;
  emoji?: string;
};

type ContactSectionProps = {
  title?: string;
  links?: ContactLink[];
  formProps?: ContactFormProps;
  className?: string;
};

export default function ContactSection({
  title = "Where you can find me 👀",
  links = [],
  formProps,
  className,
}: ContactSectionProps) {
  return (
    <section className={cn("mt-16 w-full", className)}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1.5rem",
              lineHeight: 1.25,
              letterSpacing: "-0.04em",
              color: "var(--semantic-text-primary)",
            }}
          >
            {title}
          </p>
          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <a
                key={link.id ?? `${link.label}-${index}`}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 transition-[color,gap] duration-200 ease-out hover:gap-4 hover:text-[var(--semantic-text-secondary)] active:gap-4 active:text-[var(--semantic-text-secondary)]"
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "3rem",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  color: "var(--semantic-text-primary)",
                }}
              >
                <span>
                  {link.label}
                  {link.emoji ? ` ${link.emoji}` : ""}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "3rem",
                    letterSpacing: "-0.04em",
                  }}
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm {...formProps} />
      </div>
    </section>
  );
}
