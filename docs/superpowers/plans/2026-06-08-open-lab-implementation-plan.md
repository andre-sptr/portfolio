# Open Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-ready Open Lab experience for `andresptr.site`: a readable portfolio shell with a dedicated `/lab` playground and one complete Matter.js gravity experiment.

**Architecture:** Keep the homepage as the professional portfolio shell and make `/lab` the opt-in experimental area. Extract shared project, skill, and experiment data first, add a small motion foundation, then build the lab gallery and the first interactive experiment: Falling Stack. Heavy physics code is lazy-loaded and never blocks the homepage.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind, shadcn/Radix primitives, GSAP, `@gsap/react`, Lenis, Framer Motion, Three.js/R3F, Matter.js, React Router.

---

## Grounding Snapshot

Current repository facts:

- `src/App.tsx` has only `/` and catch-all routes.
- `src/pages/Index.tsx` lazy-loads existing homepage sections.
- `src/components/Hero.tsx` owns local floating-card data and GSAP hero timelines.
- `src/components/Projects.tsx` owns local featured project data and pinned horizontal ScrollTrigger logic.
- `src/components/About.tsx` owns local stack and experience data.
- `src/components/FreeTools.tsx` owns local tools data.
- `src/hooks/usePrefersReducedMotion.ts` already exists and should be reused by every motion-heavy component.
- `src/providers/LenisProvider.tsx` already drives Lenis from the GSAP ticker and calls `ScrollTrigger.update`.
- `package.json` includes GSAP, R3F, Three.js, Lenis, Framer Motion, and React Router, but does not include Matter.js.
- `vite.config.ts` already splits `three` into a manual chunk. Add a `physics` chunk when Matter.js is introduced.

Repository constraints:

- Prefix shell commands with `rtk`.
- Do not touch unrelated `.claude/settings.local.json` changes.
- Use `apply_patch` for manual edits.
- Keep UI professional: no marketing landing page, no decorative blob-heavy direction, no hidden content behind canvas-only effects.

## Product Decisions Locked By This Plan

- Open Lab ships as `/lab`, not as `#lab`.
- MVP experiment is `falling-stack`.
- Matter.js is introduced for the MVP because it provides real gravity/collision and the lab is opt-in.
- Homepage changes in the MVP are limited to route entry points and shared data cleanup.
- Project archive metadata can start with the screenshots already in `public/pages`, but the first implementation should not pretend every archive item has a detailed case study.

## File Map

Create:

- `src/data/projects.ts` - canonical project metadata used by Hero, Projects, Lab cards, and SEO.
- `src/data/skills.ts` - canonical skill-chip data for About and the Falling Stack experiment.
- `src/data/experiments.ts` - canonical Open Lab experiment metadata.
- `src/lib/motion/gsap.ts` - central GSAP plugin registration.
- `src/lib/motion/tokens.ts` - shared duration, ease, and stagger constants.
- `src/lib/motion/useDocumentReadyRefresh.ts` - refresh ScrollTrigger after fonts/images settle.
- `src/pages/Lab.tsx` - `/lab` route and Open Lab page composition.
- `src/components/lab/ExperimentCard.tsx` - reusable gallery card.
- `src/components/lab/ExperimentShell.tsx` - reusable experiment frame with reset, pause, back, and reduced-motion state.
- `src/components/lab/FallingStackExperiment.tsx` - Matter.js MVP experiment.
- `src/components/lab/LabHero.tsx` - Open Lab first viewport.
- `src/components/lab/LabGallery.tsx` - filterable experiment list.
- `src/components/lab/StaticExperimentPreview.tsx` - static fallback preview for reduced motion/mobile.
- `src/components/motion/MagneticElement.tsx` - reusable pointer-proximity wrapper for CTA and lab cards.

Modify:

- `package.json` and `package-lock.json` - add `matter-js` and type support.
- `vite.config.ts` - add Matter.js to a physics chunk.
- `src/App.tsx` - lazy-load `/lab` route.
- `src/components/Navigation.tsx` - add Lab nav item, route-aware links, and mobile Lab entry.
- `src/components/Hero.tsx` - use project data for floating cards and add Open Lab CTA.
- `src/components/Projects.tsx` - import featured project data instead of local hard-coded array.
- `src/components/About.tsx` - import skill data instead of local stack chip labels in a later task.
- `src/index.css` - add Lab and dashboard utility styles if Tailwind classes become too repetitive.
- `docs/portfolio-gravity-motion-prd.md` - add a short implementation note once MVP choices are reflected.

## Task 1: Dependency And Baseline

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`

- [ ] **Step 1: Capture current working tree**

Run:

```powershell
rtk git status --short --untracked-files=all
```

Expected:

```text
 M .claude/settings.local.json
?? docs/portfolio-gravity-motion-prd.md
?? docs/superpowers/plans/2026-06-08-open-lab-implementation-plan.md
```

If more files are modified, inspect them before editing and do not revert user changes.

- [ ] **Step 2: Install Matter.js**

Run:

```powershell
rtk npm install matter-js @types/matter-js
```

Expected:

```text
added ...
```

`package.json` should include `matter-js` and `@types/matter-js`. `package-lock.json` should update.

- [ ] **Step 3: Add physics chunk**

Modify `vite.config.ts` manual chunks to include `physics`.

Use this exact `manualChunks` block:

```ts
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  ui: ['lucide-react', 'framer-motion', 'clsx', 'tailwind-merge'],
  three: ['three', '@react-three/fiber', '@react-three/drei'],
  physics: ['matter-js'],
  charts: ['recharts'],
  utils: ['date-fns', 'zod']
}
```

- [ ] **Step 4: Verify dependency installation**

Run:

```powershell
rtk npm run build
```

Expected:

```text
dist/
```

The build should exit `0`. If the current project has pre-existing build errors unrelated to Matter.js, capture the error text and fix only the errors that block this plan.

- [ ] **Step 5: Commit dependency changes**

Run:

```powershell
rtk git add package.json package-lock.json vite.config.ts
rtk git commit -m "chore: add physics runtime for open lab"
```

Expected: commit succeeds.

## Task 2: Motion Foundation

**Files:**
- Create: `src/lib/motion/gsap.ts`
- Create: `src/lib/motion/tokens.ts`
- Create: `src/lib/motion/useDocumentReadyRefresh.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/Experience.tsx`
- Modify: `src/providers/LenisProvider.tsx`

- [ ] **Step 1: Create central GSAP registration**

Create `src/lib/motion/gsap.ts`:

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export { gsap, ScrollTrigger, Draggable };
```

