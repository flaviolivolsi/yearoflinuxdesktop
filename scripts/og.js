// Generates public/og/<slug>.png (1200x630) for every archetype, plus a
// default card for the homepage. Uses system chromium — run manually when
// archetype copy changes: bun run og
//
// Deliberately build-time: the site itself stays free of image tooling deps.

import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import archetypesData from '../src/data/quiz/archetypes.json';

const OUT = new URL('../public/og/', import.meta.url).pathname;
const TMP = new URL('../.og-tmp/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

function page({ eyebrow, title, sub, rows }) {
  return `<!doctype html><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; padding: 64px 72px;
    background: #101310; color: #e7e9e1;
    font-family: 'DejaVu Sans Mono', monospace;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .eyebrow { color: #99a08d; font-size: 22px; letter-spacing: 3px; text-transform: uppercase; }
  h1 { font-family: 'DejaVu Serif', Georgia, serif; font-size: 88px; line-height: 1.02; letter-spacing: -1px; margin: 18px 0 10px; }
  h1 .cursor { display: inline-block; width: 38px; height: 68px; background: #c6dc72; margin-left: 10px; }
  .sub { color: #99a08d; font-size: 30px; line-height: 1.35; max-width: 950px; }
  .rows { color: #c6dc72; font-size: 24px; line-height: 1.6; }
  .rows span { color: #99a08d; }
  .foot { display: flex; justify-content: space-between; color: #99a08d; font-size: 22px; }
  .foot b { color: #c6dc72; font-weight: normal; }
  </style><body>
  <div>
    <div class="eyebrow">${eyebrow}</div>
    <h1>${title}<span class="cursor"></span></h1>
    <div class="sub">${sub}</div>
  </div>
  ${rows ? `<div class="rows">${rows}</div>` : ''}
  <div class="foot"><span><b>$</b> yearoflinuxdesktop.com</span><span>not a horoscope. a blueprint.</span></div>
  </body>`;
}

function shoot(name, html) {
  const f = `${TMP}${name}.html`;
  writeFileSync(f, html);
  execSync(
    `chromium --headless --disable-gpu --window-size=1200,630 --screenshot="${OUT}${name}.png" "file://${f}"`,
    { stdio: 'pipe' }
  );
  console.log(`og/${name}.png`);
}

for (const a of archetypesData.archetypes) {
  const stack = a.blueprint
    .slice(0, 3)
    .map((r) => `<span>${r.k} ·</span> ${r.v.split('—')[0].trim()}`)
    .join('<br>');
  shoot(a.slug, page({
    eyebrow: 'your linux archetype',
    title: a.name,
    sub: a.tagline,
    rows: stack,
  }));
}

shoot('default', page({
  eyebrow: 'announced annually since 1998 · delivered never',
  title: 'The Year of the Linux Desktop',
  sub: 'It was never going to be a year on a calendar. It arrives one person at a time.',
  rows: '',
}));

rmSync(TMP, { recursive: true, force: true });
console.log('done.');
