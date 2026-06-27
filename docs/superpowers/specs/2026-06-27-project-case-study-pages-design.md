# Design — Project Case Study Pages

**Date:** 2026-06-27
**Status:** Approved (pending implementation plan)
**Author:** Andre Saputra (with Claude)

## Goal

Turn the portfolio from "looks impressive" into "proves competence" by giving the
strongest projects their own shareable, SEO-friendly case study pages. The
project data already contains rich `problem` / `solution` / `impact` / `role`
fields that are **not currently rendered anywhere** — this feature surfaces them.

Primary value: a recruiter or client can be sent a single URL
(e.g. `andresptr.site/project/sitiket`) that explains how Andre thinks, not just
what a project looks like.

## Scope

- **In scope:** Dedicated case study pages for the 4 projects that already have a
  full narrative — the ones flagged `featured: true` in `src/data/projects.ts`:
  Arena Debate, Reka AI, Fiscal AI, SiTiket.
- **Depth:** Lean. Render the data that already exists. **No new content,
  screenshots, or metrics required** to ship. (Metrics/extra screenshots can be
  added later as a separate enhancement.)
- **Out of scope:** Admin panel/CMS, case studies for non-featured ("In progress")
  projects, multi-image galleries, written long-form narrative, i18n.

## Non-Goals

- No backend, database, or auth (the site stays static).
- No change to the existing GSAP horizontal-scroll Projects section behavior
  beyond adding a link.

## Architecture

Static Vite + React SPA using `react-router-dom`. The feature is purely
client-side and additive.

### Routing
- New route in `src/App.tsx`: `<Route path="/project/:slug" element={<ProjectDetail />} />`,
  placed **above** the catch-all `*` route.
- Lazy-loaded with `React.lazy` + `Suspense`, matching the existing `/lab` pattern.
- The project `id` is already a URL-safe slug (e.g. `"sitiket"`, `"arena-debate"`),
  so it is used directly as `:slug`.

### Data
- `src/data/projects.ts` gains two small helpers (no data shape change):
  - `caseStudyProjects` — `projects.filter(p => p.featured)`.
  - `getCaseStudy(slug: string)` — returns the featured project whose `id === slug`,
    or `undefined`.
- All page content derives from existing `ProjectItem` fields:
  `num, title, subtitle, category, description, problem, solution, impact, role,
  tech, image, viewUrl, codeUrl, accent`.

### New component: `src/pages/ProjectDetail.tsx`
- Reads `:slug` via `useParams()`.
- `getCaseStudy(slug)`; if `undefined`, render the existing `NotFound` page
  (a non-featured or unknown slug is treated as not found).
- Normal vertically-scrollable page (NOT a GSAP-pinned section) for readability
  and keyboard accessibility. Lenis smooth-scroll is already global via
  `LenisProvider`.

## Page Layout (top → bottom)

1. **Top bar** — `← Kembali ke Projects` link to `/#projects`, plus the site
   logo/brand. (Reuse `Navigation` if it fits cleanly; otherwise a minimal local bar.)
2. **Header** — project `num`, category badge tinted with `accent`, `title`
   (Clash Display), `subtitle`, then CTA buttons **Live Demo** (`viewUrl`) and
   **Code** (`codeUrl`), each shown only when its URL exists.
3. **Hero screenshot** — existing `image`, larger, framed with an `accent` glow
   consistent with the current card styling.
4. **Overview** — `description`.
5. **Narrative core** — three visually distinct blocks: **Problem → Solution →
   Impact**, rendered from `problem`, `solution`, `impact`.
6. **Meta** — `role`, `category`, and `tech` chips.
7. **Prev / Next** — navigation between `caseStudyProjects` by array order (wraps
   around).
8. **Footer** — reuse the existing `Footer` component.

## SEO

- Use the existing `SEO` component per page:
  - `title`: `"{title} — Case Study | Andre Saputra"`
  - `description`: project `description`
  - `url`: canonical `https://andresptr.site/project/{id}`
  - `schema`: a `schema.org` **`CreativeWork`** node with `name`, `description`,
    `image`, `url`, and `author` referencing the existing `#person` node from the
    homepage graph.

## Entry Points

Add a **"Lihat Detail"** link (React Router `Link`) to the projects section, only
for `featured` projects:
- `src/components/Projects.tsx` desktop `ProjectPanel` — in the `.project-cta`
  row, alongside Live Demo / Code.
- `src/components/Projects.tsx` mobile `ProjectCardMobile` — same.

Links are real anchors, so they coexist with the GSAP-pinned horizontal scroll
without interfering.

## Motion & Accessibility

- Light entrance animations via framer-motion (fade/slide), gated by the existing
  `usePrefersReducedMotion` hook — no animation when reduced motion is preferred.
- No horizontal pinning on the detail page; standard scroll.
- Ensure CTA/links have accessible labels and visible focus states.

## Error Handling

- Unknown slug or non-featured project → `NotFound`.
- Missing `viewUrl`/`codeUrl` → corresponding CTA simply not rendered (existing
  pattern in `Projects.tsx`).

## Files Touched

- **New:** `src/pages/ProjectDetail.tsx`
- **Edit:** `src/App.tsx` (add lazy route)
- **Edit:** `src/data/projects.ts` (add `caseStudyProjects`, `getCaseStudy`)
- **Edit:** `src/components/Projects.tsx` (add "Lihat Detail" link, desktop + mobile)

## Verification

Repo has no test runner, so verification is manual:
- `npm run build` succeeds with no type errors.
- Each `/project/<id>` for the 4 featured projects renders all sections correctly.
- Live Demo / Code CTAs appear only when the URL exists and open correctly.
- Prev / Next cycles through all 4 case studies.
- An unknown slug (e.g. `/project/nope`) and a non-featured slug
  (e.g. `/project/pdf-tools`) both render `NotFound`.
- Per-page `<title>`, meta description, canonical URL, and `CreativeWork` schema
  are present in the rendered head.
- Mobile layout is single-column and readable; "Lihat Detail" link works on mobile cards.
- With OS "reduce motion" enabled, no entrance animation runs.

## Future Enhancements (not in this spec)

- Quantified metrics in the Impact block (needs real numbers from Andre).
- Multi-screenshot gallery and "key decisions" section.
- Extend case studies to selected archive projects.
