import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveCliRoot() {
  // cli/scripts -> cli
  return path.resolve(__dirname, "..");
}

async function main() {
  const cliRoot = resolveCliRoot();
  const src = path.resolve(cliRoot, "..", "template");
  const dest = path.join(cliRoot, "template");

  if (!(await fs.pathExists(src))) {
    throw new Error(`Template source not found: ${src}`);
  }

  // Always refresh to avoid drift between root template and packaged template.
  await fs.remove(dest);
  await fs.copy(src, dest, {
    filter: (p) => path.basename(p) !== ".git",
  });

  // eslint-disable-next-line no-console
  console.log(`Synced template: ${src} -> ${dest}`);
}

await main();

