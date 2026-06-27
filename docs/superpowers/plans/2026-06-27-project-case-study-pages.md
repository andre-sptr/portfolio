# Project Case Study Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the 4 featured projects their own shareable, SEO-friendly `/project/:slug` case study pages that render the existing `problem → solution → impact` data.

**Architecture:** Purely client-side, additive feature on the existing Vite + React + react-router-dom SPA. A new lazy-loaded route renders a single `ProjectDetail` page from existing `ProjectItem` data; the Projects section gains a "Lihat Detail" link. No backend, no new data.

**Tech Stack:** React 18, TypeScript, react-router-dom v6, react-helmet-async (via existing `SEO`), framer-motion, Tailwind with existing CSS variables (`--surface-0`, `--electric`, `--warm-white`) and `Clash Display` font.

## Global Constraints

- Static SPA only — no backend, database, or auth.
- Lean depth — render ONLY existing `ProjectItem` fields; add no new content, screenshots, or metrics.
- Case study pages exist ONLY for projects with `featured: true` (Arena Debate, Reka AI, Fiscal AI, SiTiket).
- New route MUST be placed above the catch-all `*` route in `src/App.tsx` and lazy-loaded like the existing `/lab` route.
- Respect reduced motion: gate all entrance animation behind the existing `usePrefersReducedMotion` hook.
- Match existing design tokens and class names (`glass-card`, `section-label`, `var(--surface-0)`, `var(--electric)`, `var(--warm-white)`, `'Clash Display'`).
- No test runner exists in this repo. Verification is: TypeScript typecheck + production build pass, plus the manual acceptance checks listed per task. Do NOT add a test framework (out of scope).

---

### Task 1: Data helpers for case studies

**Files:**
- Modify: `src/data/projects.ts` (append after the existing exports near line 234-238)

**Interfaces:**
- Consumes: existing `projects: ProjectItem[]` and `featuredProjects` from the same file.
- Produces:
  - `caseStudyProjects: ProjectItem[]` — the featured projects, in declared order.
  - `getCaseStudy(slug: string): ProjectItem | undefined` — featured project whose `id === slug`, else `undefined`.

- [ ] **Step 1: Add the helpers**

Append to the end of `src/data/projects.ts` (the file already defines `featuredProjects`):

