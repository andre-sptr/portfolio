# Andre Saputra — Portfolio

Personal portfolio website for **Andre Saputra** (RF & Network Engineer), live at [andresptr.site](https://andresptr.site). Built as a statically exported Next.js (App Router) site with React, TypeScript, Tailwind CSS, a custom WebGL Obsidian Silk shader background, and dedicated detail pages.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export via `output: "export"` & `trailingSlash: true`) & React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) & custom CSS ([`src/app/globals.css`](src/app/globals.css))
- **Typography**: Self-hosted `@fontsource-variable/manrope` (`next/font/local`) with Google Fonts (`Oswald`, `Mulish`, `Inter`)
- **Icons**: Lucide React & custom inline SVGs
- **Graphics**: Custom WebGL fragment shader (`obsidian-silk-canvas` in [`HeroSection.tsx`](src/components/sections/HeroSection.tsx)) reacting to time, pointer movement, and scroll
- **SEO & Metadata**: Open Graph, Twitter Card, `Person` JSON-LD structured data ([`src/lib/metadata.ts`](src/lib/metadata.ts)), plus static `robots.txt` and `sitemap.xml`

## Routes & Features

- `/` — Main portfolio landing page ([`src/app/page.tsx`](src/app/page.tsx)):
  - **Hero**: Name display, role header (`RF & NETWORK ENGINEER`), and WebGL Obsidian Silk backdrop
  - **About**: Profile overview, current focus areas (Radio Trunking Operations, Radio Configuration & Provisioning, Radio Base Station Maintenance), and link to `/about`
  - **Selected Projects**: Desktop horizontal accordion showcase (*Feral Blinds*) & mobile swipeable card carousel with autoplay + Pause/Resume toggle (respecting `prefers-reduced-motion`, hover, and focus), keyboard navigation, per-project multi-screenshot galleries (`ProjectGalleryMedia`), live site links, and GitHub repository links
  - **Credentials & Code**: Accessible tab switcher toggling between **Open Source** repositories (7 repos) and **Certifications** (4 credentials opening full-resolution images in a new tab)
  - **Contact**: Terminal-inspired CLI info panel (`contact.exe`) and client-validated `mailto:` message composer with a collapsible mobile drawer
- `/about` — Full narrative biography, profile snapshot, career milestone path, and core capabilities ([`src/app/about/page.tsx`](src/app/about/page.tsx))
- `/projects` — Filterable catalog (`All`, `Website`, `AI Agent Tools`, `Useful Tools`) with animated sliding indicator and interactive multi-screenshot galleries ([`src/app/projects/page.tsx`](src/app/projects/page.tsx))

## Featured Projects

| # | Project | Category | Live | Source |
| --- | --- | --- | --- | --- |
| 01 | **NeuroStack**: Bilingual light-first landing page for website, software, and automation services | Website | [neurostack.andresptr.site](https://neurostack.andresptr.site/) | Private |
| 02 | **AntennaLab 3D**: Interactive 3D far-field antenna pattern and RF propagation lab | Useful Tools | [antenna.andresptr.site](https://antenna.andresptr.site/) | [3d-antenna](https://github.com/andre-sptr/3d-antenna) |
| 03 | **Over the Air**: Six-chapter 3D scrollytelling guide to two-way radio signal propagation | Website | [radio.andresptr.site](https://radio.andresptr.site/) | Not public |
| 04 | **Bubu AI**: Multimodal WhatsApp AI assistant and real-time 3D SSE pipeline observatory | AI Agent Tools | [waha.andresptr.site](https://waha.andresptr.site/) | [bubu-ai](https://github.com/andre-sptr/bubu-ai) |
| 05 | **LinkSight RF**: Interactive RF link budget, single-repeater relay, and SRTM30m Fresnel zone planner | Useful Tools | [rf.andresptr.site](https://rf.andresptr.site/) | [rf-link-planner](https://github.com/andre-sptr/rf-link-planner) |
| 06 | **AET AI Platform**: Multi-mode AI workspace (Smart Companion, Academic Writer, Coding Expert) for AET PCR | AI Agent Tools | [aetpcr.site](https://www.aetpcr.site/) | [aet-ai-platform](https://github.com/andre-sptr/aet-ai-platform) |
| 07 | **PDF Workbench**: Privacy-first browser PDF toolkit with 18 document utilities and OCR extraction | Useful Tools | [pdf.andresptr.site](https://pdf.andresptr.site/) | [pdf-workbench](https://github.com/andre-sptr/pdf-workbench) |
| 08 | **VPS File Hub**: Self-hosted file storage hub with batch uploads, MIME/signature verification, and share links | Useful Tools | [cloud.andresptr.site](https://cloud.andresptr.site) | [cloud-file-manager](https://github.com/andre-sptr/cloud-file-manager) |
| 09 | **REKAPAL**: Oil palm plantation lot & financial operations workspace with Telegram bot notifications | Website | [rekapal.site](https://rekapal.site) | [my-sawit](https://github.com/andre-sptr/my-sawit) |

## Project Structure

```text
public/
  documents/            Certifications (BNSP, Cisco CCNAv7, TOEIC) & CV PDF
  projects/             Multi-screenshot galleries for featured projects
  Logo.png, og-cover.png, favicon.* / apple-icon.png
src/
  app/                  App Router pages (/, /about, /projects), layout, robots.ts, sitemap.ts & globals.css
  components/
    layout/             Navbar (floating pill & Detail dropdown) and Footer
    sections/           Hero, About, Projects, ProjectsCatalogClient, Credentials, Contact
  data/                 profile.ts, projects.ts, education.ts
  lib/                  metadata.ts (Open Graph, Twitter, Person JSON-LD, site URL helper)
```

## Getting Started

Requires **Node.js >= 22.18.0** and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` in your browser (`next dev` binds to `0.0.0.0:3000`).

## Environment Variables

See [`.env.example`](.env.example):

- `NEXT_PUBLIC_SITE_URL` — Optional absolute production origin (e.g., `https://andresptr.site`). Sets `metadataBase`, canonical URLs, Open Graph URLs, `Person` JSON-LD `url`/`image`, `robots.txt` sitemap link, and `sitemap.xml` entries. Leave unset to omit canonical URLs and sitemap entries.

## Available Scripts

```bash
npm run dev         # Start development server (0.0.0.0:3000)
npm run build       # Create static export build in out/
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript type checking
npm test            # Run Node test runner (tests/*.test.mjs)
```

For a production static export with canonical URLs and `sitemap.xml`:

```bash
NEXT_PUBLIC_SITE_URL=https://andresptr.site npm run build
```

Static assets are generated in `out/` with `images.unoptimized: true` and `trailingSlash: true`.

## Contact Form Behavior

The contact form in `ContactSection` validates name, email, and message on the client and opens a pre-filled `mailto:` draft in the visitor's default email client. No backend or database is used to store submissions.

## Design Reference

Layout and visual direction inspired by [miqdadbadjuber.id](https://miqdadbadjuber.id).
