import { cp } from "node:fs/promises";
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
      },
    },
  ],
});
