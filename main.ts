// gta6-meme-x: copies POST.json (the X post URL) to the output directory.
// The post itself is the meme: a GTA 6 scene with the make.fun ghost, posted
// from the entrant's own X account. This program only carries its URL.
// Deterministic: the same input produces the same output. No network, no randomness.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "POST.json");
if (!existsSync(src)) {
  throw new Error("POST.json not found in the repository root");
}
const post = JSON.parse(readFileSync(src, "utf8"));
if (typeof post.url !== "string" || !/^https:\/\/(x\.com|twitter\.com)\/\S+\/status\/\d+/.test(post.url)) {
  throw new Error("POST.json must carry a url like https://x.com/<handle>/status/<id>");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "POST.json"));
console.log(`copied POST.json (${post.url})`);