Do not register paid/bonus plugins here unless the package is verified to exist locally.

- [ ] **Step 2: Create shared motion tokens**

Create `src/lib/motion/tokens.ts`:

```ts
export const motionDurations = {
  instant: 0.12,
  fast: 0.24,
  normal: 0.5,
  slow: 0.8,
  orbital: 1.2,
} as const;

export const motionEases = {
  standard: "power3.out",
  soft: "power2.out",
  inOut: "sine.inOut",
  snap: "back.out(1.4)",
  linear: "none",
} as const;

export const motionStaggers = {
  tight: 0.035,
  normal: 0.08,
  relaxed: 0.12,
} as const;
```

- [ ] **Step 3: Create document-ready ScrollTrigger refresh hook**

Create `src/lib/motion/useDocumentReadyRefresh.ts`:

```ts
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/motion/gsap";

export function useDocumentReadyRefresh(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    document.fonts?.ready
      .then(refresh)
      .catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", refresh);
    };
  }, [enabled]);
}
```

- [ ] **Step 4: Replace direct GSAP imports in existing components**

Update each component that currently imports from `gsap` or `gsap/ScrollTrigger`:

```ts
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
```

Files to update:

- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/Projects.tsx`
- `src/components/Experience.tsx`
- `src/providers/LenisProvider.tsx`

In `src/components/Experience.tsx`, keep `DrawSVGPlugin` local if it currently resolves:

```ts
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);
```

If build fails because `DrawSVGPlugin` is not available in the installed GSAP package, replace the DrawSVG usage with a standard SVG stroke-dashoffset animation in the same task.

- [ ] **Step 5: Use refresh hook in homepage**

Modify `src/pages/Index.tsx`:

```ts
import { useDocumentReadyRefresh } from "@/lib/motion/useDocumentReadyRefresh";
```

Inside `Index`:

```ts
useDocumentReadyRefresh();
```

Because `Index.tsx` currently imports `React` only, either use `React.useEffect` style nowhere or keep this named hook import. No other homepage behavior should change in this task.

- [ ] **Step 6: Verify motion foundation**

Run:

```powershell
rtk npm run lint
rtk npm run build
```

Expected:

```text
0 errors
dist/
```

- [ ] **Step 7: Commit motion foundation**

Run:

```powershell
rtk git add src/lib/motion src/components/Hero.tsx src/components/About.tsx src/components/Projects.tsx src/components/Experience.tsx src/providers/LenisProvider.tsx src/pages/Index.tsx
rtk git commit -m "refactor: centralize motion setup"
```

## Task 3: Shared Data Modules

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/experiments.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Projects.tsx`

- [ ] **Step 1: Create project data module**

Create `src/data/projects.ts`:

