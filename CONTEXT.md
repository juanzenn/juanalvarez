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

**The `blog_posts` slice only supplies the heading.** It carries `title` and
`subtitle` and no items — `src/components/IndexSlices/BlogPosts.tsx` queries the
three most recent `blog_post` documents itself. Which posts appear, and in what
order, is deliberately not editable from Prismic.

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

**Metadata falls back through three levels.** `generateMetadata` in
`src/app/layout.tsx` takes its title and description from `settings.meta_title`
and `settings.meta_description` when those are filled, otherwise from the
`heroabout` slice, otherwise from `SITE_NAME` and `SITE_DESCRIPTION` in
`src/lib/site.ts`. The hero step is what keeps the tab title and share card in
step with the homepage without storing a second copy of the copy. Both fetches
are `.catch`ed to `null` — this runs for every route, so a throw here would take
down the whole site's metadata rather than one page's.

The cover image, `SITE_NAME` and `SITE_URL` stay hardcoded deliberately.
`cypress/e2e/metadata.cy.js` pins `og:image` to `/cover.png` and `og:site_name`
to "Juan Alvarez", and `metadataBase` needs a build-time constant. Moving the
cover into Prismic would serve it from `images.prismic.io` and fail that spec.

**The array spread in `src/app/layout.tsx` is load-bearing.**
`prismic.SliceZone` is a conditional type that distributes into
`[] | [Slice, ...Slice[]]`, and calling `.find` on that union of tuples throws
the type predicate away, so `slice.primary` stays the full union. Spreading into
a plain array first restores the narrowing. Simplifying it back to
`indexDoc.data.body.find(...)` puts the type error back.

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

Because that theme is a class, `src/app/global.css` redefines Tailwind's `dark`
variant with `@custom-variant`. Tailwind v4 ships `dark:` as a
`prefers-color-scheme` media query, so dropping that line does not error — it
silently hands the theme back to the OS and leaves the toggle inert, which is
what [#65](https://github.com/juanzenn/juanalvarez/issues/65) was.

**There is no Tailwind JS config.** The theme lives in `@theme` in
`src/app/global.css`, and `primary` is an alias of Tailwind's `blue` scale
declared there; the typography and forms plugins load with `@plugin`. A
v3-style tailwind config at the root is not picked up without an `@config`
directive, so adding one back would look live and do nothing. Why it went that
way rather than re-adding `@config` is in
`docs/adr/0001-tailwind-theme-in-css.md`.

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
