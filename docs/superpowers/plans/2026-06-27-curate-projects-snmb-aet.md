# Curate Projects: SNMB & AET AI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface two real deployed systems (SNMB admission portal, AET AI assistant) as `featured` projects so they appear in the Projects section and get automatic `/project/:slug` case study pages.

**Architecture:** Pure data addition to `src/data/projects.ts` (two `ProjectItem` entries with `featured: true`) plus removal of one dead UI branch in `src/components/Projects.tsx`. No new components or routes — the existing case-study feature consumes `featuredProjects` automatically.

**Tech Stack:** React, TypeScript, Vite, react-router-dom (existing).

## Global Constraints

- `ProjectItem` shape is unchanged; only new entries are added.
- Insert the two new entries immediately AFTER the `sitiket` entry and BEFORE the `iot-system` entry, so the featured projects stay grouped at the front of the array.
- Verification is manual via `npm run build` (no test runner exists; do NOT add one).
- Live URLs (verbatim): SNMB `https://snmb.icsiak.sch.id/`, AET AI `https://aetpcr.site/`.

---

### Task 1: Add SNMB & AET AI as featured projects

**Files:**
- Modify: `src/data/projects.ts` (insert after the `sitiket` object, which ends with `accent: "#f59e0b", featured: true, },` — before the `iot-system` object)

**Interfaces:**
- Consumes: existing `ProjectItem` interface.
- Produces: two new featured projects with ids `"snmb"` and `"aet-ai"`, picked up automatically by `featuredProjects`, `caseStudyProjects`, and `getCaseStudy`.

- [ ] **Step 1: Insert the two entries**

In `src/data/projects.ts`, locate the end of the `sitiket` entry:

```ts
    accent: "#f59e0b",
    featured: true,
  },
  {
    id: "iot-system",
```

Insert the two new objects between `},` (end of sitiket) and `{ id: "iot-system"`:

```ts
    accent: "#f59e0b",
    featured: true,
  },
  {
    id: "snmb",
    num: "05",
    title: "SNMB MAN IC Siak",
    subtitle: "School Admission Portal",
    category: "Education",
    description:
      "Portal resmi Seleksi Nasional Murid Baru MAN Insan Cendekia Siak — alur seleksi, jadwal, countdown pendaftaran, dan integrasi WhatsApp.",
    problem: "Sekolah butuh portal pendaftaran murid baru yang resmi, terpusat, dan mudah diakses calon siswa.",
    solution: "Membangun portal PMB dengan alur seleksi, jadwal, countdown pendaftaran, dan integrasi WhatsApp.",
    impact: "Memusatkan pendaftaran murid baru MAN IC Siak agar prosesnya lebih tertib dan mudah diakses.",
    role: "Full-stack developer",
    tech: ["React", "Vite", "Node.js"],
    image: "/pages/snmbPage.png",
    viewUrl: "https://snmb.icsiak.sch.id/",
    codeUrl: "",
    accent: "#3b82f6",
    featured: true,
  },
  {
    id: "aet-ai",
    num: "06",
    title: "AET AI",
    subtitle: "Student-Org AI Assistant",
    category: "AI & Tools",
    description:
      "Asisten AI untuk Himpunan Mahasiswa AET Politeknik Caltex Riau dengan mode Smart Companion, Academic Writer, dan Coding Expert.",
    problem: "Anggota himpunan mahasiswa butuh asisten untuk tugas akademik, coding, dan produktivitas sehari-hari.",
    solution: "Membangun asisten AI multi-mode (Smart Companion, Academic Writer, Coding Expert) dengan antarmuka chat.",
    impact: "Membantu mahasiswa AET PCR menulis laporan, debugging, dan berdiskusi lebih cepat.",
    role: "Full-stack developer",
    tech: ["Next.js", "Gemini AI"],
    image: "/pages/aetPage.png",
    viewUrl: "https://aetpcr.site/",
    codeUrl: "",
    accent: "#6366f1",
    featured: true,
  },
  {
    id: "iot-system",
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds (no type errors — both objects satisfy `ProjectItem`).

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add SNMB and AET AI as featured case-study projects

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Remove dead "In progress" placeholder

**Files:**
- Modify: `src/components/Projects.tsx` (the `ProjectPanel` `.project-cta` block)

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing for later tasks (terminal task).

Rationale: `ProjectPanel` only renders `featuredProjects`, and every featured project now has a `viewUrl` and/or `codeUrl`, so the `!viewUrl && !codeUrl` branch can never render.

- [ ] **Step 1: Delete the dead branch**

In `src/components/Projects.tsx`, inside `ProjectPanel`'s `<div className="flex gap-3 project-cta">`, remove these lines:

```tsx
            {!project.viewUrl && !project.codeUrl && (
              <span className="text-xs text-muted-foreground/50 italic">In progress</span>
            )}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "refactor: remove dead 'In progress' project placeholder

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Final Verification (maps to spec)

- [ ] `npm run build` passes.
- [ ] `/project/snmb` and `/project/aet-ai` render full case studies (title, Problem/Solution/Impact, a Live Demo CTA to the correct URL, prev/next cycling through all 6).
- [ ] Projects section shows 6 panels (desktop) / 6 cards (mobile), each with a working "Lihat Detail" link.
- [ ] No "In progress" text remains anywhere in the Projects section.

## Self-Review

- **Spec coverage:** data entries (Task 1), automatic case-study/Projects/Lihat-Detail effects (Task 1 via `featured`), dead-branch cleanup (Task 2), verification (final section). Covered.
- **Placeholders:** none — full code shown.
- **Type consistency:** both objects include every required `ProjectItem` field with correct types; ids `snmb`/`aet-ai` are unique.
