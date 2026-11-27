import { cp, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const staticDirectories = ["Internal-data", "Public-data", "protocols"];

export default defineConfig({
  plugins: [
    {
      name: "copy-static-site-data",
      async closeBundle() {
        await Promise.all(
          staticDirectories.map((directory) =>
            cp(
              resolve(directory),
              resolve("dist", directory),
              { recursive: true, force: true },
            ),
          ),
        );
        const indexPath = resolve("dist", "index.html");
        const index = await readFile(indexPath, "utf8");
        const stylesheet = '    <link rel="stylesheet" href="/Internal-data/css/wwf-brand.css">\n';
        if (!index.includes("Internal-data/css/wwf-brand.css")) {
          await writeFile(indexPath, index.replace('    <link rel="stylesheet" crossorigin href="/assets/', `${stylesheet}    <link rel="stylesheet" crossorigin href="/assets/`));
        }
      },
    },
  ],
});
