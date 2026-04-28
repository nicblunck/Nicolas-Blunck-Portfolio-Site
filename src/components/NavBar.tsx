"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import NavButton from "@/components/NavButton";
import Toggle from "@/components/Toggle";
import { useTheme } from "@/components/ThemeProvider";

type NavBarProps = {
  items: { label: string; href: string }[];
  shadow?: boolean;
  background?: boolean;
  variant?: "default" | "landing";
};

export default function NavBar({
  items,
  shadow = true,
  background = true,
  variant = "default",
}: NavBarProps) {
  const themeContext = useTheme();
  const isReady = themeContext?.isReady ?? false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href !== "#" && (pathname === href || (href !== "/" && pathname?.startsWith(href)));

  return (
    <div
      className={`relative mx-auto flex w-fit flex-col items-center rounded-[32px] ${
        background ? "bg-[var(--nav-bg)]" : ""
      } ${
        shadow ? "shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <div
        className={`flex w-full flex-col items-stretch overflow-hidden px-4 sm:hidden ${
          isMenuOpen ? "max-h-96 pt-4 pb-4" : "max-h-0"
        }`}
      >
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setIsMenuOpen(false)}
            className="flex justify-center py-1"
          >
            <NavButton
              text={item.label}
              className={variant === "landing" ? "nav-button--landing" : undefined}
            />
          </a>
        ))}
      </div>
      <div className="flex h-[52px] w-fit items-center justify-between gap-2 p-3 sm:h-[60px] sm:p-4">
        <div className="hidden items-center sm:flex sm:flex-1 sm:justify-center">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <NavButton
                text={item.label}
                className={variant === "landing" ? "nav-button--landing" : undefined}
              />
            </a>
          ))}
        </div>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-full sm:hidden"
        >
          <span className="flex w-5 flex-col items-center gap-1">
            <span className="h-[2px] w-5 bg-[var(--semantic-text-primary)]" />
            <span className="h-[2px] w-5 bg-[var(--semantic-text-primary)]" />
          </span>
        </button>
        {isReady && (
          <div className="flex h-full w-fit items-center pr-2 translate-y-[2px]">
            <Toggle />
          </div>
        )}
      </div>
    </div>
  );
}
