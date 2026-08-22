# Pull requests

We follow Google's
[guidance on writing good CL descriptions](https://google.github.io/eng-practices/review/developer/cl-descriptions.html).

The title is a short summary in active voice of what the change does — "move
tailwind theme into css", not "moved", not "tailwind fixes". Someone scanning
the log a year from now should be able to tell whether this is the change they
are hunting for.

The body is a few short paragraphs of prose, in English, explaining the change
and why it was made. No headings, no template to fill in. Reviewers read it
before the diff, so lead with the reason the diff exists rather than a
file-by-file tour of it.

Close the issue from the body: `Closes #69` on its own line.

Length follows the change. A dependency bump gets two sentences; a silent
breakage that took four things down with it gets more.

## Example

> **Title:** `fix: move tailwind theme into css after v4 upgrade`
>
> Closes #65.
>
> Tailwind v4 does not read a root `tailwind.config.js` without an explicit
> `@config` directive. The v4 bump added the new entrypoint and left the config
> behind with nothing pointing at it, so the whole config silently stopped
> applying — the dark variant, the `primary` scale, and both plugins went with
> it. A config that is never loaded is not an error, so nothing failed loudly.
>
> This moves the theme out of `tailwind.config.js` into `src/app/global.css`,
> which now declares it directly with `@theme`, `@custom-variant` and
> `@plugin`, and deletes the config file. Re-adding `@config` instead was
> rejected: a JS config carrying a `content` array disables v4's source
> detection, and the old globs missed `src/lib`.