```ts
export type ProjectCategory =
  | "AI & Tools"
  | "Infrastructure"
  | "Education"
  | "IoT"
  | "Automation"
  | "Utilities"
  | "Web Platform";

export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  role: string;
  tech: string[];
  image: string;
  viewUrl: string;
  codeUrl: string;
  accent: string;
  featured: boolean;
}

export const projects: ProjectItem[] = [
  {
    id: "arena-debate",
    num: "01",
    title: "Arena Debate",
    subtitle: "Multi-Agent AI Debate System",
    category: "AI & Tools",
    description:
      "Lima AI agent berdebat dalam format Tim 2v2, menganalisis topik apa pun secara mendalam dan mencapai kesimpulan berbasis konsensus.",
    problem: "Pengguna butuh cara mengeksplorasi argumen kompleks dari banyak sudut pandang.",
    solution: "Membuat arena debat multi-agent dengan format role-based dan sintesis kesimpulan.",
    impact: "Membantu pengguna membandingkan argumen dan melihat kontra-argumen lebih cepat.",
    role: "Full-stack developer and AI interaction designer",
    tech: ["Next.js", "Gemini AI", "Node.js"],
    image: "/pages/debatePage.png",
    viewUrl: "https://debat.andresptr.site/",
    codeUrl: "",
    accent: "#818cf8",
    featured: true,
  },
  {
    id: "reka-ai",
    num: "02",
    title: "Reka AI",
    subtitle: "AI-Assisted Coding Platform",
    category: "AI & Tools",
    description:
      "Platform AI untuk membantu developer menulis, debugging, dan optimasi kode secara real-time dengan konteks proyek penuh.",
    problem: "Developer membutuhkan bantuan coding yang memahami konteks proyek, bukan hanya prompt satu kali.",
    solution: "Membangun assistant coding dengan pengalaman chat dan konteks kerja yang lebih terarah.",
    impact: "Mempercepat iterasi coding, debugging, dan eksplorasi solusi teknis.",
    role: "Full-stack developer",
    tech: ["React", "Gemini AI", "Node.js"],
    image: "/pages/rekaPage.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/ai",
    accent: "#22d3ee",
    featured: true,
  },
  {
    id: "fiscal-ai",
    num: "03",
    title: "Fiscal AI Finance",
    subtitle: "Personal Finance Manager",
    category: "AI & Tools",
    description:
      "Web app manajemen keuangan personal berbasis AI untuk kategorisasi pengeluaran otomatis dan analisis finansial prediktif.",
    problem: "Pengguna sulit melihat pola pengeluaran dan kategori finansial secara cepat.",
    solution: "Membangun dashboard finansial dengan kategorisasi dan insight berbasis AI.",
    impact: "Membantu pengguna memahami pengeluaran dan mengambil keputusan finansial lebih jelas.",
    role: "Full-stack developer",
    tech: ["React", "AI", "Node.js"],
    image: "/pages/fiscalPage.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/fiscal",
    accent: "#34d399",
    featured: true,
  },
  {
    id: "sitiket",
    num: "04",
    title: "SiTiket",
    subtitle: "Network Fault Ticket Management",
    category: "Infrastructure",
    description:
      "Sistem manajemen tiket gangguan jaringan berbasis web untuk tracking, pengelolaan, dan resolusi gangguan secara efisien di PT Telkom Infrastruktur Indonesia.",
    problem: "Tim operasional membutuhkan tracking gangguan jaringan yang jelas dan berorientasi SLA.",
    solution: "Membangun sistem tiket gangguan dengan status, prioritas, dan alur resolusi.",
    impact: "Membantu monitoring gangguan dan koordinasi penyelesaian tiket operasional.",
    role: "Full-stack developer",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    image: "/pages/sitiketPage.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/sitiket",
    accent: "#f59e0b",
    featured: true,
  },
  {
    id: "iot-system",
    num: "05",
    title: "IoT System",
    subtitle: "Connected Device Dashboard",
    category: "IoT",
    description: "Dashboard dan antarmuka monitoring untuk eksperimen perangkat IoT.",
    problem: "Data perangkat perlu divisualisasikan agar mudah dipantau.",
    solution: "Membuat antarmuka web untuk melihat status dan sinyal perangkat.",
    impact: "Membuat eksperimen IoT lebih mudah didemokan dan dianalisis.",
    role: "IoT and web developer",
    tech: ["ESP32", "MQTT", "React"],
    image: "/pages/iotPage.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#38bdf8",
    featured: false,
  },
  {
    id: "pdf-tools",
    num: "06",
    title: "PDF Tools",
    subtitle: "Document Utility Suite",
    category: "Utilities",
    description: "Kumpulan alat untuk mengelola dokumen PDF secara cepat.",
    problem: "Pengguna membutuhkan utilitas PDF yang langsung bisa dipakai.",
    solution: "Menyediakan tools web untuk kebutuhan dokumen umum.",
    impact: "Mempercepat pekerjaan dokumen tanpa instalasi aplikasi desktop.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/pdfPage.png",
    viewUrl: "https://pdf.andresptr.site",
    codeUrl: "",
    accent: "#ef4444",
    featured: false,
  },
  {
    id: "file-hosting",
    num: "07",
    title: "File Hosting",
    subtitle: "Storage Utility",
    category: "Utilities",
    description: "Layanan hosting file sederhana untuk upload dan berbagi file.",
    problem: "Pengguna membutuhkan tempat menyimpan file yang cepat diakses.",
    solution: "Membangun utilitas upload dan hosting file berbasis web.",
    impact: "Mempermudah distribusi file untuk kebutuhan personal dan kerja.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/filePage.png",
    viewUrl: "https://file.andresptr.site",
    codeUrl: "",
    accent: "#22d3ee",
    featured: false,
  },
  {
    id: "n8n-automation",
    num: "08",
    title: "n8n Automation",
    subtitle: "Workflow Automation",
    category: "Automation",
    description: "Eksperimen otomasi workflow menggunakan n8n dan integrasi layanan.",
    problem: "Pekerjaan berulang perlu diotomasi agar tidak menghabiskan waktu manual.",
    solution: "Menyusun workflow integrasi dan automation pipeline.",
    impact: "Mengurangi pekerjaan repetitif dan mempercepat proses operasional.",
    role: "Automation builder",
    tech: ["n8n", "Webhook", "API"],
    image: "/pages/n8nPage.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#ec4899",
    featured: false,
  },
  {
    id: "eduforum",
    num: "09",
    title: "EduForum",
    subtitle: "Education Community Platform",
    category: "Education",
    description: "Platform diskusi pendidikan untuk aktivitas belajar dan komunitas.",
    problem: "Komunitas belajar membutuhkan ruang diskusi yang terstruktur.",
    solution: "Membangun platform forum dengan fokus pada materi dan diskusi.",
    impact: "Mendukung kolaborasi dan pertukaran pengetahuan antar pengguna.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/eduforumPage.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#a78bfa",
    featured: false,
  },
  {
    id: "binasiswa",
    num: "10",
    title: "Bina Siswa",
    subtitle: "Student Platform",
    category: "Education",
    description: "Platform pendukung aktivitas siswa dan pembelajaran.",
    problem: "Informasi dan aktivitas siswa perlu dikelola dalam satu tempat.",
    solution: "Membangun antarmuka web untuk kebutuhan pendataan dan pembelajaran.",
    impact: "Membantu pengelolaan aktivitas siswa secara lebih terarah.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/binasiswaPage.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#34d399",
    featured: false,
  },
  {
    id: "aethernet",
    num: "11",
    title: "Aethernet",
    subtitle: "Network Concept Interface",
    category: "Infrastructure",
    description: "Eksperimen antarmuka untuk konsep jaringan dan infrastruktur.",
    problem: "Konsep jaringan sering sulit dipahami tanpa visualisasi.",
    solution: "Membuat visual interface untuk ide jaringan dan konektivitas.",
    impact: "Mempermudah komunikasi konsep teknis jaringan.",
    role: "Frontend developer",
    tech: ["React", "Networking"],
    image: "/pages/aethernetPage.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#06b6d4",
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const archiveProjects = projects.filter((project) => !project.featured);
export const heroPreviewProjects = projects.filter((project) =>
  ["arena-debate", "reka-ai", "fiscal-ai", "sitiket", "iot-system"].includes(project.id)
);
```

