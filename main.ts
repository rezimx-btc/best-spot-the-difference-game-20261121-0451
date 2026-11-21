/* The Lantern Keeper's Study: entrypoint.
   Copies game/ and screenshots/ from this repository into the output
   directory and writes /output/dossier.json with buildDossier from
   vendor/makefun-game.ts. Outside the grader, MAKEFUN_OUTPUT_DIR stands
   in for /output. Node 22 standard library only; runs twice, same bytes. */

import { buildDossier } from "./vendor/makefun-game.ts";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function freshDir(path: string): void {
  if (existsSync(path)) rmSync(path, { recursive: true, force: true });
  mkdirSync(path, { recursive: true });
}

mkdirSync(outDir, { recursive: true });
freshDir(join(outDir, "game"));
freshDir(join(outDir, "screenshots"));

cpSync(join(repoRoot, "game"), join(outDir, "game"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
});
/* buildDossier reads game/ and screenshots/ from outDir, so the copies above
   must happen first; the dossier is then byte-identical on every run. */
writeFileSync(join(outDir, "dossier.json"), dossier);
