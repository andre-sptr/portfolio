# Andre Saputra — Portfolio

Personal portfolio website built with Next.js (App Router), React, TypeScript, and Tailwind CSS, featuring a custom WebGL Obsidian Silk shader background and dedicated detail pages.

## Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & custom CSS ([`globals.css`](src/app/globals.css))
- **Icons**: Lucide React & custom inline SVGs
- **Graphics**: Custom WebGL fragment shader (`obsidian-silk-canvas` in [`HeroSection.tsx`](src/components/sections/HeroSection.tsx))

## Routes & Structure

- `/` — Main portfolio landing page ([`src/app/page.tsx`](src/app/page.tsx)):
  - **Hero**: Name display, role header, and WebGL Obsidian Silk backdrop
  - **About**: Profile overview and current focus areas
  - **Selected Projects**: Desktop horizontal accordion showcase (*Feral Blinds*) & mobile card carousel
  - **Credentials**: Toggleable Open Source & Certifications grid with modal preview
  - **Experience**: Timeline/grid of engineering and technical roles
  - **Contact**: Terminal-inspired CLI info panel and `mailto:` message composer
- `/about` — Full narrative biography, snapshot, milestones, and core capabilities ([`src/app/about/page.tsx`](src/app/about/page.tsx))
- `/projects` — Filterable catalog (`All`, `Website`, `AI Agent Tools`, `Useful Tools`) ([`src/app/projects/page.tsx`](src/app/projects/page.tsx))

```text
public/
  documents/            Certifications & CV assets
src/
  app/                  App Router pages (/ , /about, /projects), layout, metadata & globals.css
  components/
    layout/             Navbar (floating pill & Detail dropdown) and Footer
    sections/           Hero, About, Projects, ProjectsCatalogClient, Credentials, Experience, Contact
  data/                 profile.ts, projects.ts, experience.ts, education.ts
  lib/                  metadata.ts
```

## Getting Started

Requires **Node.js >= 22.18.0** and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Create production build
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript type checking
```

## Contact Form Behavior

The contact form in `ContactSection` validates name, email, and message on the client and opens a pre-filled `mailto:` draft in the visitor's default email client. No backend or database is used to store submissions.

## Design Reference

Layout and visual direction inspired by [miqdadbadjuber.id](https://miqdadbadjuber.id).
