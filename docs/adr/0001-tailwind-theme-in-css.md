# 1. The Tailwind theme lives in CSS, not a JS config

Date: 2026-08-22

## Status

Accepted

## Context

The tailwindcss 3.4.19 → 4.3.3 bump (`2e1410c`, [#52](https://github.com/juanzenn/juanalvarez/pull/52)) moved `src/app/global.css` onto the v4 `@import 'tailwindcss'` entrypoint but left `tailwind.config.js` in place. Tailwind v4 does not read a root JS config automatically — it needs an explicit `@config` directive. There was none, so the entire config stopped being applied. A config that is never loaded is not an error, so nothing failed loudly.

Four things broke. Only the first was reported in [#65](https://github.com/juanzenn/juanalvarez/issues/65):

- `darkMode: "class"` was lost, so every `dark:` utility compiled to a `prefers-color-scheme` media query. The theme is a cookie-driven `dark` class on `<html>`, so the toggle went inert and the palette followed the OS instead.
- `colors.primary` (an alias of `blue`) was lost, so no `primary-*` utility generated any CSS at all — 43 usages across 13 files, covering the navbar, footer, links and focus rings.
- `@tailwindcss/typography` was not loaded, leaving blog post bodies unstyled.
- `@tailwindcss/forms` was not loaded, leaving the contact form inputs without their reset.

Two fixes were viable: add `@config` and keep the JS config authoritative, or move the theme into CSS and delete it.

## Decision

Move the theme into CSS. `src/app/global.css` declares it directly:

- `@theme` for the `primary` scale, aliased to `var(--color-blue-*)`, and `--font-sans`
- `@custom-variant dark (&:where(.dark, .dark *))` for the class-based theme
- `@plugin` for the typography and forms plugins

`tailwind.config.js` is deleted. Its one surviving customisation — prose links with no underline and a `primary-700` hover — moved onto the single `prose` element in `src/app/blog/[slug]/page.tsx` as `prose-a:no-underline prose-a:hover:text-primary-700`.

## Consequences

`@config` was rejected because a JS config carrying a `content` array disables v4's automatic source detection. The old globs covered `src/app` and `src/components` but not `src/lib`, so `FOCUS_RING` in `src/lib/focus-ring.ts` generated nothing under v3. Auto-detection picks it up; restoring the config would have restored that bug too.

The typography override moved onto the element because the plugin exposes those declarations only through the JS theme API, which would have kept the config file alive for two lines of CSS. There is exactly one `prose` consumer, so the cost is that a second one would not inherit the link styling. Equivalence was checked on emitted selector specificity rather than by eye: `prose-a:no-underline` still loses to the pre-existing `hover:prose-a:underline`, and `prose-a:hover:text-primary-700` still beats `dark:prose-a:text-primary-500`, matching what the config produced.

`prefers-color-scheme` is now ignored outright, which matches the behaviour the cookie was built for: a first visit is always light until the cookie is set.

Deleting the config also removes the failure mode that caused this — a file that reads as authoritative and is never loaded. Adding one back without `@config` would fail the same silent way, so CONTEXT.md records its absence as deliberate.
