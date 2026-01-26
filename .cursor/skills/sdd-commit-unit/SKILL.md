---
name: sdd-commit-unit
description: Create small, reviewable commits per logical unit of work with consistent messages tied to the task ID. Use during implementation and batch runs.
metadata:
  sdd_category: git
---

# SDD: Commit a Logical Unit

## When to use

- After completing a coherent step (not after every file).
- Before switching focus or running validation.
- During `/task/batch` after each logical unit and/or task completion.

## Inputs

- `taskId`: e.g., `t4.4`, `T1.2`, `LIN-123`
- Short intent: what changed and why

## Commit message format

Use:

- `[<taskId>] <type>: <short description>`

Where `<type>` is one of: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`.

Examples:
- `[t4.4] feat: add navigation breadcrumbs`
- `[LIN-123] fix: handle empty state in dashboard list`

## Steps

1. Review `git diff` and confirm the change set matches the “logical unit”.
2. If the diff is mixed (multiple concerns), split it into multiple commits.
3. Create the commit with the message above.
4. If the project has `.sdd/git-state.json`, increment commit count and store last commit hash.
5. If the project uses Linear integration, consider logging a concise progress comment after the commit (start/end only unless configured for verbose).

## Output contract

Return:
- `commitMessage`
- `commitHash` (short hash if available)
- `notes` (only if something notable happened, e.g., “split into 2 commits”)
