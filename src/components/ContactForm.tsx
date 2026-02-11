"use client";

export type ContactFormProps = {
  title?: string;
  action?: string;
  submitLabel?: string;
  idPrefix?: string;
};

const defaultFields = [
  { label: "Name", placeholder: "Bilbo Baggins", type: "text", id: "name" },
  { label: "Email", placeholder: "bilbo@bagend.shire", type: "email", id: "email" },
];

export default function ContactForm({
  title = "Get in touch ✉️",
  action = "#",
  submitLabel = "Send",
  idPrefix = "contact",
}: ContactFormProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <p
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
      <form className="flex flex-1 flex-col gap-4" action={action}>
        {defaultFields.map((field) => (
          <label key={field.id} className="flex flex-col gap-2">
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                color: "var(--semantic-text-secondary)",
              }}
            >
              {field.label}
            </span>
            <input
              id={`${idPrefix}-${field.id}`}
              type={field.type}
              placeholder={field.placeholder}
              className="h-11 rounded-lg bg-[var(--form-input-bg)] px-3 text-[var(--semantic-text-primary)] placeholder:text-[var(--semantic-text-primary)] placeholder:opacity-45"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            />
          </label>
        ))}
        <label className="flex flex-1 flex-col gap-2">
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: "var(--semantic-text-secondary)",
            }}
          >
            Message
          </span>
          <textarea
            id={`${idPrefix}-message`}
            placeholder="Say something!"
            className="min-h-[120px] flex-1 resize-none rounded-lg bg-[var(--form-input-bg)] px-3 py-2 text-[var(--semantic-text-primary)] placeholder:text-[var(--semantic-text-primary)] placeholder:opacity-45"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          />
        </label>
        <button
          type="submit"
          className="mt-1 inline-flex h-9 w-full items-center justify-center rounded-full bg-[var(--nav-button-bg)] px-3 text-[var(--semantic-text-primary)] transition-colors duration-200 hover:bg-[var(--olive-300)] active:bg-[var(--olive-300)]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "1rem",
            letterSpacing: "-0.04em",
          }}
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
