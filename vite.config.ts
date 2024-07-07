import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import path from "path";
import * as proc from "child_process";

const commitHash = fs.existsSync(".git")
    ? proc
          .execSync(
              "git describe --long --always --dirty --exclude=* --abbrev=8"
          )
          .toString()
          .trim()
    : process.env.VCS_DESCRIBE || null;

const now = new Date();

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: ["es2017"],
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __COMMIT_HASH__: commitHash ? JSON.stringify(commitHash) : null,
        __BUILD_DATETIME__: JSON.stringify(
            now.toISOString().slice(0, -5).replace("T", " ")
        ),
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
