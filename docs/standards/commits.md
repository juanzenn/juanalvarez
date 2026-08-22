# Commits

One line, stating the intention of the commit.

Conventional Commits, English, lowercase — `feat:` / `fix:` / `chore:` / `ci:` /
`docs:` / `build:`. The whole history is consistent about this; keep it that
way.

```
fix: move tailwind theme into css after v4 upgrade
```

The body stays empty almost always. Use it only for something the subject line
genuinely cannot carry — a breaking change, a co-author trailer, a revert
pointing at what it reverts. Reasoning belongs in the PR description, which is
where reviewers actually read it. No essays down here.

If the intention won't fit on one line, you probably have two commits.
