import {dirname, resolve} from "node:path"
import {fileURLToPath} from "node:url"
import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vitest/config"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["**/*.spec.{js,ts}"],
    exclude: ["node_modules/**"],
    root: __dirname,
    environmentOptions: {
      jsdom: {
        url: "http://localhost",
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/assets/", "**/*.d.ts", "**/*.test.ts", "**/*.spec.ts"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
