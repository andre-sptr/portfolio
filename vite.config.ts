import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3010",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "three",
              test: /node_modules[\\/](three|@react-three[\\/](fiber|drei))[\\/]/,
              priority: 30,
            },
            {
              name: "vendor",
              test: /node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              priority: 25,
            },
            {
              name: "ui",
              test: /node_modules[\\/](lucide-react|framer-motion|clsx|tailwind-merge)[\\/]/,
              priority: 20,
            },
            {
              name: "physics",
              test: /node_modules[\\/]matter-js[\\/]/,
              priority: 15,
            },
            {
              name: "charts",
              test: /node_modules[\\/]recharts[\\/]/,
              priority: 15,
            },
            {
              name: "utils",
              test: /node_modules[\\/](date-fns|zod)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
}));