- [ ] **Step 2: Create skill data module**

Create `src/data/skills.ts`:

```ts
export type SkillCategory = "Web" | "AI" | "Networking" | "IoT" | "Automation" | "Tools";

export interface SkillItem {
  id: string;
  label: string;
  shortLabel: string;
  category: SkillCategory;
  mass: number;
  accent: string;
}

export const skills: SkillItem[] = [
  { id: "react", label: "React", shortLabel: "React", category: "Web", mass: 1.1, accent: "#61dafb" },
  { id: "typescript", label: "TypeScript", shortLabel: "TS", category: "Web", mass: 1.0, accent: "#60a5fa" },
  { id: "node", label: "Node.js", shortLabel: "Node", category: "Web", mass: 1.0, accent: "#34d399" },
  { id: "next", label: "Next.js", shortLabel: "Next", category: "Web", mass: 1.0, accent: "#f8fafc" },
  { id: "tailwind", label: "Tailwind CSS", shortLabel: "TW", category: "Web", mass: 0.9, accent: "#22d3ee" },
  { id: "gsap", label: "GSAP", shortLabel: "GSAP", category: "Web", mass: 1.3, accent: "#84cc16" },
  { id: "three", label: "Three.js", shortLabel: "3D", category: "Web", mass: 1.2, accent: "#a78bfa" },
  { id: "gemini", label: "Gemini AI", shortLabel: "AI", category: "AI", mass: 1.2, accent: "#818cf8" },
  { id: "python", label: "Python", shortLabel: "Py", category: "AI", mass: 1.0, accent: "#facc15" },
  { id: "n8n", label: "n8n", shortLabel: "n8n", category: "Automation", mass: 0.9, accent: "#ec4899" },
  { id: "postgres", label: "PostgreSQL", shortLabel: "PG", category: "Tools", mass: 1.1, accent: "#38bdf8" },
  { id: "docker", label: "Docker", shortLabel: "Docker", category: "Tools", mass: 1.0, accent: "#60a5fa" },
  { id: "arduino", label: "Arduino", shortLabel: "ARD", category: "IoT", mass: 0.9, accent: "#2dd4bf" },
  { id: "esp32", label: "ESP32", shortLabel: "ESP", category: "IoT", mass: 1.0, accent: "#34d399" },
  { id: "mqtt", label: "MQTT", shortLabel: "MQTT", category: "IoT", mass: 0.9, accent: "#f59e0b" },
  { id: "cisco", label: "Cisco", shortLabel: "CCNA", category: "Networking", mass: 1.2, accent: "#0ea5e9" },
  { id: "fiber", label: "Fiber Optic", shortLabel: "FO", category: "Networking", mass: 1.1, accent: "#f97316" },
];
```

- [ ] **Step 3: Create experiment data module**

Create `src/data/experiments.ts`:

```ts
export type ExperimentCategory =
  | "Physics"
  | "Gravity"
  | "GSAP"
  | "WebGL"
  | "AI"
  | "Network"
  | "IoT"
  | "Utility";

export type ExperimentStatus = "live" | "concept";

export interface ExperimentItem {
  id: string;
  title: string;
  category: ExperimentCategory;
  description: string;
  tech: string[];
  interaction: string;
  status: ExperimentStatus;
  route: string;
  accent: string;
  reducedMotionFallback: string;
}

export const experiments: ExperimentItem[] = [
  {
    id: "falling-stack",
    title: "Falling Stack",
    category: "Physics",
    description: "Skill chips drop into a bounded gravity field, collide, drag, and reset.",
    tech: ["Matter.js", "React", "GSAP"],
    interaction: "Drag chips, change gravity, pause, and reset the field.",
    status: "live",
    route: "/lab?experiment=falling-stack",
    accent: "#84cc16",
    reducedMotionFallback: "Categorized skill chips with no physics simulation.",
  },
  {
    id: "project-collision-wall",
    title: "Project Collision Wall",
    category: "Gravity",
    description: "Project screenshots fall into a board and snap back into a readable archive.",
    tech: ["Matter.js", "GSAP Flip"],
    interaction: "Open, toss, and sort project cards.",
    status: "concept",
    route: "/lab?experiment=project-collision-wall",
    accent: "#818cf8",
    reducedMotionFallback: "Static project archive grid.",
  },
  {
    id: "network-topology",
    title: "Network Topology Playground",
    category: "Network",
    description: "Infrastructure nodes connect with tension lines and signal pulses.",
    tech: ["React", "SVG", "GSAP"],
    interaction: "Drag nodes and watch edge tension update.",
    status: "concept",
    route: "/lab?experiment=network-topology",
    accent: "#22d3ee",
    reducedMotionFallback: "Static topology diagram.",
  },
  {
    id: "ai-debate-field",
    title: "AI Debate Particle Field",
    category: "AI",
    description: "Debate agents orbit, exchange argument pulses, and converge on consensus.",
    tech: ["GSAP", "Canvas"],
    interaction: "Select stance and watch agents exchange signals.",
    status: "concept",
    route: "/lab?experiment=ai-debate-field",
    accent: "#a78bfa",
    reducedMotionFallback: "Static agent relationship diagram.",
  },
  {
    id: "iot-signal-field",
    title: "IoT Signal Field",
    category: "IoT",
    description: "Sensor points emit packets across a grid like MQTT traces.",
    tech: ["Canvas", "GSAP"],
    interaction: "Trigger sensors and inspect packet paths.",
    status: "concept",
    route: "/lab?experiment=iot-signal-field",
    accent: "#34d399",
    reducedMotionFallback: "Static sensor grid.",
  },
  {
    id: "fiscal-gravity",
    title: "Fiscal Gravity",
    category: "Utility",
    description: "Budget categories become weighted bodies that cluster by spend size.",
    tech: ["Matter.js", "React"],
    interaction: "Adjust category weights and watch clusters rebalance.",
    status: "concept",
    route: "/lab?experiment=fiscal-gravity",
    accent: "#f59e0b",
    reducedMotionFallback: "Static weighted category chart.",
  },
];
```

