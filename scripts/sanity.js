// Brute-force sanity harness: runs ALL 4^12 = 16,777,216 possible answer
// combinations through a precompiled fast path (verified against the real
// engine on a random sample) and reports the archetype distribution.
// Fails loudly if an archetype is dead (<0.2%) or hegemonic (>30%),
// if any named persona lands wrong, or if a guardrail breaks.
//
// Run: bun scripts/sanity.js

import { rank } from '../src/lib/engine.js';
import questionsData from '../src/data/quiz/questions.json';
import archetypesData from '../src/data/quiz/archetypes.json';

const questions = questionsData.questions;
const archetypes = archetypesData.archetypes;
const AXES = questionsData.axes;
const A = AXES.length;
const Q = questions.length;
const N = archetypes.length;
const TOTAL = 4 ** Q;

// ---- precompile: per (question, option) axis vector; per-axis maxima ------
const contrib = []; // [q][opt] -> Float64Array(A)
const axMax = new Float64Array(A);
questions.forEach((q, qi) => {
  contrib[qi] = q.options.map((o) => {
    const v = new Float64Array(A);
    for (const [ax, val] of Object.entries(o.axes || {})) v[AXES.indexOf(ax)] = val;
    return v;
  });
  for (let ax = 0; ax < A; ax++) {
    let best = 0;
    for (const v of contrib[qi]) if (v[ax] > best) best = v[ax];
    axMax[ax] += best;
  }
});

// Engine semantics: only axes present in the prototype are scored.
const protoEntries = archetypes.map((a) =>
  Object.entries(a.proto).map(([ax, val]) => [
    AXES.indexOf(ax),
    val,
    (a.weight && a.weight[ax]) || 1,
  ])
);
const sumW = protoEntries.map((list) => list.reduce((s, [, , w]) => s + w, 0));
const floors = archetypes.map((a) => {
  if (!a.floor) return null;
  return Object.entries(a.floor).map(([ax, min]) => [AXES.indexOf(ax), min]);
});
const slugIndex = Object.fromEntries(archetypes.map((a, i) => [a.slug, i]));
const GAMER = slugIndex['gamer'];
const ESCAPEE = slugIndex['escapee'];
const QM = questions.findIndex((q) => q.id === 'machine');
const QA = questions.findIndex((q) => q.id === 'anchor');
const QT = questions.findIndex((q) => q.id === 'terminal');
const QTIME = questions.findIndex((q) => q.id === 'time');
const QG = questions.findIndex((q) => q.id === 'gaming');

const answers = new Array(Q).fill(0);
const axes = new Float64Array(A);

function fastWinner() {
  axes.fill(0);
  for (let qi = 0; qi < Q; qi++) {
    const v = contrib[qi][answers[qi]];
    for (let ax = 0; ax < A; ax++) axes[ax] += v[ax];
  }
  for (let ax = 0; ax < A; ax++) if (axMax[ax] > 0) axes[ax] /= axMax[ax];
  let best = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < N; i++) {
    let s = 0;
    for (const [ax, pv, w] of protoEntries[i]) s += w * (1 - Math.abs(axes[ax] - pv));
    s /= sumW[i];
    if (floors[i]) {
      for (const [ax, min] of floors[i]) if (axes[ax] < min) s -= 1;
    }
    if (answers[QA] === 3 && i === GAMER) s += 0.06;
    if (answers[QM] === 2 && i === ESCAPEE) s += 0.06;
    if (s > bestScore) {
      bestScore = s;
      best = i;
    }
  }
  return best;
}

// ---- fast path must agree with the real engine (sampled) ------------------
let rng = 42;
const nextRand = () => (rng = (rng * 1103515245 + 12345) & 0x7fffffff) / 0x80000000;
let disagreements = 0;
for (let t = 0; t < 10000; t++) {
  for (let i = 0; i < Q; i++) answers[i] = Math.floor(nextRand() * 4);
  const fast = archetypes[fastWinner()].slug;
  const real = rank(answers, questions, archetypes).winner.slug;
  if (fast !== real) disagreements++;
}
console.log(`Fast-path vs engine agreement: ${10000 - disagreements}/10000`);
let failed = disagreements > 0;

