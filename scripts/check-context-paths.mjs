import { existsSync, readFileSync } from "node:fs";

const DOC = "CONTEXT.md";
const ROOTS = ["src/", "public/", "cypress/", "scripts/", ".github/"];
const EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".json",
  ".yaml",
  ".yml",
  ".css",
  ".md",
];

const isPathLike = (token) => {
  if (!/^[@\w.][\w.@/-]*$/.test(token)) return false;
  if (ROOTS.some((root) => token.startsWith(root))) return true;
  if (token.startsWith("@")) return false;
  return EXTENSIONS.some((ext) => token.endsWith(ext));
};

const doc = readFileSync(DOC, "utf-8");
const tokens = [...doc.matchAll(/`([^`\n]+)`/g)].map((match) => match[1]);
const paths = [...new Set(tokens.filter(isPathLike))];
const missing = paths.filter((path) => !existsSync(path));

for (const path of paths) {
  console.log(`${missing.includes(path) ? "MISSING" : "ok     "} ${path}`);
}

if (missing.length > 0) {
  console.error(
    `\n${DOC} references ${missing.length} path(s) that no longer exist. ` +
      `Update the doc in the PR that moved them.`,
  );
  process.exit(1);
}

console.log(`\n${paths.length} path(s) checked, all present.`);
