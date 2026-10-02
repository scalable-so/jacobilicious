// Collect the package files from the repo root into src/generated/package-files.json.
// The download route builds each personal zip from this file, so nothing of the
// package is ever served as a public static file.
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const site = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(site, "..");
const INCLUDE = ["README.md", "install.sh", "brand.md", "skills", "assets/banner.png"];
const SKIP = new Set([".DS_Store"]);

function walk(path, out) {
  const s = statSync(path);
  if (s.isDirectory()) {
    for (const name of readdirSync(path).sort()) {
      if (!SKIP.has(name)) walk(join(path, name), out);
    }
    return;
  }
  out.push({
    path: relative(root, path).split("\\").join("/"),
    exec: (s.mode & 0o111) !== 0,
    b64: readFileSync(path).toString("base64"),
  });
}

const files = [];
for (const entry of INCLUDE) walk(join(root, entry), files);

const outDir = join(site, "src", "generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "package-files.json"), JSON.stringify(files));
console.log(`pack: ${files.length} files -> src/generated/package-files.json`);
