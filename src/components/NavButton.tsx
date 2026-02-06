type NavButtonProps = {
  text: string;
  className?: string;
};

export default function NavButton({ text, className }: NavButtonProps) {
  return (
    <span
      className={`nav-button inline-flex h-9 min-w-[96px] items-center justify-center rounded-full bg-[var(--nav-button-bg)] px-3 text-base text-[var(--semantic-text-primary)] transition-colors duration-200 hover:bg-[var(--olive-300)] active:bg-[var(--olive-300)] ${
        className ?? ""
      }`}
      style={{
        fontFamily: "var(--font-inter)",
        letterSpacing: "-0.04em",
      }}
    >
      {text}
    </span>
  );
}
