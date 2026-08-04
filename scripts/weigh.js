// Post-build: replace __WEIGHT__ in every built page with that page's own
// HTML size in KB, rounded up. The page weighs itself. It is not shy about it.
//
// Runs as part of `bun run build`.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

function* htmlFiles(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

let touched = 0;
for (const f of htmlFiles(DIST)) {
  const s = readFileSync(f, 'utf8');
  if (!s.includes('__WEIGHT__')) continue;
  // Measure AFTER replacement, iterating until the printed value matches
  // the actual final size. The page must not lie about its own weight.
  let kb = Math.ceil(statSync(f).size / 1024);
  let out = '';
  for (let i = 0; i < 4; i++) {
    out = s.replaceAll('__WEIGHT__', String(kb));
    const real = Math.ceil(Buffer.byteLength(out, 'utf8') / 1024);
    if (real === kb) break;
    kb = real;
  }
  writeFileSync(f, out);
  touched++;
}
console.log(`weighed ${touched} page(s)`);
