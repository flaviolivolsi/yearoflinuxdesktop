// The quiz engine. Deterministic, dependency-free, auditable.
// Runs identically in the build sanity harness and in the browser.

/** Max attainable raw score per axis, given the question bank. */
export function axisMaxima(questions) {
  const max = {};
  for (const q of questions) {
    const best = {};
    for (const opt of q.options) {
      for (const [axis, v] of Object.entries(opt.axes || {})) {
        if (v > (best[axis] || 0)) best[axis] = v;
      }
    }
    for (const [axis, v] of Object.entries(best)) {
      max[axis] = (max[axis] || 0) + v;
    }
  }
  return max;
}

/** answers: array of option indices, one per question → {axes, gates} */
export function computeProfile(answers, questions) {
  const raw = {};
  const gates = {};
  questions.forEach((q, i) => {
    const opt = q.options[answers[i]];
    if (!opt) return;
    for (const [axis, v] of Object.entries(opt.axes || {})) {
      raw[axis] = (raw[axis] || 0) + v;
    }
    Object.assign(gates, opt.gates || {});
  });
  const max = axisMaxima(questions);
  const axes = {};
  for (const axis of Object.keys(max)) {
    axes[axis] = max[axis] > 0 ? (raw[axis] || 0) / max[axis] : 0;
  }
  return { axes, gates };
}

/** Weighted closeness between a user profile and one archetype. Higher wins. */
export function scoreArchetype(axes, gates, archetype) {
  let score = 0;
  let totalWeight = 0;
  for (const [axis, target] of Object.entries(archetype.proto)) {
    const w = (archetype.weight && archetype.weight[axis]) || 1;
    score += w * (1 - Math.abs((axes[axis] || 0) - target));
    totalWeight += w;
  }
  score /= totalWeight;
  // Hard floors: some stacks are never a fair prescription below a minimum
  // comfort level, no matter how well the vibes match.
  if (archetype.floor) {
    for (const [axis, min] of Object.entries(archetype.floor)) {
      if ((axes[axis] || 0) < min) score -= 1;
    }
  }
  // Gate bonuses: hard facts should be able to outvote fuzzy vibes.
  if (gates.machine === 'deck' && archetype.slug === 'gamer') score += 0.12;
  if (gates.anchor === 'anticheat' && archetype.slug === 'gamer') score += 0.06;
  return score;
}

/** Full ranking, best first. */
export function rank(answers, questions, archetypes) {
  const { axes, gates } = computeProfile(answers, questions);
  const scored = archetypes
    .map((a) => ({ archetype: a, score: scoreArchetype(axes, gates, a) }))
    .sort((x, y) => y.score - x.score);
  return { axes, gates, scored, winner: scored[0].archetype };
}

/** Gate-driven adjustments layered on top of the winning archetype. */
export function personalize(archetype, gates) {
  const rows = archetype.blueprint.map((r) => ({ ...r }));
  const annoy = [archetype.annoy];
  const notes = [];

  if (gates.gpu === 'nvidia') {
    annoy.push(
      'An Nvidia card means one driver ritual per year. AMD users will smirk. Endure.'
    );
    const wayland = rows.some((r) => /hyprland|sway/i.test(r.v));
    if (wayland) {
      notes.push(
        'Nvidia + Wayland works these days, but keep an X11 session installed as an escape hatch until you trust it.'
      );
    }
  }

  if (gates.anchor === 'pro') {
    const i = rows.findIndex((r) => r.k === 'escape plan');
    const honest =
      'Adobe / MS Office: honestly, a VM or dual-boot for now. The alternatives are real (DaVinci, Krita, LibreOffice), but pretending they are identical would be lying.';
    if (i >= 0) rows[i].v = honest;
    else rows.push({ k: 'escape plan', v: honest });
  }

  if (gates.anchor === 'anticheat' && archetype.slug !== 'gamer') {
    rows.push({
      k: 'the airlock',
      v: 'keep a small Windows partition for the anticheat titles: an airlock, not a home',
    });
  }

  if (gates.machine === 'old') {
    notes.push(
      'On an older machine, prefer the lighter desktop variant. It will still feel faster than the OS it replaces.'
    );
  }

  if (gates.machine === 'deck') {
    notes.push(
      'The Deck already runs Linux; you switched a while ago. This blueprint is for the desk next to it.'
    );
  }

  if (gates.machine === 'none') {
    rows.push({ k: 'hardware', v: archetype.hardwareNone });
    notes.push(
      'Buying new? Prefer AMD or Intel graphics: the drivers live in the kernel and nothing needs a ritual. Only pick Nvidia if you specifically need CUDA.'
    );
  }

  return { rows, annoy, notes };
}

/** Terminal-comfort label for the setup prompt. */
export function comfortLabel(axes) {
  const t = axes.term || 0;
  if (t >= 0.7) return 'very comfortable in a terminal';
  if (t >= 0.35) return 'somewhat comfortable in a terminal';
  return 'a complete beginner in the terminal, explain everything';
}

const MACHINE_TEXT = {
  have: 'my current laptop',
  old: 'an old machine I want to revive',
  none: 'a machine I still need to buy',
  deck: 'a desktop machine (I also own a Steam Deck)',
};

const GPU_TEXT = {
  nvidia: 'Nvidia GPU',
  friendly: 'AMD or Intel graphics',
  unknown: 'unknown GPU (help me find out)',
};

const ANCHOR_TEXT = {
  none: 'nothing, clean break',
  some: 'one or two apps I could replace or run through a compatibility layer',
  pro: 'Adobe / MS Office professionally (I may need a VM or dual-boot)',
  anticheat: 'competitive games with anticheat (I may keep a small Windows partition)',
};

/** The LLM-neutral setup prompt. The actual conversion machine. */
export function buildPrompt(archetype, gates, axes, rows) {
  const lines = rows.map((r) => `- ${r.k}: ${r.v}`).join('\n');
  return `I want to switch this computer to Linux. Act as my guide and system administrator.

My situation:
- Machine: ${MACHINE_TEXT[gates.machine] || 'my computer'}
- Graphics: ${GPU_TEXT[gates.gpu] || 'unknown'}
- Terminal skill: ${comfortLabel(axes)}
- Still needed from Windows/macOS: ${ANCHOR_TEXT[gates.anchor] || 'not sure'}

My blueprint (from yearoflinuxdesktop.com, archetype: ${archetype.name}):
${lines}

Walk me through this one step at a time, in this order: back up my data, create the install USB, install the base system, then set up each blueprint piece. One step per message; wait for me to confirm before the next. If something breaks, debug it with me before moving on. I can paste terminal output and error messages to you.`;
}

/** Answers ⇄ URL string. Digits, one per question. Human-readable on purpose. */
export function encodeAnswers(answers) {
  return answers.join('');
}

export function decodeAnswers(s, questionCount) {
  if (!s || !/^[0-3]+$/.test(s) || s.length !== questionCount) return null;
  return [...s].map(Number);
}