- [ ] **Step 4: Update Hero floating cards to use project data**

In `src/components/Hero.tsx`, import:

```ts
import { heroPreviewProjects } from "@/data/projects";
```

Replace `FLOATING_CARDS` with a layout config keyed by project id:

```ts
const HERO_CARD_LAYOUT: Record<string, string> = {
  "arena-debate": "hidden md:block absolute left-[4%] top-[18%] w-[180px] xl:w-[220px] rotate-[-14deg]",
  "reka-ai": "hidden md:block absolute right-[5%] top-[14%] w-[180px] xl:w-[220px] rotate-[12deg]",
  "fiscal-ai": "hidden lg:block absolute left-[10%] bottom-[14%] w-[200px] xl:w-[240px] rotate-[10deg]",
  sitiket: "hidden lg:block absolute right-[8%] bottom-[18%] w-[200px] xl:w-[240px] rotate-[-9deg]",
  "iot-system": "hidden xl:block absolute right-[22%] bottom-[4%] w-[150px] rotate-[-7deg]",
};
```

Render:

```tsx
{heroPreviewProjects.map((project) => (
  <div
    key={project.id}
    className={`float-card ${HERO_CARD_LAYOUT[project.id]} rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10`}
    style={{ willChange: "transform" }}
  >
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      className="w-full h-auto block"
    />
  </div>
))}
```

- [ ] **Step 5: Update Projects to use featured data**

In `src/components/Projects.tsx`, remove the local `featured` array and import:

```ts
import { featuredProjects } from "@/data/projects";
```

Rename references:

```ts
featuredProjects.map(...)
```

Update component props:

```ts
import type { ProjectItem } from "@/data/projects";
```

Use `ProjectItem` instead of `(typeof featured)[0]`.

- [ ] **Step 6: Verify shared data extraction**

Run:

```powershell
rtk npm run lint
rtk npm run build
```

Expected:

```text
0 errors
dist/
```

- [ ] **Step 7: Commit shared data**

Run:

```powershell
rtk git add src/data src/components/Hero.tsx src/components/Projects.tsx
rtk git commit -m "refactor: extract portfolio data"
```

## Task 4: Add `/lab` Route And Lab Page Shell

**Files:**
- Create: `src/pages/Lab.tsx`
- Create: `src/components/lab/LabHero.tsx`
- Create: `src/components/lab/LabGallery.tsx`
- Create: `src/components/lab/ExperimentCard.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Lab hero**

Create `src/components/lab/LabHero.tsx`:

```tsx
import { ArrowLeft, Orbit, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function LabHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden px-5 pt-32 pb-16 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--electric)]/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--electric)]/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-[var(--warm-white)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio
        </Link>

        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--electric)]/20 bg-[var(--electric)]/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--electric)]">
            <Sparkles className="h-3.5 w-3.5" />
            Open Lab
          </div>
          <h1 className="text-[clamp(3.25rem,11vw,8rem)] font-bold leading-[0.86] text-[var(--warm-white)]">
            Drag things.
            <br />
            Break motion.
            <br />
            Study systems.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A playground for physics, gravity, GSAP, AI interfaces, networking diagrams, and IoT signals. The portfolio stays focused; the lab is where experiments can breathe.
          </p>
        </div>

        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <Orbit className="mb-3 h-5 w-5 text-[var(--electric)]" />
            Physics-first interactions
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            Resettable simulations
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            Reduced-motion fallbacks
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ExperimentCard**

Create `src/components/lab/ExperimentCard.tsx`:

```tsx
import { ArrowUpRight, PauseCircle, PlayCircle } from "lucide-react";
import type { ExperimentItem } from "@/data/experiments";

interface ExperimentCardProps {
  experiment: ExperimentItem;
  active: boolean;
  onOpen: (id: string) => void;
}

export function ExperimentCard({ experiment, active, onOpen }: ExperimentCardProps) {
  const isLive = experiment.status === "live";

  return (
    <button
      type="button"
      onClick={() => onOpen(experiment.id)}
      className="group relative min-h-[17rem] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-5 text-left transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric)]"
      aria-pressed={active}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-80"
        style={{ background: experiment.accent }}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {experiment.category}
            </span>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {experiment.status}
            </span>
          </div>
          <h3 className="text-2xl font-bold leading-tight text-[var(--warm-white)]">
            {experiment.title}
          </h3>
        </div>
        {isLive ? (
          <PlayCircle className="h-5 w-5 text-[var(--electric)]" />
        ) : (
          <PauseCircle className="h-5 w-5 text-muted-foreground/50" />
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {experiment.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {experiment.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>{experiment.interaction}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
}
```

- [ ] **Step 3: Create LabGallery**

Create `src/components/lab/LabGallery.tsx`:

