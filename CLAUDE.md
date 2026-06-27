# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini.

## Proyek

Portfolio site milik Andre Saputra. Single-page React app (Vite + TypeScript) dengan routing client-side, di-serve oleh Express (`server.mjs`) untuk produksi dan PM2 untuk proses manager.

## Stack

- **Build**: Vite 8 + `@vitejs/plugin-react-swc`
- **Bahasa**: TypeScript 6, React 19
- **Styling**: Tailwind CSS 4 (`@tailwindcss/postcss`), `tailwind-merge`, `class-variance-authority`
- **UI**: shadcn/ui (Radix primitives di `src/components/ui`), `lucide-react` icons
- **Routing**: `react-router-dom` v7
- **Data/Form**: `@tanstack/react-query`, `react-hook-form`, `zod`
- **Animasi/3D**: `framer-motion`, `gsap` (+ `@gsap/react`), `lenis`, `three` + `@react-three/fiber` + `@react-three/drei`, `matter-js`
- **SEO**: `react-helmet-async`
- **Server**: Express (`server.mjs` prod, `server.dev.mjs` dev proxy), PM2 (`ecosystem.config.cjs`)

## Struktur

```
src/
  App.tsx, main.tsx, index.css      # entry + global styles
  components/
    ui/                              # shadcn/ui primitives — jangan diedit kecuali perlu
    lab/                             # eksperimen visual (Three.js, GSAP, dll)
    *.tsx                            # section komponen (Hero, About, Projects, Contact, ...)
  pages/                             # route-level components (Index, Lab, ProjectDetail, NotFound)
  data/                              # konten statis (projects.ts, experiments.ts, skills.ts)
  hooks/                             # custom React hooks
  lib/
    utils.ts                         # helper `cn()` dll
    motion/                          # util animasi
  providers/                         # context providers (theme, query, dll)
public/                              # asset statis
server.mjs / server.dev.mjs          # Express server
ecosystem.config.cjs                 # konfigurasi PM2
```

## Konvensi

- **Import alias**: `@/` → `src/` (lihat `tsconfig.json` & `vite.config.ts`).
- **Komponen**: PascalCase, satu komponen per file. Section page diletakkan di `src/components/`; primitif UI di `src/components/ui/`.
- **Styling**: Tailwind utility-first. Gabungkan class dengan `cn()` dari `@/lib/utils`. Hindari CSS file baru; perluas `index.css` atau token Tailwind jika perlu.
- **Konten portfolio** (projects, experiments, skills) diedit di `src/data/*.ts`, bukan hard-coded di komponen.
- **Routing**: Tambahkan route di `App.tsx`. Karena SPA, `server.mjs` melakukan fallback ke `index.html`.
- **TypeScript**: Hindari `any`. Strict mode aktif via `tsconfig.app.json`.
- **shadcn/ui**: Bila perlu primitif baru, tambahkan via konvensi shadcn dan letakkan di `src/components/ui/`.

## Perintah

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run dev:full` | Vite + Express dev proxy paralel |
| `npm run build` | Build produksi ke `dist/` |
| `npm run lint` | ESLint seluruh repo |
| `npm run preview` | Preview build produksi |
| `npm run server:start` / `:stop` / `:restart` / `:logs` | Kontrol PM2 |

## Testing

Repo ini **tidak punya test suite** (tidak ada Vitest/Jest dikonfigurasi).

- **JANGAN** menjalankan full test suite — tidak ada yang dijalankan dan itu sia-sia.
- Jika menambahkan test di masa depan, **hanya jalankan file test yang terkait** dengan perubahan, bukan seluruh suite.
- Untuk verifikasi perubahan: jalankan `npm run lint` dan/atau `npm run build` pada file/area yang relevan; lakukan QA manual di browser dengan `npm run dev` bila menyangkut UI.
- Jangan menambahkan framework test atau scaffolding test tanpa diminta.

## Catatan lain

- Jangan commit kecuali user secara eksplisit meminta.
- Hindari mengubah file di `src/components/ui/` kecuali memang perlu — itu adalah primitif shadcn.
- File `public/` di-serve apa adanya; taruh asset (gambar, OG image, dsb) di sana.
