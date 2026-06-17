# Handoff: Replace Sanity with Craft (live backend via ISR)

> Read this first. It captures every decision already made so you can continue
> without re-litigating. Written for a fresh Claude Code session.

## Status (read this before doing anything else)
**Sanity is fully removed.** Do not reinstall it, re-add `src/sanity/**`, or
re-litigate "should we keep Sanity" — that loop is closed.

Done so far:
- Deleted `src/sanity/**`, `src/app/studio/**`, `sanity.config.ts`,
  `sanity.cli.ts`, `.sanity/`; removed `sanity`, `next-sanity`, `@sanity/*`
  from `package.json` (and ran `npm install` to update the lockfile).
- Added `src/lib/types.ts` (shared `CaseEntry`/`CaseDetail`/`ContentBlock`/
  `CompetencyEntry`/`ContactLinkEntry`/`ClientLogoEntry` types — Craft media
  is plain string URLs, no Sanity asset wrappers).
- Added `src/lib/craft.ts` (server-only): `craftFetch`, `getCases()`,
  `getCaseBySlug(slug)`. Finds the "Cases" collection by name, lists its
  items, and maps columns into `CaseEntry`/`CaseDetail`. Per-case
  `competencies` column is resolved to full `CompetencyEntry` objects via
  `competencyByKey()` in `src/constants/competencies.ts` (Craft only stores
  the keys; label/emoji/color stay in the repo). Fails soft — logs and
  returns `[]`/`null` if `CRAFT_API_TOKEN` is missing or the API errors, so
  the site still builds/renders without it.
- Wired `src/app/page.tsx` and `src/app/work/[slug]/page.tsx` to
  `getCases()`/`getCaseBySlug()` instead of the Sanity client, with
  `export const revalidate = 600` (ISR) on both.
- Added `src/app/api/revalidate/route.ts` — `POST` with header
  `x-revalidate-secret: $REVALIDATE_SECRET` and `?path=/work/some-slug` to
  force a refresh.
- Moved non-case content to repo constants (locked decision — these never
  come from Craft): `src/constants/competencies.ts` (already had the data),
  `src/constants/clientLogos.ts`, `src/constants/contactLinks.ts`. **Both of
  the new ones are currently empty arrays** — the real lists lived in the
  old Sanity dataset and weren't exported before it was decommissioned.
- Updated `src/components/WorkSection.tsx` and `src/app/components/page.tsx`
  (design-system demo data) to the new flat `CaseEntry`/`CoverMedia` shape.
- Verified: `npx tsc --noEmit` clean, `npm run lint` baseline unchanged (13
  problems / 6 errors / 7 warnings, all pre-existing, none Sanity-related).
  `npm run build` currently fails in this sandbox only because of a Google
  Fonts TLS fetch issue unrelated to this change — confirmed it also fails
  the same way on a clean checkout of `main`.

