# Handoff: Replace Sanity with Craft (live backend via ISR)

> Read this first. It captures every decision already made so you can continue
> without re-litigating. Written for a fresh Claude Code session that boots on an
> **allowlisted** environment.

## Goal
Remove Sanity entirely. Drive **case studies** from the user's **Craft** space via
its Space API, fetched at runtime with **ISR**. First deliverable: a "Backe, Backe
Pizza" case study (Gustavo Gusto × Deine Freunde AR music video) rendered through
the existing `work/[slug]` layout.

## Decisions already locked (do NOT re-ask)
- **Architecture:** Live fetch / **ISR**. Craft is the live backend; pages
  `export const revalidate`. No webhooks exist in Craft, so also add a
  secret-protected on-demand revalidate route for instant refresh.
- **Content model:** A structured **Craft "Cases" collection** (typed columns),
  one row per case. The row body holds long-form blocks.
- **Non-case content** (competencies, client logos, contact links): move to simple
  **repo data files / constants** — NOT Craft. Only cases come from Craft.
- **Media:** User provides Backe Backe Pizza assets. Put them in
  `public/work/backe-backe-pizza/` and reference by path (keep large video out of
  Craft).
- **Branch:** `claude/nifty-planck-vvdjbb`. Open work as a **draft PR**.

## Craft Space API — essentials
- **Base URL:** `https://connect.craft.do/links/4CzEKnYRKSV/api/v1`
- **Auth:** `Authorization: Bearer <CRAFT_API_TOKEN>` — server-side only.
  The token is a secret (a `pdk_…` key). The user will provide it as an env var
  `CRAFT_API_TOKEN`. **It was shared in plaintext chat earlier — remind the user to
  rotate it in Craft once wired up.** Never commit it.
- **Content format:** `GET /blocks` returns JSON blocks or, with
  `Accept: text/markdown`, rendered Markdown.
- **Key endpoints:**
  - `GET /folders` — discover locations (use to smoke-test access first).
  - `GET /documents?location=…` — list docs; ids == root block ids.
  - `GET /blocks?id={docId}&maxDepth=-1` — fetch a doc's content.
  - Collections: `GET/POST /collections`, `GET/PUT /collections/{id}/schema`,
    `GET/POST/PATCH/DELETE` collection items.
  - `GET /documents/search`, tasks, whiteboards, `POST /files` (Upload File),
    `GET /connection` (Get Connection Info).
- **No webhooks** — automation = polling/ISR timer or manual trigger.
- Markdown supports Craft extensions: `<page>`, `<callout>`, `<highlight>`,
  `<caption>`, `==highlight==`, `[text](block://id)`, `$latex$`, 2-space nesting,
  and output-only `<collection>/<collectionItem>/<property>` tags.

## STEP 0 — Verify egress (do this first)
```bash
curl -s -m 30 -w "\n[HTTP %{http_code}]\n" \
  -H "Authorization: Bearer $CRAFT_API_TOKEN" \
  https://connect.craft.do/links/4CzEKnYRKSV/api/v1/folders
```
- `200` + JSON → allowlist is live, proceed.
- `403 Host not in allowlist` → environment is NOT allowlisted. The user must edit
  the environment → **Network access → Custom**, add `connect.craft.do`,
  `res.luki.io`, `r.craft.do`, keep **"include default package managers"** ticked,
  save, and **start a new session** (changes only apply at boot).

## Implementation plan (once egress confirmed)
1. **Inspect the space:** `GET /folders`, `GET /documents`, find/confirm a "Cases"
   collection. If absent, create it (`POST /collections`) with columns:
   `title, slug, client, role, featured(bool), aspect(9-16|3-4|1-1|3-2),
   competencies, coverType(image|video|link), coverUrl, liveLink, liveLinkLabel,
   intro`. Body blocks = sections/quote/metrics via a heading convention.
2. **Data layer:** `src/lib/craft.ts` (server-only) — typed `craftFetch`, plus
   `getCases()` and `getCaseBySlug(slug)` mapping Craft JSON → existing
   `CaseEntry` / `ContentBlock` shapes so the layout barely changes.
   Move types to `src/lib/types.ts`.
3. **ISR:** `export const revalidate = 600` on `src/app/page.tsx` and
   `src/app/work/[slug]/page.tsx`; add `src/app/api/revalidate/route.ts`
   (secret-guarded) for manual refresh.
4. **Rip out Sanity:** delete `src/sanity/**`, `src/app/studio/**`,
   `sanity.config.ts`, `sanity.cli.ts`, `.sanity/`; strip `sanity`,
   `next-sanity`, `@sanity/*` deps and `NEXT_PUBLIC_SANITY_*` env. Update
   `src/app/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/components/WorkSection.tsx`
   (drop `urlFor`; cover images are plain string URLs — `resolveImageUrl` already
   handles strings).
5. **Non-case content → repo:** competencies (reuse `fallbackCompetencies`),
   client logos, contact links as data files/constants.
6. **Backe Backe Pizza case:** add the row in Craft; place user-provided media in
   `public/work/backe-backe-pizza/`; verify the page renders.
7. **Verify:** `npm run lint` + `npm run build`; open/refresh the draft PR.

## Files that currently touch Sanity (your edit/remove surface)
- `src/app/page.tsx`, `src/app/work/[slug]/page.tsx`
- `src/components/WorkSection.tsx`
- `src/sanity/**` (env, client, image, queries, types, schemaTypes, structure, lib/live)
- `src/app/studio/[[...tool]]/page.tsx`
- `sanity.config.ts`, `sanity.cli.ts`, `.sanity/runtime/**`
- `package.json` (deps + scripts)

## Open items needing the user
- Provide `CRAFT_API_TOKEN` (and **rotate** the old key).
- Provide Backe Backe Pizza media files for `public/work/backe-backe-pizza/`.
- Confirm/seed the "Cases" collection (or let this session create it).