```tsx
import { useMemo, useState } from "react";
import { experiments, type ExperimentCategory } from "@/data/experiments";
import { ExperimentCard } from "@/components/lab/ExperimentCard";

const filters: Array<"All" | ExperimentCategory> = [
  "All",
  "Physics",
  "Gravity",
  "GSAP",
  "WebGL",
  "AI",
  "Network",
  "IoT",
  "Utility",
];

interface LabGalleryProps {
  activeExperimentId: string;
  onOpenExperiment: (id: string) => void;
}

export function LabGallery({ activeExperimentId, onOpenExperiment }: LabGalleryProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "All") return experiments;
    return experiments.filter((experiment) => experiment.category === filter);
  }, [filter]);

  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-3">Experiment Index</p>
            <h2 className="text-4xl font-bold text-[var(--warm-white)] md:text-5xl">
              Pick a system
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  filter === item
                    ? "border-[var(--electric)] bg-[var(--electric)]/10 text-[var(--electric)]"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-[var(--warm-white)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              active={experiment.id === activeExperimentId}
              onOpen={onOpenExperiment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Lab page**

Create `src/pages/Lab.tsx`:

```tsx
import React, { Suspense, useMemo, useState } from "react";
import SEO from "@/components/SEO";
import { LabHero } from "@/components/lab/LabHero";
import { LabGallery } from "@/components/lab/LabGallery";
import { experiments } from "@/data/experiments";

const FallingStackExperiment = React.lazy(() =>
  import("@/components/lab/FallingStackExperiment").then((module) => ({
    default: module.FallingStackExperiment,
  }))
);

function LabLoading() {
  return (
    <div className="flex min-h-[24rem] items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
      <div className="h-8 w-8 rounded-full border-2 border-[var(--electric)]/20 border-t-[var(--electric)] animate-spin" />
    </div>
  );
}

