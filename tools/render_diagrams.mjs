// Render every Mermaid source (docs/**/diagrams/*.mmd) to a matching .svg.
// Usage: npm run diagrams   (or: node tools/render_diagrams.mjs)
//
// Diagrams are committed as both .mmd (source) and .svg (rendered output) so the
// site works without a build step. Re-run this whenever you edit a .mmd file.
import { readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const repo = dirname(dirname(fileURLToPath(import.meta.url)));
const docs = join(repo, "docs");
const puppeteerConfig = join(repo, "puppeteer-config.json");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".mmd")) out.push(full);
  }
  return out;
}

const sources = walk(docs);
if (sources.length === 0) {
  console.log("No .mmd files found.");
  process.exit(0);
}

for (const src of sources) {
  const out = src.replace(/\.mmd$/, ".svg");
  console.log(`rendering ${src} -> ${out}`);
  execFileSync(
    "npx",
    ["-y", "@mermaid-js/mermaid-cli", "-i", src, "-o", out, "-p", puppeteerConfig],
    { stdio: "inherit" }
  );
}
console.log(`\n${sources.length} diagram(s) rendered.`);