```ts
// Projects that have a dedicated case study page (reuses the `featured` flag).
export const caseStudyProjects = featuredProjects;

export function getCaseStudy(slug: string): ProjectItem | undefined {
  return caseStudyProjects.find((project) => project.id === slug);
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add caseStudyProjects and getCaseStudy helpers

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: ProjectDetail page + route

**Files:**
- Create: `src/pages/ProjectDetail.tsx`
- Modify: `src/App.tsx` (add lazy import near line 15; add `<Route>` above the catch-all at line 40-41)

**Interfaces:**
- Consumes: `getCaseStudy`, `caseStudyProjects`, `ProjectItem` from `@/data/projects`; `SEO` (default) from `@/components/SEO`; `Footer` (default) from `@/components/Footer`; `NotFound` (default) from `./NotFound`; `usePrefersReducedMotion` from `@/hooks/usePrefersReducedMotion`.
- Produces: default-exported `ProjectDetail` component; route `path="/project/:slug"`.

- [ ] **Step 1: Create `src/pages/ProjectDetail.tsx`**

```tsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { getCaseStudy, caseStudyProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const prefersReduced = usePrefersReducedMotion();
  const project = slug ? getCaseStudy(slug) : undefined;

  // Unknown slug or a non-featured project → 404.
  if (!project) return <NotFound />;

  const index = caseStudyProjects.findIndex((p) => p.id === project.id);
  const count = caseStudyProjects.length;
  const prev = caseStudyProjects[(index - 1 + count) % count];
  const next = caseStudyProjects[(index + 1) % count];

  const fade = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.subtitle,
    description: project.description,
    image: `https://andresptr.site${project.image}`,
    url: `https://andresptr.site/project/${project.id}`,
    author: {
      "@type": "Person",
      "@id": "https://andresptr.site/#person",
      name: "Andre Saputra",
    },
  };

  const narrative = [
    { label: "Problem", body: project.problem },
    { label: "Solution", body: project.solution },
    { label: "Impact", body: project.impact },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface-0)] text-foreground grain">
      <SEO
        title={`${project.title} — Case Study`}
        description={project.description}
        image={project.image}
        url={`https://andresptr.site/project/${project.id}`}
        type="article"
        schema={schema}
      />

      {/* Top bar */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-[var(--surface-0)]/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          {/* Full anchor so the homepage scrolls to the #projects section */}
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--electric)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Projects
          </a>
          <Link to="/" className="font-bold tracking-tight text-[var(--warm-white)]">
            Andre<span className="text-[var(--electric)]">.dev</span>
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* Header */}
        <motion.header {...fade} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-5xl font-bold opacity-20 leading-none select-none"
              style={{ fontFamily: "'Clash Display', sans-serif", color: project.accent }}
            >
              {project.num}
            </span>
            <span
              className="text-xs font-medium tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
              style={{ color: project.accent, borderColor: `${project.accent}40` }}
            >
              {project.category}
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-2"
            style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--warm-white)" }}
          >
            {project.title}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-6" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.viewUrl && (
              <a
                href={project.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:gap-3"
                style={{ background: project.accent, color: "#0a0a0f" }}
              >
                Live Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition-all"
              >
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            )}
          </div>
        </motion.header>

        {/* Hero screenshot */}
        <motion.div {...fade} className="relative mb-12">
          <div
            className="absolute -inset-2 rounded-2xl opacity-20"
            style={{
              background: `linear-gradient(135deg, ${project.accent}40, transparent)`,
              border: `1px solid ${project.accent}30`,
            }}
          />
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* Overview */}
        <section className="mb-12">
          <p className="section-label mb-3">Overview</p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </section>

        {/* Narrative: Problem / Solution / Impact */}
        <section className="grid md:grid-cols-3 gap-5 mb-12">
          {narrative.map((block) => (
            <div key={block.label} className="glass-card p-6 rounded-2xl border border-white/[0.06]">
              <h2
                className="text-sm font-bold uppercase tracking-[0.15em] mb-3"
                style={{ color: project.accent }}
              >
                {block.label}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{block.body}</p>
            </div>
          ))}
        </section>

        {/* Meta */}
        <section className="mb-16 grid sm:grid-cols-[160px_1fr] gap-4 border-t border-white/[0.06] pt-8">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Role</p>
            <p className="text-sm text-[var(--warm-white)]">{project.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <nav className="grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-8">
          <Link to={`/project/${prev.id}`} className="group flex flex-col gap-1 text-left">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/60">
              <ArrowLeft className="w-3 h-3" /> Prev
            </span>
            <span className="text-sm font-medium text-[var(--warm-white)] group-hover:text-[var(--electric)] transition-colors">
              {prev.title}
            </span>
          </Link>
          <Link to={`/project/${next.id}`} className="group flex flex-col gap-1 text-right items-end">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/60">
              Next <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-medium text-[var(--warm-white)] group-hover:text-[var(--electric)] transition-colors">
              {next.title}
            </span>
          </Link>
        </nav>
      </article>

      <Footer />
    </main>
  );
};

