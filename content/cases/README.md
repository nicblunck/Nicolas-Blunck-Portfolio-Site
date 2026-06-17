# Case studies

Each `.md` file in this folder becomes a case page at `/work/<filename>`.
Create a new file → get a new case page. No code changes needed.

## Frontmatter (YAML)

```yaml
---
title: Backe, Backe Pizza          # required
client: Gustavo Gusto × Deine Freunde
aspect: "3-2"                       # card shape: 9-16 | 3-4 | 1-1 | 3-2 (default 3-2)
featured: true                     # show on the homepage work grid (default true)
draft: true                        # hide from homepage & related; still viewable at its URL
order: 1                           # sort order on the homepage (lower = first)
competencies:                      # keys from src/constants/competencies.ts
  - art-direction                  # art-direction | ui | ux | motion | illustration | branding
  - motion
  - branding
cover: /work/gustavo-gusto/cover.mp4   # hero media; .mp4/.webm/.mov/.ogg auto-render as video
intro: >-
  One or two sentences shown next to the title.
liveLink: https://example.com      # optional — shows a "See it live here" button
liveLinkLabel: Case Website        # optional button label
metrics:                           # optional — renders a big-number row near the top
  - value: "2M+"
    label: Views
---
```

## Body

The markdown body becomes the scrolling content, parsed in order:

- `## Heading` starts a new section. Text under it is the section blurb.
- `![alt text](/work/<slug>/file.webp)` adds media to the current section's
  gallery. Files ending in `.mp4` / `.webm` / `.mov` / `.ogg` render as
  autoplaying, muted, looping video; everything else renders as an image.
- `> quote text` renders a pull quote. Add attribution on its own line:
  `> — Author Name, Role`.

```markdown
## The film

A music video built around the campaign song.

![](/work/gustavo-gusto/music-video.mp4)

## On the table

![Margherita pizza](/work/gustavo-gusto/margherita.webp)

> It turned a frozen pizza into an event.
> — Client Name, Marketing Lead
```

## Media

Put assets in `public/work/<slug>/` and reference them as `/work/<slug>/...`.
Keep videos web-optimized (H.264 MP4, ~1280px, faststart). Tall/vertical clips
render full-width and get very tall — prefer landscape or square for galleries.
Raw originals don't belong in `public/` (they're gitignored).
