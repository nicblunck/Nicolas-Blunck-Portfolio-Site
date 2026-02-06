"use client";

import { useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";

type ToggleProps = {
  state?: "day" | "night";
  className?: string;
  onToggle?: (state: "day" | "night") => void;
};

export default function Toggle({
  state = "day",
  className,
  onToggle,
}: ToggleProps) {
  const themeContext = useTheme();
  const theme = themeContext?.theme;
  const setTheme = themeContext?.setTheme;
  const [localState, setLocalState] = useState<"day" | "night">(state);
  const isControlled = typeof onToggle === "function";
  const isThemeControlled = Boolean(theme && setTheme);
  const effectiveState = isControlled
    ? state
    : isThemeControlled
      ? theme === "dark"
        ? "night"
        : "day"
      : localState;
  const isNight = effectiveState === "night";

  return (
    <div className={`relative ${className ?? ""}`}>
      <Switch
        checked={isNight}
        onCheckedChange={(checked) => {
          const next = checked ? "night" : "day";
          if (isControlled) {
            onToggle?.(next);
          } else if (isThemeControlled) {
            setTheme?.(next === "night" ? "dark" : "light");
          } else {
            setLocalState(next);
          }
        }}
        aria-label="Toggle theme"
        className="data-[state=unchecked]:bg-[var(--form-input-bg)] data-[state=checked]:bg-[var(--form-input-bg)] [&>span]:bg-[var(--olive-50)]"
      />
      <span
        className={`pointer-events-none absolute left-[2px] top-[2px] flex h-4 w-4 items-center justify-center transition-transform duration-200 ease-in-out ${
          isNight ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isNight ? (
          <Moon size={12} weight="fill" className="text-[var(--olive-400)]" />
        ) : (
          <Sun size={12} weight="fill" className="text-[var(--peach-400)]" />
        )}
      </span>
    </div>
  );
}