export default ProjectDetail;
```

- [ ] **Step 2: Wire the route in `src/App.tsx`**

Add the lazy import next to the existing `Lab` lazy import (currently line 15):

```tsx
const Lab = React.lazy(() => import("./pages/Lab"));
const ProjectDetail = React.lazy(() => import("./pages/ProjectDetail"));
```

Add the route immediately above the catch-all comment/route (currently lines 40-41), so the block reads:

```tsx
                  <Route path="/" element={<Index />} />
                  <Route path="/lab" element={<Lab />} />
                  <Route path="/project/:slug" element={<ProjectDetail />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
```

- [ ] **Step 3: Typecheck + build**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds and emits `dist/` with no errors.

- [ ] **Step 4: Manual acceptance**

Run: `npm run dev`, then visit:
- `http://localhost:5173/project/sitiket` — renders top bar, header (num/category/title/subtitle), Code CTA (SiTiket has `codeUrl`, no `viewUrl`), hero screenshot, Overview, three Problem/Solution/Impact cards, Role + Tech, and Prev/Next.
- `http://localhost:5173/project/arena-debate` — shows a Live Demo CTA (it has `viewUrl`).
- `http://localhost:5173/project/nope` and `http://localhost:5173/project/pdf-tools` — both render the 404 NotFound page.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ProjectDetail.tsx src/App.tsx
git commit -m "feat: add /project/:slug case study page

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: "Lihat Detail" entry-point links in the Projects section

**Files:**
- Modify: `src/components/Projects.tsx` (imports near lines 1-9; desktop `.project-cta` block lines 86-114; mobile cta block lines 213-235)

**Interfaces:**
- Consumes: the `/project/:slug` route from Task 2; existing `ProjectItem.id`.
- Produces: nothing for later tasks (terminal task).

Both `Projects` (desktop) and `ProjectsMobile` render only `featuredProjects`, so every rendered card is a case study — the link is unconditional within these components.

- [ ] **Step 1: Add imports**

In `src/components/Projects.tsx`, add `BookOpen` to the existing lucide import and add the router `Link` import:

```tsx
import { ExternalLink, Github, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
```

- [ ] **Step 2: Add the link in the desktop panel**

In `ProjectPanel`, inside the `<div className="flex gap-3 project-cta">` block, add this as the first child (before the `viewUrl` link):

```tsx
<Link
  to={`/project/${project.id}`}
  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition-all duration-300"
>
  <BookOpen className="w-3.5 h-3.5" /> Lihat Detail
</Link>
```

- [ ] **Step 3: Add the link in the mobile card**

In `ProjectCardMobile`, inside the `<div className="flex gap-2 pt-1">` block, add this as the first child (before the `viewUrl` link):

```tsx
<Link
  to={`/project/${project.id}`}
  className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium border border-white/20 text-muted-foreground min-h-[44px]"
>
  <BookOpen className="w-3.5 h-3.5" /> Detail
</Link>
```

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Manual acceptance**

Run: `npm run dev`, then on `http://localhost:5173/`:
- Scroll to the Projects section (desktop): each project panel shows a "Lihat Detail" button; clicking it navigates to `/project/<id>`.
- In a narrow viewport (mobile), each project card shows a "Detail" button that navigates correctly.

- [ ] **Step 6: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: link Projects section to case study pages

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Final Verification (maps to spec acceptance criteria)

- [ ] `npx tsc --noEmit -p tsconfig.app.json` and `npm run build` both pass.
- [ ] Each `/project/<id>` for the 4 featured projects renders all sections.
- [ ] Live Demo / Code CTAs appear only when the URL exists.
- [ ] Prev / Next cycles through all 4 case studies (wraps around).
- [ ] `/project/nope` and `/project/pdf-tools` (non-featured) render NotFound.
- [ ] Per-page `<title>`, meta description, canonical URL, and `CreativeWork` JSON-LD are present in the head (inspect DOM or view source after hydration).
- [ ] Mobile layout is single-column and readable; "Detail" link works on mobile cards.
- [ ] With OS "reduce motion" enabled, no entrance animation runs on the detail page.

## Notes / Decisions

- The detail page uses a **minimal local top bar** (back link + brand) rather than the site `Navigation`, because `Navigation`'s in-page hash anchors (`#about`, `#projects`) would not resolve correctly from a sub-route. The "Kembali ke Projects" control is a full `<a href="/#projects">` so the browser lands on and scrolls to the Projects section.
- `caseStudyProjects` aliases `featuredProjects` (DRY) — gating case studies on the existing `featured` flag keeps a single source of truth.
- The `SEO` component already appends a trailing slash to the canonical URL and uses `image` for OG/Twitter cards, so passing `image={project.image}` gives each case study a proper social preview.
