# Project Agent Notes

## Primary Target Platforms
- Safari (macOS)
- Safari (iOS)

## Implementation Guidance
- Prefer solutions that are stable on Safari/iOS Safari (layout, animations, scrolling).
- Avoid relying on browser behaviors that are known to differ on Safari (e.g., scroll/overflow edge cases, 100vh on iOS, aggressive `position: sticky` assumptions).
- When adding motion, keep `prefers-reduced-motion` in mind (and allow graceful disabling).
- Any asset or UI item deemed reusable should be added to the Components page.
- Always check first if there is an appropriate shadcn component to base a design on.
