import {dirname, resolve} from "node:path"
import {fileURLToPath} from "node:url"

import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vitest/config"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],

  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".vue"],
  },

  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['e2e/*', 'node_modules/**'],
    root: __dirname,
    environmentOptions: {
      jsdom: {
        url: 'http://localhost'
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/assets/', '**/*.{test,spec}.{ts,tsx}'],
    },
  },
})
