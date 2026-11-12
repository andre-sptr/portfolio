# Andre Saputra | RF Engineer Portfolio

A dark editorial portfolio focused on RF engineering, radio trunking operations, and communication infrastructure. The visual direction uses deep charcoal, off-white typography, and a restrained peach accent.

## Run locally

Use Node.js 22.18 or newer and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

The test script uses Node's built-in TypeScript type stripping and requires Node.js 22.18 or newer. The static production build is written to `out/`.

## Contact behavior

The contact message composer validates its fields in the browser and prepares a `mailto:` draft in the visitor's default email application. This website does not send, store, or process messages on a server. A backend or form provider must be configured before adding direct website submissions.

## Project structure

```text
public/                       Portrait, CV, favicon, and social card assets
src/app/                      Next.js app entry, metadata, and global styles
src/components/layout/        Floating navigation and footer
src/components/sections/      Home, About, Expertise, Projects, Experience, Credentials, Toolkit, Contact
src/components/ui/            Shared headings, project cards, dialogs, and contact actions
src/data/                     Profile, projects, experience, education, and skills
src/hooks/                    Responsive and reduced-motion preferences
src/lib/                      Metadata and shared scene utilities
tests/                        Unit and portfolio integrity tests
```

## Implementation stages

- Stage 01: Home Page
- Stage 02: About Page
- Stage 03: Projects Page
- Stage 04: Credentials Page
- Stage 05: Contact Page
- Stage 06: Components and design system
- Stage 07: Test and quality assurance

See the `STAGE-*-CHANGELOG.md` files and `STAGE-07-TEST-REPORT.md` for implementation notes and verification status.