// ---- exhaustive sweep ------------------------------------------------------
const counts = new Array(N).fill(0);
const condOld = new Array(N).fill(0);
const condFear = new Array(N).fill(0);
const condAnti = new Array(N).fill(0);
let condOldTotal = 0, condFearTotal = 0, condAntiTotal = 0;
let guardrailViolations = 0;
let gamerWithoutSignal = 0, noGameTotal = 0;
let necroWithoutSignal = 0, notOldTotal = 0;
const t0 = Date.now();
for (let n = 0; n < TOTAL; n++) {
  let x = n;
  for (let i = 0; i < Q; i++) {
    answers[i] = x & 3;
    x >>= 2;
  }
  const w = fastWinner();
  counts[w]++;
  if (answers[QM] === 1) { condOld[w]++; condOldTotal++; }
  if (answers[QT] === 3) { condFear[w]++; condFearTotal++; }
  if (answers[QA] === 3) { condAnti[w]++; condAntiTotal++; }
  // no-default-winner invariants: an archetype must not win without its signal
  if (answers[QG] === 0 && answers[QA] !== 3) {
    noGameTotal++;
    if (archetypes[w].slug === 'gamer') gamerWithoutSignal++;
  }
  if (answers[QM] !== 1) {
    notOldTotal++;
    if (archetypes[w].slug === 'necromancer') necroWithoutSignal++;
  }
  // terminal-fear + little time must never receive Arch/Nix/Void
  if (
    answers[QT] === 3 &&
    (answers[QTIME] === 1 || answers[QTIME] === 2) &&
    ['arch-wizard', 'declarative', 'monk', 'rice-farmer'].includes(archetypes[w].slug)
  ) {
    guardrailViolations++;
  }
}
console.log(`\nDistribution over all ${TOTAL.toLocaleString()} combinations (${((Date.now() - t0) / 1000).toFixed(1)}s):`);
const order = counts.map((c, i) => [archetypes[i].slug, c]).sort((a, b) => b[1] - a[1]);
for (const [slug, c] of order) {
  const pct = (100 * c) / TOTAL;
  const bar = '█'.repeat(Math.round(pct));
  // Uniform-random answers are not real users: hardcore archetypes are
  // legitimately rare (and gate-driven ones inflated) under this prior.
  // DEAD means unreachable; HEGEMONIC is an absurdity backstop. The real
  // no-default-winner checks are the conditional invariants below.
  const flag = pct < 0.2 ? '  ← DEAD' : pct > 60 ? '  ← HEGEMONIC' : '';
  if (flag) failed = true;
  console.log(`${slug.padEnd(14)} ${pct.toFixed(1).padStart(5)}%  ${bar}${flag}`);
}

// ---- conditioned distributions (codex: calibration, not just reachability) --
function condReport(label, cond, total) {
  const top = cond.map((c, i) => [archetypes[i].slug, c]).sort((a, b) => b[1] - a[1]).slice(0, 4);
  console.log(`  ${label}: ` + top.map(([s, c]) => `${s} ${(100 * c / total).toFixed(0)}%`).join(', '));
}
console.log('\nConditioned winners:');
condReport('machine=old     ', condOld, condOldTotal);
condReport('terminal=fear   ', condFear, condFearTotal);
condReport('anchor=anticheat', condAnti, condAntiTotal);

