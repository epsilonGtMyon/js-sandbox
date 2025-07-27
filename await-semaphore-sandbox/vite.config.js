import { dirname, resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "src")

const entryPoints = collectEntryPoints()

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
        ...entryPoints
      },
    },
  },
  define: {
    "process.env": {}
  }
});

function collectEntryPoints() {
  // src直下のファイル/ディレクトリ一覧
  const dirents = readdirSync(srcDir, { withFileTypes: true });

  const entryPoints = dirents
    // index.htmlを含むものを列挙
    .filter((dirent) => {
      if (dirent.isFile()) {
        return false;
      }

      const index = resolve(dirent.parentPath, dirent.name, "index.html");
      return existsSync(index);
    })
    // rollupOptions用に エントリ名(フォルダ名)をキーに,index.htmlのパスを値にするオブジェクトを作成
    .reduce((prev, current) => {

      prev[current.name] = resolve(current.parentPath, current.name, "index.html")
      return prev
    }, {})

  return entryPoints;
}
