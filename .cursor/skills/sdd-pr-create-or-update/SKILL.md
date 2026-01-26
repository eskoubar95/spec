---
name: sdd-pr-create-or-update
description: Create or update a PR with correct base branch, task-linked title, and a structured body (changes, testing, acceptance). Use after validation or at milestone boundaries.
metadata:
  sdd_category: github
---

# SDD: Create or Update Pull Request

## When to use

- After `/task/validate` passes (or passes with known exceptions).
- During `/task/batch` when configured to open PRs per task or per milestone.
- When you need to refresh PR description after significant changes.

## Inputs

- `defaultBranch` (PR base) from `/sdd-git-default-branch`
- Current branch name (PR head)
- Task context:
  - `work/backlog/tasks.local.md` entry (preferred)
  - Optional: `spec/tasks/<taskId>/spec.md` and `acceptance.md`

## Rules

- Never assume the base branch is `main`. Always use `defaultBranch`.
- Prefer GitHub MCP if available; otherwise use `gh`; otherwise provide manual instructions.

## PR title

- `[<taskId>] <short description>`
- For milestone PRs: `[Milestone] <milestone-id>: <milestone objective>`

## PR body template

Use this structure:

- `## Summary`
- `## Changes`
- `## Testing`
- `## Acceptance`
- `## Related`
- `## Notes` (optional)

## Steps

1. Ensure branch is pushed (`git push -u origin HEAD`) if a remote exists.
2. Check whether a PR already exists for the current branch.
3. Generate/update PR body using:
   - acceptance criteria from task spec (preferred)
   - diff/commit history summary
4. Create or update the PR with:
   - base: `defaultBranch`
   - head: current branch
5. If the project uses deployment previews, add a `### Preview` section when a URL is available.

## Output contract

Return:
- `prUrl` (or explicit next-step if creation is not possible)
- `baseBranch`
- `headBranch`