export default function Lab() {
  const [activeExperimentId, setActiveExperimentId] = useState("falling-stack");

  const activeExperiment = useMemo(
    () => experiments.find((experiment) => experiment.id === activeExperimentId) ?? experiments[0],
    [activeExperimentId]
  );

  return (
    <main className="min-h-screen bg-[var(--surface-0)] text-foreground grain">
      <SEO
        title="Open Lab | Andre Saputra"
        description="Interactive lab for physics, gravity, GSAP, WebGL, AI, networking, and IoT interface experiments by Andre Saputra."
        keywords={["Andre Saputra", "Open Lab", "GSAP", "Matter.js", "WebGL", "Physics UI", "Creative Developer"]}
        url="https://andresptr.site/lab"
      />
      <LabHero />
      <LabGallery activeExperimentId={activeExperimentId} onOpenExperiment={setActiveExperimentId} />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<LabLoading />}>
            {activeExperiment.id === "falling-stack" ? (
              <FallingStackExperiment experiment={activeExperiment} />
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8">
                <p className="section-label mb-3">Concept</p>
                <h2 className="text-3xl font-bold text-[var(--warm-white)]">
                  {activeExperiment.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {activeExperiment.description}
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  Static fallback: {activeExperiment.reducedMotionFallback}
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 5: Add `/lab` route**

Modify `src/App.tsx`:

```tsx
import React from "react";
```

Add:

```tsx
const Lab = React.lazy(() => import("./pages/Lab"));

const RouteFallback = () => (
  <div className="min-h-screen bg-[var(--surface-0)] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);
```

Wrap routes in `Suspense`:

```tsx
<React.Suspense fallback={<RouteFallback />}>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/lab" element={<Lab />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</React.Suspense>
```

- [ ] **Step 6: Verify Lab route shell**

Run:

```powershell
rtk npm run lint
rtk npm run build
```

Expected:

```text
0 errors
dist/
```

- [ ] **Step 7: Commit Lab route shell**

Run:

```powershell
rtk git add src/App.tsx src/pages/Lab.tsx src/components/lab src/data/experiments.ts
rtk git commit -m "feat: add open lab route"
```

## Task 5: Falling Stack Matter.js Experiment

**Files:**
- Create: `src/components/lab/ExperimentShell.tsx`
- Create: `src/components/lab/StaticExperimentPreview.tsx`
- Create: `src/components/lab/FallingStackExperiment.tsx`

- [ ] **Step 1: Create static fallback component**

Create `src/components/lab/StaticExperimentPreview.tsx`:

```tsx
import { skills } from "@/data/skills";

export function StaticExperimentPreview() {
  const groups = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ?? [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(groups).map(([category, items]) => (
        <div key={category} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[var(--warm-white)]">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {skill.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create experiment shell**

Create `src/components/lab/ExperimentShell.tsx`:

```tsx
import { Pause, Play, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import type { ExperimentItem } from "@/data/experiments";

interface ExperimentShellProps {
  experiment: ExperimentItem;
  paused: boolean;
  onTogglePaused: () => void;
  onReset: () => void;
  children: ReactNode;
}

export function ExperimentShell({
  experiment,
  paused,
  onTogglePaused,
  onReset,
  children,
}: ExperimentShellProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="section-label mb-2">{experiment.category} / Live Experiment</p>
          <h2 className="text-3xl font-bold text-[var(--warm-white)]">{experiment.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {experiment.interaction}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onTogglePaused}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-muted-foreground transition-colors hover:text-[var(--warm-white)]"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-muted-foreground transition-colors hover:text-[var(--warm-white)]"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}
```

- [ ] **Step 3: Create Falling Stack experiment**

Create `src/components/lab/FallingStackExperiment.tsx`:

```tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Matter from "matter-js";
import type { ExperimentItem } from "@/data/experiments";
import { skills } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ExperimentShell } from "@/components/lab/ExperimentShell";
import { StaticExperimentPreview } from "@/components/lab/StaticExperimentPreview";

interface FallingStackExperimentProps {
  experiment: ExperimentItem;
}

interface BodySkill {
  id: string;
  label: string;
  accent: string;
  body: Matter.Body;
}

export function FallingStackExperiment({ experiment }: FallingStackExperimentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [bodySkills, setBodySkills] = useState<BodySkill[]>([]);

  const visibleSkills = useMemo(() => skills.slice(0, 17), []);

  const reset = useCallback(() => {
    setResetKey((value) => value + 1);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height, 420);

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.9 },
      enableSleeping: true,
    });

    const runner = Matter.Runner.create();
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const floor = Matter.Bodies.rectangle(width / 2, height + 28, width + 80, 56, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-28, height / 2, 56, height + 80, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 28, height / 2, 56, height + 80, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -40, width + 80, 56, wallOptions);

    const bodies = visibleSkills.map((skill, index) => {
      const body = Matter.Bodies.rectangle(
        80 + ((index * 118) % Math.max(width - 160, 180)),
        34 + Math.floor(index / 4) * 44,
        Math.max(72, skill.label.length * 9 + 32),
        38,
        {
          restitution: 0.55,
          friction: 0.08,
          frictionAir: 0.018,
          density: 0.001 * skill.mass,
          chamfer: { radius: 18 },
        }
      );
      Matter.Body.setAngle(body, ((index % 5) - 2) * 0.12);
      return { id: skill.id, label: skill.label, accent: skill.accent, body };
    });

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false },
      },
    });

    Matter.Composite.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...bodies.map((item) => item.body),
    ]);

    engineRef.current = engine;
    runnerRef.current = runner;
    mouseConstraintRef.current = mouseConstraint;
    setBodySkills(bodies);
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
      mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
      engineRef.current = null;
      runnerRef.current = null;
      mouseConstraintRef.current = null;
      setBodySkills([]);
    };
  }, [prefersReducedMotion, resetKey, visibleSkills]);

  useEffect(() => {
    const runner = runnerRef.current;
    const engine = engineRef.current;
    if (!runner || !engine) return;

    if (paused) {
      Matter.Runner.stop(runner);
    } else {
      Matter.Runner.run(runner, engine);
    }
  }, [paused]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let frame = 0;

    const update = () => {
      frame = window.requestAnimationFrame(update);
      setBodySkills((items) => [...items]);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <ExperimentShell
        experiment={experiment}
        paused
        onTogglePaused={() => undefined}
        onReset={() => undefined}
      >
        <div className="p-5">
          <StaticExperimentPreview />
        </div>
      </ExperimentShell>
    );
  }

  return (
    <ExperimentShell
      experiment={experiment}
      paused={paused}
      onTogglePaused={() => setPaused((value) => !value)}
      onReset={reset}
    >
      <div
        ref={containerRef}
        className="relative h-[34rem] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(129,140,248,0.12),transparent_42%),var(--surface-0)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />
        {bodySkills.map((item) => (
          <div
            key={item.id}
            className="absolute left-0 top-0 flex h-[38px] items-center justify-center rounded-full border px-4 text-xs font-semibold shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur"
            style={{
              width: Math.max(72, item.label.length * 9 + 32),
              transform: `translate3d(${item.body.position.x - Math.max(72, item.label.length * 9 + 32) / 2}px, ${item.body.position.y - 19}px, 0) rotate(${item.body.angle}rad)`,
              borderColor: `${item.accent}66`,
              background: `${item.accent}18`,
              color: item.accent,
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </ExperimentShell>
  );
}
```

- [ ] **Step 4: Verify Matter.js experiment**

Run:

```powershell
rtk npm run lint
rtk npm run build
```

Expected:

```text
0 errors
dist/
```

If TypeScript rejects `mouseConstraint.mouse.mousewheel`, replace the two cleanup lines with a typed guard:

```ts
const mouseAny = mouseConstraint.mouse as Matter.Mouse & { mousewheel?: EventListener };
if (mouseAny.mousewheel) {
  mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseAny.mousewheel);
  mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseAny.mousewheel);
}
```

- [ ] **Step 5: Commit Falling Stack experiment**

Run:

```powershell
rtk git add src/components/lab/FallingStackExperiment.tsx src/components/lab/ExperimentShell.tsx src/components/lab/StaticExperimentPreview.tsx
rtk git commit -m "feat: add falling stack lab experiment"
```

## Task 6: Homepage Lab Entry Points

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Navigation.tsx`

- [ ] **Step 1: Add Open Lab CTA to Hero**

In `src/components/Hero.tsx`, import `FlaskConical`:

```ts
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram, FlaskConical } from "lucide-react";
```

In the CTA group, add a third button after Contact:

```tsx
<Button
  asChild
  size="lg"
  variant="outline"
  className="rounded-full h-11 px-7 text-sm font-medium border-[var(--electric)]/30 bg-[var(--electric)]/10 hover:bg-[var(--electric)]/15 text-[var(--warm-white)] transition-all duration-300 backdrop-blur-sm w-full sm:w-auto justify-center"
>
  <a href="/lab">
    <FlaskConical className="mr-2 w-4 h-4" />
    Open Lab
  </a>
</Button>
```

Keep the current `See My Work` and `Contact Me` CTAs.

- [ ] **Step 2: Add Lab nav link**

In `src/components/Navigation.tsx`, update `navLinks`:

```ts
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Free Tools", href: "/#tools" },
  { name: "Lab", href: "/lab" },
  { name: "Contact", href: "/#contact" },
];
```

Replace the logo href with:

```tsx
<a href="/" className="flex items-center gap-2.5 group">
```

Update active-section logic so it does not mark hash sections on `/lab`:

```ts
useEffect(() => {
  if (window.location.pathname === "/lab") {
    setActiveSection("/lab");
    return;
  }
  const cleanup = observeSections();
  return cleanup;
}, [observeSections]);
```

Update top reset:

```ts
if (window.location.pathname !== "/lab" && window.scrollY < 200) setActiveSection("/");
```

- [ ] **Step 3: Verify navigation behavior**

Run:

```powershell
rtk npm run lint
rtk npm run build
```

Expected:

```text
0 errors
dist/
```

Manual browser checks:

- `/` shows Hero with Open Lab CTA.
- Open Lab CTA navigates to `/lab`.
- `/lab` has a Portfolio back link.
- Mobile menu includes Lab.
- Homepage hash links still jump to sections.

- [ ] **Step 4: Commit entry points**

Run:

```powershell
rtk git add src/components/Hero.tsx src/components/Navigation.tsx
rtk git commit -m "feat: link portfolio shell to open lab"
```

## Task 7: Browser QA And Performance Pass

**Files:**
- Modify only files needed to fix QA defects discovered in this task.

- [ ] **Step 1: Start dev server**

Run:

```powershell
rtk npm run dev
```

Expected:

```text
Local:   http://localhost:8080/
```

Keep the server running for browser QA.

- [ ] **Step 2: Desktop QA**

Open:

```text
http://localhost:8080/
http://localhost:8080/lab
```

Check:

- Hero text and CTAs do not overlap at 1440x900.
- `/lab` first viewport communicates Open Lab immediately.
- Experiment cards are readable.
- Falling Stack chips fall, collide, drag, pause, and reset.
- Links remain clickable.
- Browser console has no uncaught errors.

- [ ] **Step 3: Mobile QA**

Open with viewport around 390x844.

Check:

- Hero CTAs wrap without clipping.
- Mobile nav shows Lab.
- `/lab` page does not force horizontal scroll.
- Falling Stack is either usable or replaced by static fallback if performance is weak.
- Touch targets are at least 44px.

- [ ] **Step 4: Reduced-motion QA**

Emulate `prefers-reduced-motion: reduce`.

Check:

- `/lab` shows `StaticExperimentPreview` for Falling Stack.
- Pause/reset controls do not create confusing state in reduced motion.
- Homepage still exposes Open Lab CTA.

- [ ] **Step 5: Production build**

Stop the dev server. Then run:

```powershell
rtk npm run lint
rtk npm run build
```

Expected:

```text
0 errors
dist/
```

- [ ] **Step 6: Commit QA fixes**

If QA required code fixes:

```powershell
rtk git add <changed-files>
rtk git commit -m "fix: polish open lab qa issues"
```

If QA found no code defects, do not create an empty commit.

## Task 8: Documentation And PRD Sync

**Files:**
- Modify: `docs/portfolio-gravity-motion-prd.md`
- Modify: `docs/superpowers/plans/2026-06-08-open-lab-implementation-plan.md` only if the implementation revealed a necessary correction.

- [ ] **Step 1: Add implementation decision note to PRD**

Append this short section to `docs/portfolio-gravity-motion-prd.md`:

```md
## 20. MVP Implementation Decisions

- Open Lab ships as `/lab`.
- First live experiment is Falling Stack.
- Falling Stack uses Matter.js because it needs real 2D collision and gravity.
- Homepage remains the Portfolio Shell and only links into the lab for this MVP.
- Heavy lab code is lazy-loaded and does not block homepage rendering.
```

- [ ] **Step 2: Verify docs**

Run:

```powershell
rtk rg -n "T[B]D|TO[D]O|FIX[M]E" docs/portfolio-gravity-motion-prd.md docs/superpowers/plans/2026-06-08-open-lab-implementation-plan.md
```

Expected:

```text
no matches
```

- [ ] **Step 3: Commit docs**

Run:

```powershell
rtk git add docs/portfolio-gravity-motion-prd.md docs/superpowers/plans/2026-06-08-open-lab-implementation-plan.md
rtk git commit -m "docs: plan open lab implementation"
```

## Task 9: Final Release Readiness Check

**Files:**
- No planned edits.

- [ ] **Step 1: Verify final status**

Run:

```powershell
rtk git status --short
```

Expected:

```text
 M .claude/settings.local.json
```

The `.claude/settings.local.json` change is unrelated and should not be staged unless the user explicitly asks.

- [ ] **Step 2: Verify production build**

Run:

```powershell
rtk npm run lint
rtk npm run build
```

Expected:

```text
0 errors
dist/
```

- [ ] **Step 3: Prepare handoff summary**

Report:

- Route added: `/lab`
- MVP experiment: Falling Stack
- Dependency added: `matter-js`
- Homepage entry points: Hero CTA and Navigation Lab item
- Reduced-motion fallback: static categorized skills
- Verification commands and results
- Any remaining UX risks from browser QA

## Self-Review Checklist

Spec coverage:

- Portfolio Shell remains readable: Tasks 4, 6, and 7.
- Open Lab route exists: Task 4.
- One live physics experiment exists: Task 5.
- Matter.js is opt-in/lazy-loaded: Tasks 1, 4, and 5.
- Reset/pause controls exist: Task 5.
- Reduced-motion fallback exists: Task 5 and Task 7.
- Shared data modules exist: Task 3.
- Homepage entry points exist: Task 6.
- Performance and browser QA exist: Task 7 and Task 9.

Known tradeoffs:

- Project Gravity Board is intentionally not part of the first implementation batch. It should become a separate plan after Open Lab MVP is stable.
- Network Topology, AI Debate Field, IoT Signal Field, Fiscal Gravity, and Shader Garden Lite are represented as concepts in the gallery, not live experiments.
- Rapier/R3F physics is excluded from MVP to avoid turning the portfolio into a game and to keep dependency risk contained.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-08-open-lab-implementation-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
