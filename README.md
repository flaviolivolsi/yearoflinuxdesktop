# The Year of the Linux Desktop

> It never arrives. It never will. It was never going to be a year on a calendar.
> It arrives one person at a time.

The site behind [yearoflinuxdesktop.com](https://yearoflinuxdesktop.com): a
manifesto about why there has never been a better time to switch to Linux, and a
quiz that doesn't tell you which distro you "are" but hands you a complete
blueprint for your machine, plus a copy-paste prompt that makes an LLM walk you
through the installation.

**Status: pre-launch.** The manifesto is real; the quiz is currently a visual
mock while the machinery is designed properly.

## Principles

1. **Static and fast.** Astro, zero JavaScript so far. The quiz will need some;
   it will apologize.
2. **No surveillance.** No analytics, no cookies, no fingerprinting, no external
   requests. If counters ever exist, their code lives in this repo where anyone
   can audit exactly what is (and is not) collected.
3. **Open data.** The quiz's questions, archetypes, gates and scoring weights
   will ship as plain JSON in this repo. Disagree with a recommendation? Open a
   pull request, that is the whole idea.
4. **Honesty.** Every quiz result includes a "what will still annoy you"
   section. No horoscopes, no lies.

## Develop

```sh
bun install
bun run dev      # localhost:4321
bun run build    # static output in dist/
```

## Structure

```
src/
├── pages/index.astro        # single page: hero → manifesto → quiz
├── layouts/Base.astro       # head, header, footer
├── components/              # Hero, QuizMock, SiteFooter
├── data/manifesto.md        # the essay (PRs for typos welcome)
└── styles/global.css        # the whole design system, plain CSS
```

## License

[MIT](LICENSE). Fork it, translate it, argue with the quiz weights. That is
the point.
