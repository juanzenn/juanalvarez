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

## What's CMS-driven

The homepage is entirely slice-driven: `src/app/page.tsx` fetches the `index`
document and hands every slice to `SliceZone`. Hero copy and CTA, the bio, the
projects and the blog section heading all come from Prismic.

**The Prismic labels don't match the API IDs.** In the dashboard the `heroabout`
slice is labelled "About Me" and `about_me` is labelled "Bio". Codegen copies
those labels into the doc comments in `src/types.generated.ts`, so both places
point you at the wrong slice.

**`blog_posts` fetches its own posts.** The slice model also carries an
`items[].blog` content relationship for hand-picking posts. It is deliberately
empty — `src/components/IndexSlices/BlogPosts.tsx` queries the three most recent
`blog_post` documents itself and never reads `items`. Filling that field in
Prismic looks like it should work and does nothing.

**`settings` is a site-wide singleton, not a slice.** `getSettings` in
`src/lib/prismic.ts` wraps the fetch in `React.cache`, and
`src/components/ContactDetails.tsx` and `src/components/SocialmediaLinks.tsx`
call it directly rather than taking props. They render on three routes — the
homepage, `/contact` and blog posts — so passing the document down would mean
threading it through every caller for no gain.

**Images stayed hardcoded on purpose.** The six hero banners, the mobile banner
and the portrait in `src/components/IndexSlices/AboutMe.tsx` are static
`next/image` imports, which is what buys them `placeholder="blur"`. They are
decorative rather than copy, so they were out of scope for
[#47](https://github.com/juanzenn/juanalvarez/issues/47).

**Page metadata is hardcoded and has already drifted.** The `title` in
`src/app/layout.tsx` and both `SITE_DESCRIPTION` and `DEFAULT_OG_IMAGE.alt` in `src/lib/site.ts`
still spell out superseded hero copy. Nothing derives metadata from the
`heroabout` slice, so editing the hero changes the page but not its tab title or
share card.

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
  `chore:` / `ci:` / `docs:` / `build:`. Consistent across the whole history.
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
