# Case studies

Case studies are local content — no CMS, no API token, no network fetch.
Each case is a folder under `public/work/<slug>/` containing a `case.md`
file plus whatever media that case references.

```
public/work/backe-backe-pizza/
  case.md
  cover.mp4
  gallery-1.jpg
  gallery-2.jpg
```

Reference media from `case.md` with a root-relative path, e.g.
`/work/backe-backe-pizza/cover.mp4`.

## `case.md` format

Everything is YAML frontmatter — `gray-matter` parses it in
`src/lib/cases.ts`. The body of the file (below the `---` fences) isn't
rendered; use it for your own notes if you want.

```md
---
title: Backe, Backe Pizza
client: Gustavo Gusto x Deine Freunde
slug: backe-backe-pizza
aspect: "9-16"        # 9-16 | 3-4 | 1-1 | 3-2
role: Art Direction, Motion
status: draft           # draft | published — defaults to draft if omitted
featured: true
order: 1               # lower sorts first; ties break by title
competencies: [art-direction, motion, illustration]
coverType: video        # image | video | link
coverUrl: /work/backe-backe-pizza/cover.mp4
liveLink: https://example.com
liveLinkLabel: Watch the video
intro: A short blurb shown next to the cover.
content:
  - type: section
    heading: The Challenge
    body: Long-form paragraph for this section.
    gallery:
      - type: image
        url: /work/backe-backe-pizza/gallery-1.jpg
        alt: Description for accessibility
      - type: video
        url: /work/backe-backe-pizza/gallery-2.mp4
  - type: metrics
    metrics:
      - value: "1.2M"
        label: Views
      - value: "50%"
        label: Increase in retention
  - type: quote
    text: "Great work!"
    author: Jane Doe
    role: CEO, Deine Freunde
---
```

- `competencies` keys must match an entry in
  `src/constants/competencies.ts` (`competencyByKey`); unknown keys are
  silently dropped.
- Only `featured: true` **and** `status: published` cases appear in the
  homepage `WorkSection` and as "related cases" on other case pages —
  every case still gets its own `/work/<slug>` page regardless of status.
- `content` blocks map directly to `ContentBlock` in `src/lib/types.ts`
  (`metrics` / `section` / `quote`) — same shapes the case page already
  renders.

## Draft vs. published

`status` defaults to `draft` if omitted — a case has to opt in to
`status: published` to show up anywhere public. Drafts:
- Never appear in the homepage work section or as related cases.
- Still render at `/work/<slug>` (with a "Draft" badge) so you can share
  the link for review before publishing.
- Are listed at the unlisted `/work/drafts` page (not in nav, marked
  `noindex`) so you don't have to remember slugs.

Flip `status: published` when a case is ready to go live.

## Adding a case

1. Create `public/work/<slug>/`, drop in the media.
2. Write `case.md` using the format above (it starts as a draft by
   default).
3. Run `npx tsc --noEmit` / `npm run build` to confirm it picks up.
4. Set `status: published` when it's ready to be public.

No env vars, no revalidation endpoint, no rotating tokens — content ships
with the repo and goes live on deploy.