Known gap, by design (don't try to "fix" this without real data to check
against): **`getCaseBySlug` always returns `content: []`.** The metrics/
section/quote body blocks were defined in Sanity as structured fields, but
in Craft the row body is just a markdown document, and no real case row
exists yet to design the heading convention against. Once a real row is in
the Cases collection, fetch its body via `GET /blocks?id={itemId}&maxDepth=-1`
(or `Accept: text/markdown`) and extend `getCaseBySlug` to parse it into
`ContentBlock[]` (see the `ContentBlock`/`GalleryItem` shapes in
`src/lib/types.ts` — they're the contract the case page already renders).

## Goal
Drive **case studies** from the user's **Craft** space via its Space API,
fetched at runtime with **ISR**. First real content deliverable: a "Backe,
Backe Pizza" case study (Gustavo Gusto × Deine Freunde AR music video)
rendered through the existing `work/[slug]` layout.

## Decisions already locked (do NOT re-ask)
- **Architecture:** Live fetch / ISR, done (see Status above).
- **Content model:** A structured **Craft "Cases" collection** (typed
  columns), one row per case. The row body holds long-form blocks.
- **Non-case content** (competencies, client logos, contact links): repo
  data files/constants — NOT Craft. Only cases come from Craft.
- **Media:** User provides Backe Backe Pizza assets. Put them in
  `public/work/backe-backe-pizza/` and reference by path (keep large video
  out of Craft).

## Craft Space API — essentials
- **Base URL:** `https://connect.craft.do/links/4CzEKnYRKSV/api/v1`
- **Auth:** `Authorization: Bearer <CRAFT_API_TOKEN>` — server-side only, set
  as env var `CRAFT_API_TOKEN`. **The original token was shared in plaintext
  chat — remind the user to rotate it in Craft if that hasn't happened yet.**
  Never commit it. Not currently set in this environment.
- **Content format:** `GET /blocks` returns JSON blocks or, with
  `Accept: text/markdown`, rendered Markdown.
- **Key endpoints:**
  - `GET /folders` — discover locations (smoke-test access).
  - `GET /documents?location=…` — list docs; ids == root block ids.
  - `GET /blocks?id={docId}&maxDepth=-1` — fetch a doc's content.
  - Collections: `GET/POST /collections`, `GET/PUT /collections/{id}/schema`,
    `GET/POST/PATCH/DELETE` collection items (assumed at
    `/collections/{id}/items` — **unverified against the live API, no token
    available yet to confirm the exact path/response shape**).
  - `GET /documents/search`, tasks, whiteboards, `POST /files` (Upload File),
    `GET /connection` (Get Connection Info).
- **No webhooks** — automation = ISR timer or the manual `/api/revalidate`
  route.
- Markdown supports Craft extensions: `<page>`, `<callout>`, `<highlight>`,
  `<caption>`, `==highlight==`, `[text](block://id)`, `$latex$`, 2-space
  nesting, and output-only `<collection>/<collectionItem>/<property>` tags.

## Next steps (in order)
1. **Get `CRAFT_API_TOKEN` into the env** (rotated key) and re-verify egress:
   ```bash
   curl -s -m 30 -w "\n[HTTP %{http_code}]\n" \
     -H "Authorization: Bearer $CRAFT_API_TOKEN" \
     https://connect.craft.do/links/4CzEKnYRKSV/api/v1/folders
   ```
   `200` + JSON → proceed. `403 Host not in allowlist` → add
   `connect.craft.do`, `res.luki.io`, `r.craft.do` to the environment's
   network allowlist and start a new session.
2. **Confirm/create the "Cases" collection** with columns: `title, slug,
   client, role, featured(bool), aspect(9-16|3-4|1-1|3-2), competencies,
   coverType(image|video|link), coverUrl, liveLink, liveLinkLabel, intro`.
3. **Validate `src/lib/craft.ts` against the real API response** — the
   collection-items endpoint path and the item property shape
   (`properties`/`fields`/flat) were assumed, not confirmed. Adjust
   `readProp`/`getCaseItems` if the real shape differs.
4. **Implement body-block parsing** for `getCaseBySlug` (see "Known gap"
   above) once a real case row exists to test against.
5. **Seed real `clientLogos`/`contactLinks`** in
   `src/constants/clientLogos.ts` / `src/constants/contactLinks.ts` (ask the
   user for the real list — it's not in this repo anywhere).
6. **Backe Backe Pizza case:** add the row in Craft; place user-provided
   media in `public/work/backe-backe-pizza/`; verify the page renders.
7. **Verify:** `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Open items needing the user
- Provide `CRAFT_API_TOKEN` (rotated), and confirm network allowlist if
  egress check above 403s.
- Provide Backe Backe Pizza media files for `public/work/backe-backe-pizza/`.
- Confirm/seed the "Cases" collection (or let a session create it).
- Provide the real client-logo and contact-link lists (currently empty
  constants — nothing renders in those sections until filled in).