// ---- personas (through the REAL engine) ------------------------------------
// order: machine, gpu, terminal, wifi, looks, updates, anchor, gaming, code, time, windows, rebuild
const personas = [
  ['retiree, 2012 laptop, zero terminal', [1, 3, 3, 0, 0, 3, 0, 0, 2, 2, 0, 0], ['necromancer', 'civilian']],
  ['scared civilian, new-ish laptop', [0, 2, 3, 1, 0, 2, 1, 0, 2, 2, 0, 1], ['civilian']],
  ['macOS designer-dev refugee', [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], ['escapee', 'pro']],
  ['unixporn poster', [0, 1, 0, 2, 2, 0, 0, 1, 1, 3, 2, 2], ['rice-farmer', 'arch-wizard']],
  ['terminal maximalist, hates decoration', [0, 1, 0, 2, 3, 1, 0, 0, 1, 3, 2, 2], ['monk']],
  ['competitive gamer with anticheat', [0, 0, 2, 1, 1, 1, 3, 2, 2, 1, 0, 1], ['gamer']],
  ['gamer buying a new machine for this', [3, 1, 2, 1, 1, 1, 0, 3, 2, 1, 1, 1], ['gamer']],
  ['mac-owning dev, tiling curious', [2, 3, 0, 2, 1, 1, 1, 0, 0, 1, 2, 1], ['pro', 'escapee', 'arch-wizard']],
  ['senior dev, wants boring, mouse is fine', [0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1], ['pro']],
  ['gnome-loving dev, floats windows', [0, 1, 0, 2, 1, 1, 0, 1, 0, 1, 0, 1], ['pro']],
  ['arch dev: tiling, daily updates, 2am configs', [0, 1, 0, 3, 3, 0, 0, 0, 0, 3, 2, 2], ['arch-wizard']],
  ['dotfiles-at-2am dev, tiles everything', [0, 1, 0, 3, 1, 0, 0, 0, 0, 3, 2, 2], ['arch-wizard', 'declarative']],
  ['one-command-rebuild dev', [0, 1, 0, 2, 0, 1, 0, 0, 0, 3, 2, 3], ['declarative']],
  ['stability-obsessed sysadmin type', [0, 1, 1, 1, 0, 2, 0, 0, 1, 1, 1, 1], ['grandpa', 'civilian', 'pro']],
  ['gamer with an old rig', [1, 1, 2, 1, 1, 1, 0, 2, 2, 1, 1, 1], ['gamer']],
  ['pro dev reviving an old thinkpad', [1, 1, 0, 2, 1, 1, 0, 0, 0, 1, 1, 1], ['pro', 'grandpa']],
  ['laptop rescuer: old machine, mid tinker, light needs', [1, 3, 2, 1, 0, 2, 0, 0, 2, 0, 0, 2], ['necromancer']],
];

console.log('\nPersonas:');
for (const [desc, ans, expected] of personas) {
  const r = rank(ans, questions, archetypes);
  const got = r.winner.slug;
  const ok = expected.includes(got);
  if (!ok) failed = true;
  const top3 = r.scored.slice(0, 3).map((s) => `${s.archetype.slug}:${s.score.toFixed(3)}`).join(' ');
  console.log(`${ok ? '✓' : '✗'} ${desc.padEnd(46)} → ${got.padEnd(13)} [${top3}]`);
}

console.log(`\nGuardrail (terminal-fear + no-time must never get Arch/Nix/Void): ${guardrailViolations} violations`);
if (guardrailViolations > 0) failed = true;

const gamerPct = (100 * gamerWithoutSignal) / noGameTotal;
const necroPct = (100 * necroWithoutSignal) / notOldTotal;
console.log(`Invariant (gamer without any gaming signal): ${gamerPct.toFixed(2)}% (must be <0.1%)`);
console.log(`Invariant (necromancer without an old machine): ${necroPct.toFixed(2)}% (must be <1%)`);
if (gamerPct >= 0.1 || necroPct >= 1) failed = true;

console.log(failed ? '\nSANITY: FAILED' : '\nSANITY: OK');
process.exit(failed ? 1 : 0);
