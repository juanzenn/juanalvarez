# Issues

Write prose, not a form. A few short paragraphs someone can read on their phone
and still understand without opening the code.

A bug report states the **what, when and where in its first paragraph**: what
broke, when it started, where it shows up. Everything after that is supporting
detail — the suspected cause, the commit that introduced it, what you already
ruled out. Mark a guess as a guess. A hunch dressed up as a diagnosis costs the
next person more than no diagnosis at all.

Feature and chore issues drop the when and where: what should exist, and why it
doesn't yet.

Link, don't restate. Point at the commit, the PR, the file. The title says
what's wrong, not what to do about it.

## Example

[#65](https://github.com/juanzenn/juanalvarez/issues/65), titled "Theme broken
after Tailwind CSS v3 → v4 upgrade", opens with:

> Theme (dark/light) styling stopped working after the Tailwind CSS v4 bump.
> Class-based dark mode no longer applies.

What, when, where, in two sentences. The rest of the issue is one paragraph of
suspected cause, the commit that introduced it, and a line on what the fix
probably involves — all of it clearly labelled as suspicion, none of it needed
to understand the report.
