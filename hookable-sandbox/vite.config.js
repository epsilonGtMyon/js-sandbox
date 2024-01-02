import { resolve } from "node:path";

const rootDir = __dirname
const srcDir = resolve(rootDir, "src")
/** @type {import('vite').UserConfig} */
export default {
  root: srcDir,
  build: {
    outDir: resolve(rootDir, "dist"),
    rollupOptions: {
      input: {
        main: resolve(srcDir, "index.html"),
        sandbox01: resolve(srcDir, "sandbox01/index.html"),
        sandbox02: resolve(srcDir, "sandbox02/index.html"),
      },
    },
  },
};
