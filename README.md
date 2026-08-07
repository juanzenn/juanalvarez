# juanalvarez.dev

My personal site and blog — [juanalvarez.dev](https://juanalvarez.dev). Next.js App Router, content managed in Prismic, deployed on Vercel.

## Stack

| Piece | What it does |
| --- | --- |
| [Next.js 16](https://nextjs.org/) (App Router) | Framework. Pages are server components; content is fetched at request time and cached by tag. |
| [Prismic](https://prismic.io/) | CMS. Drives the homepage slices and every blog post. |
| [Tailwind CSS](https://tailwindcss.com/) 3 + [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography) | Styling. The `prose` classes handle blog post body copy. |
| [Framer Motion](https://www.framer.com/motion/) | Mobile menu transitions. |
| [Nodemailer](https://nodemailer.com/) | Sends the contact form through Gmail SMTP. |
| [ImprovMX](https://improvmx.com/) | Email forwarding for the `@juanalvarez.dev` domain — see [Email](#email). |
| [Cypress](https://www.cypress.io/) | End-to-end tests. |
| [Vercel](https://vercel.com/) | Hosting. |

Package manager is **pnpm** (`pnpm@11.17.0`, pinned via `packageManager`). Vercel builds with Corepack enabled — see `vercel.json`.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

You need a `.env` before the app will boot — Prismic is required, the rest depends on what you're touching:

| Variable | Required | What it's for |
| --- | --- | --- |
| `API_ENDPOINT` | yes | Prismic repository name. Passed to `prismic.getRepositoryEndpoint()`, so it's the repo **name**, not a full URL. |
| `MAIL_USER` | contact form only | Gmail account used as the SMTP sender. |
| `MAIL_PASSWORD` | contact form only | Gmail **app password**, not the account password. |
| `PRISMIC_WEBHOOK_SECRET` | production only | Shared secret guarding `/api/revalidate`. If unset, the route accepts any request. |
| `PRISMIC_CUSTOM_TYPES_TOKEN` | `pnpm codegen` only | Write-scoped bearer token for the Custom Types API, used to regenerate `src/types.generated.ts`. Mint it with `npx prismic token create --write`, or in the repository's Settings → API & Security → Write APIs. |

To typecheck, run `pnpm typecheck` rather than a bare `tsc --noEmit`. On a checkout that has never run `dev` or `build`, `tsc` alone reports seven false `TS2307` "cannot find module" errors against the static image imports — see [Scripts](#scripts).

## Layout

```
src/
  app/
    page.tsx              Homepage — renders Prismic slices
    blog/                 Post index and [slug] detail page
    contact/              Contact form page
    api/mail/             POST — sends the contact form email
    api/revalidate/       POST — Prismic webhook, busts the "prismic" cache tag
  components/
    IndexSlices/          One component per Prismic slice type
    MobileMenu/           Animated mobile nav
  lib/
    prismic.ts            Prismic client factory + preview support
  types.generated.ts      Generated from the Prismic custom types — do not edit by hand
```

### Content

Everything editorial lives in Prismic. The homepage is a slice zone; each slice type maps to a component in `src/components/IndexSlices/`. Blog posts are a `blog_post` custom type, looked up by a `slug` field rather than by Prismic UID.

`src/types.generated.ts` is produced by [`prismic-ts-codegen`](https://github.com/prismicio/prismic-ts-codegen) from the custom type definitions. After changing a type in Prismic, run `pnpm codegen` to regenerate it rather than editing it by hand. That reads the models straight from the Custom Types API, so it needs `PRISMIC_CUSTOM_TYPES_TOKEN` in `.env.local`.

Caching: in production the Prismic client tags every fetch with `prismic` and uses `force-cache`. A Prismic webhook pointed at `/api/revalidate` clears that tag on publish. In development it revalidates every 5 seconds instead, so edits show up without a restart.

## Email

Two separate things, easy to confuse:

**Inbound — ImprovMX.** Addresses on the domain (`info@juanalvarez.dev`, etc.) are aliases hosted by [ImprovMX](https://improvmx.com/), which forwards anything sent to them on to my personal Gmail inbox. There's no mailbox on the domain itself; ImprovMX is purely a forwarder, configured through the domain's MX records rather than anything in this repo. Nothing here breaks if it goes down — inbound mail just stops arriving.

**Outbound — Gmail SMTP.** The contact form (`src/app/api/mail/route.ts`) sends through `smtp.gmail.com` authenticated with `MAIL_USER` / `MAIL_PASSWORD`, with the `From` header set to `info@juanalvarez.dev` and `Reply-To` set to whatever the visitor typed. So the domain address on outgoing mail is the ImprovMX alias, but ImprovMX isn't doing the sending — Gmail is.

`MAIL_PASSWORD` must be a Google [app password](https://support.google.com/accounts/answer/185833); a normal account password will fail SMTP auth.

## Scripts

| Command | Does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (`next build`) |
| `pnpm start` | Serve a production build |
| `pnpm lint` | ESLint (flat config, `eslint.config.mjs`) |
| `pnpm codegen` | Regenerate `src/types.generated.ts` from the Prismic custom types |
| `pnpm typecheck` | `next typegen`, then `tsc --noEmit` |
| `pnpm cypress:open` | Open the Cypress runner |

`pnpm typecheck` runs `next typegen` first because TypeScript only knows that `import mePicture from "@/public/images/me-big.jpg"` is a module through `next-env.d.ts`, which references `next/image-types/global`. Next generates that file rather than committing it — it's gitignored, and in Next 16 it imports from `.next/`, which is build output. Generating it first makes the script correct from any starting state, including a fresh clone or CI checkout.
