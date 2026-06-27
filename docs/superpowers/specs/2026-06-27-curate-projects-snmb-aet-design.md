# Design — Curate Projects: Elevate SNMB & AET AI

**Date:** 2026-06-27
**Status:** Approved pending spec review
**Author:** Andre Saputra (with Claude)

## Goal

Strengthen the curated project list ("sedikit tapi kuat") by surfacing two real,
deployed systems that were hidden from the portfolio: the **SNMB** school
admission portal and **AET AI** student-org assistant. Both are live and credible
(real institutional/organizational use), which is exactly the kind of provable
work the portfolio's credibility pass needs.

Because the case study feature ships from `featured` projects, marking these two
`featured: true` does double duty: they appear in the Projects section **and**
automatically get `/project/:slug` case study pages.

## Scope

- **In scope:** Add two new `ProjectItem` entries (SNMB, AET AI) with
  `featured: true`; remove one block of dead UI code.
- **Out of scope (separate future steps):** quantified impact metrics (needs real
  numbers), removing weak archive entries from data, renumbering archive `num`s,
  adding the new projects to the hero floating cards.

## Confirmed Facts

- Live URLs (provided by Andre): `https://snmb.icsiak.sch.id/` and
  `https://aetpcr.site/`.
- Framework detection (from live HTML/headers):
  - SNMB → React + Vite SPA (`/assets/index-*.js`, `type="module"`, `#root`).
  - AET AI → Next.js (`X-Powered-By: Next.js`, `_next/`).
- Screenshots already exist: `public/pages/snmbPage.png`,
  `public/pages/aetPage.png`.

## Inferences (flagged for Andre to correct)

- SNMB backend assumed `Node.js`.
- AET AI assumed `Gemini AI` (matches Andre's other AI projects).

## Data Changes — `src/data/projects.ts`

Insert the two entries immediately **after** the `sitiket` entry (so the four
existing featured projects stay first, followed by the two new ones; archive
entries remain after). The `ProjectItem` shape is unchanged.

```ts
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
```

### Notes on `num`

`num` is a cosmetic display string (a large faded number in cards/headers). The
archive entries also use `"05"`/`"06"`, but featured and archive are filtered into
separate render lists, so React keys within `featuredProjects` (`01`–`06`) stay
unique and there is no visible conflict. Renumbering the archive is out of scope.

## Automatic Effects (no extra code)

- `featuredProjects` (and therefore `caseStudyProjects`) grows from 4 → 6, so:
  - The Projects section renders 6 panels (its width/scroll math already keys off
    `featuredProjects.length`).
  - `/project/snmb` and `/project/aet-ai` render via the existing `ProjectDetail`
    page; prev/next cycles through all 6.
  - Both get a "Lihat Detail" link automatically.

## Cleanup — `src/components/Projects.tsx`

Remove the now-dead placeholder branch in `ProjectPanel` (all featured projects
have a `viewUrl` and/or `codeUrl`, so it never renders):

```tsx
{!project.viewUrl && !project.codeUrl && (
  <span className="text-xs text-muted-foreground/50 italic">In progress</span>
)}
```

## Verification

Repo has no test runner; verification is manual:
- `npm run build` succeeds.
- `/project/snmb` and `/project/aet-ai` render full case studies with correct
  title, Problem/Solution/Impact, a Live Demo CTA pointing at the right URL, and
  prev/next.
- The Projects section shows 6 panels (desktop) / 6 cards (mobile), each with a
  working "Lihat Detail" link.
- No `"In progress"` text remains in the Projects section.
