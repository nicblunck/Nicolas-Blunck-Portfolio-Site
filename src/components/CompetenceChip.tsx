type CompetenceChipProps = {
  label: string;
  emoji: string;
  bgColor?: string;
  className?: string;
};

export default function CompetenceChip({
  label,
  emoji,
  bgColor = "#d8e2b8",
  className,
}: CompetenceChipProps) {
  return (
    <div
      className={`inline-flex h-8 items-center justify-center gap-2 overflow-hidden rounded-lg px-2 py-1 ${
        className ?? ""
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="whitespace-nowrap font-[var(--font-inter)] text-base font-normal tracking-[-0.64px] text-[#192500]">
        {label}
      </div>
      <div className="whitespace-nowrap font-[var(--font-inter)] text-base font-normal tracking-[0] text-[#182500]">
        {emoji}
      </div>
    </div>
  );
}

