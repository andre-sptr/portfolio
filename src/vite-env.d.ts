/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables (VITE_ prefix) go here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
