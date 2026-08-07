# Context

Why this repo looks the way it does. For what it is and how to run it, see
[README.md](README.md).

Everything here fails the "could you work it out from the code in under a
minute?" test. If something becomes derivable — because the code changed or the
weirdness got deleted — remove it from this file in the same PR. Issues are
linked, never restated, so this file doesn't start lying the day one closes.

## History

Started as Next 13 Pages Router. Moved to the App Router in `2f93407`
(2023-06-03), then sat untouched until a dependency sweep in `e1598ce` and
`95f3ad5` (2026-08-06) took it to Next 16. pnpm throughout, deployed on Vercel.

React is on 18 while Next is on 16. That is not a stale pin — Next 16's peer
range is `^18.2.0 || ^19.0.0`, so React 18 is explicitly supported. Moving to 19
is a decision nobody has made, not a fix nobody got round to.

## What's actually CMS-driven

Less than the README's "content managed in Prismic" implies. Only **Projects**
and **blog posts** come from the CMS.

The hero headline, CTA copy and the entire About Me bio are hardcoded JSX in
`src/components/IndexSlices/HeroAbout.tsx` and
`src/components/IndexSlices/AboutMe.tsx`. The matching Prismic slices are still
fetched and then thrown away by `() => null` entries in `src/app/page.tsx`.

So editing the bio in Prismic changes nothing. Edit the component.

Those `() => null` entries are load-bearing and cannot just be deleted: the
slices still exist in the Prismic `index` document, and `SliceZone` renders
`TODOSliceComponent` for any slice without a registered component. Removing them
needs a Prismic-side change first.

This is a divergence to be closed, not the intended design — tracked in
[#47](https://github.com/juanzenn/juanalvarez/issues/47), which also covers a
latent `blog_posts` slice bug.

## Deliberate decisions

**The theme is a cookie.** `src/app/layout.tsx` reads `cookies().get("theme")`
server-side and puts `dark` on `<html>` during SSR;
`src/components/ThemeButton.tsx` writes the cookie with `js-cookie`. That is why
the root layout is `async`, why `js-cookie`
is a dependency, and why there is no `next-themes`. Commit `d5fc23c` added it to
kill the flash of light theme. Swapping to `localStorage` or a theme provider —
the obvious modernisation — silently brings the flash back, because the server
cannot read `localStorage`. There is no `prefers-color-scheme` fallback, so a
first visit is always light.

**`pnpm-workspace.yaml` exists and this is not a monorepo.** It has no
`packages:` key. It exists only to allow postinstall build scripts under pnpm 11.
Deleting it as monorepo leftovers breaks installs.

## Conventions

- **`cn()`** (`src/lib/cn.ts`) is `classNames(twMerge(...))` — that nesting, not
  the usual `twMerge(clsx(...))`. Commit `19f820a` replaced clsx with it.
- **Commits** are Conventional Commits: English, lowercase, `feat:` / `fix:` /
  `chore:` / `ci:` / `docs:`. Consistent across the whole history.
- **Text** is rendered through `src/components/utils/text` (`H1`–`H4`,
  `Paragraph`) rather than raw heading tags.
- **Icons**: `@heroicons/react` for UI icons,
  `@fortawesome/free-brands-svg-icons` for brand icons. `akar-icons` is legacy —
  don't reach for it in new code. Removal tracked in
  [#48](https://github.com/juanzenn/juanalvarez/issues/48).
- **Language** is English. The one Spanish string,
  `subject: "Mensaje de formulario: ..."` in `src/app/api/mail/route.ts`, is the
  subject line of a mail to the site owner and is meant to be Spanish.

## Fossils

- `src/components/IndexSlices/Employment.tsx` returns `<div>Employment</div>` and
  is commented out of `src/app/page.tsx` with no import, so uncommenting it does
  not compile. Being built out in
  [#20](https://github.com/juanzenn/juanalvarez/issues/20).
