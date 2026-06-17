"use client";

import { useState, type FormEvent } from "react";

export type ContactFormProps = {
  title?: string;
  to?: string;
  submitLabel?: string;
  idPrefix?: string;
};

type FieldConfig = {
  id: "name" | "email" | "message";
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
};

const defaultFields: FieldConfig[] = [
  { id: "name", label: "Name", placeholder: "Bilbo Baggins", type: "text", required: true },
  { id: "email", label: "Email", placeholder: "bilbo@bagend.shire", type: "email", required: true },
  { id: "message", label: "Message", placeholder: "Say something!", type: "textarea", required: true },
];

const labelClass =
  "input-text text-[var(--semantic-text-secondary)] leading-[1.25]";
const inputBaseClass =
  "rounded-lg bg-[var(--form-input-bg)] px-3 text-[var(--semantic-text-primary)] placeholder:text-[var(--semantic-text-primary)] placeholder:opacity-45 input-text";

export default function ContactForm({
  title = "Get in touch ✉️",
  to = "nicolasblunck@me.com",
  submitLabel = "Send",
  idPrefix = "contact",
}: ContactFormProps) {
  const [values, setValues] = useState<Record<FieldConfig["id"], string>>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = values.name ? `Hello from ${values.name}` : "Hello";
    const body = [values.message, values.email && `\n— ${values.email}`]
      .filter(Boolean)
      .join("");
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (typeof window !== "undefined") {
      window.location.href = href;
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <p className="text-body-xl">{title}</p>
      <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
        {defaultFields.map((field) => {
          const inputId = `${idPrefix}-${field.id}`;
          const setValue = (next: string) =>
            setValues((prev) => ({ ...prev, [field.id]: next }));

          return (
            <label key={field.id} className={field.type === "textarea" ? "flex flex-1 flex-col gap-2" : "flex flex-col gap-2"}>
              <span className={labelClass}>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  id={inputId}
                  name={field.id}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.id]}
                  onChange={(e) => setValue(e.target.value)}
                  className={`${inputBaseClass} min-h-[120px] flex-1 resize-none py-2`}
                />
              ) : (
                <input
                  id={inputId}
                  name={field.id}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.id]}
                  onChange={(e) => setValue(e.target.value)}
                  className={`${inputBaseClass} h-11`}
                />
              )}
            </label>
          );
        })}
        <button
          type="submit"
          className="text-button-md mt-1 inline-flex h-9 w-full items-center justify-center rounded-full bg-[var(--nav-button-bg)] px-3 text-[var(--semantic-text-primary)] transition-colors duration-200 hover:bg-[var(--olive-300)] active:bg-[var(--olive-300)]"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
