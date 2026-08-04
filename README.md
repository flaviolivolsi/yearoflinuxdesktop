# The Year of the Linux Desktop

> It never arrives. It never will. It was never going to be a year on a calendar.
> It arrives one person at a time.

The site behind [yearoflinuxdesktop.com](https://yearoflinuxdesktop.com): a
manifesto about why there has never been a better time to switch to Linux, and
a quiz that doesn't tell you which distro you "are" but hands you a complete
blueprint for your machine, plus a copy-paste prompt that makes an LLM walk you
through the installation.

**Status: live.** Currently at
[yearoflinuxdesktop.vercel.app](https://yearoflinuxdesktop.vercel.app) while
DNS catches up with ambition.

## What's inside

- **The manifesto** — `src/data/manifesto.md`. Typo PRs welcome.
- **The quiz** — 12 questions map onto 9 axes plus hard gates (Nvidia,
  anticheat, Mac, old machine), scored against 10 archetype blueprints. All
  questions, weights and archetypes are plain JSON in `src/data/quiz/`.
  Disagree with a recommendation? Open a pull request.
- **The harness** — `scripts/sanity.js` brute-forces all 16,777,216 possible
  answer combinations on every build: named personas must land on the right
  archetypes, terminal-phobic users can never receive Arch/NixOS/Void, and no
  archetype may win without its signature signal. The build fails otherwise.
- **The rice** — the site is themeable (gruvbox, catppuccin, nord, tokyo
  night, dracula…). A manifesto about owning your computer should let you
  restyle it while reading. Add a palette in a PR.
- **The shell** — press `~`. It has `cd`, `neofetch` and opinions.
- **Result cards** — each archetype has a page, an OG card, an ASCII sigil,
  and a client-side canvas download rendered in your current theme.
- **The pamphlet** — print the page; the manifesto becomes a two-column
  handout.

## Principles

1. **Static and fast.** Astro, plain CSS, no framework, no webfonts. Pages
   weigh themselves at build and print it in the footer.
2. **No surveillance.** No analytics, no cookies, no fingerprinting, no
   external requests on load (the PewDiePie video loads only when you press
   play). If counters ever exist, their code lives in this repo where anyone
   can audit exactly what is (and is not) collected.
3. **Open data.** The quiz is JSON. The scoring engine is one dependency-free
   file (`src/lib/engine.js`) that runs identically in the browser and in the
   test harness.
4. **Honesty.** Every quiz result includes a "what will still annoy you"
   section. No horoscopes, no lies.

## Develop

```sh
bun install
bun run dev      # localhost:4321
bun run build    # sanity harness + static build + self-weighing, in dist/
bun run sanity   # just the 16.7M-combination harness
bun run og       # regenerate OG card images (needs chromium)
```

## License

[MIT](LICENSE). Fork it, translate it, argue with the quiz weights.
