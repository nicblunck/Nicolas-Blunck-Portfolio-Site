type TextButtonProps = {
  text: string;
  className?: string;
};

export default function TextButton({ text, className }: TextButtonProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[1.5rem] text-[var(--semantic-text-primary)] transition-[color,gap] duration-200 ease-out hover:gap-4 hover:text-[var(--semantic-text-secondary)] active:gap-4 active:text-[var(--semantic-text-secondary)] ${
        className ?? ""
      }`}
      style={{
        fontFamily: "var(--font-inter)",
        letterSpacing: "-0.04em",
      }}
    >
      <span>{text}</span>
      <span aria-hidden="true">→</span>
    </span>
  );
}
