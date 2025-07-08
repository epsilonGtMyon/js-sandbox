import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "src")

export default defineConfig({
  root: srcDir,
  base: "/js-sandbox/await-semaphore-sandbox/dist/",
  appType: "mpa",

  resolve: {
    alias: {
      "@/": srcDir,
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: resolve(srcDir, "index.html"),
        sandbox01: resolve(srcDir, "sandbox01/index.html"),
      },
    },
  },
  define: {
    "process.env": {}
  }
});