---
name: sdd-task-preflight
description: Prepare a task workspace safely before implementation: clean working tree, correct base branch, and task branch naming. Use before /task/start execution work.
metadata:
  sdd_category: git
---

# SDD: Task Preflight (Git Safety)

## When to use

- Right before starting implementation for a task (single task or batch task).
- When you suspect you’re on the wrong branch or have dirty state.

## Inputs

- Task identifier (e.g., `T1.2`, `t4.4`, `LIN-123`) and a short description
- Resolved `defaultBranch` from `/sdd-git-default-branch`

## Steps

1. **Working tree must be explicit**
   - Check `git status` and report:
     - uncommitted changes
     - untracked files
   - If dirty, decide one of:
     - commit with a clear message (preferred if it’s legitimate work)
     - stash
     - discard

2. **Ensure clean base branch**
   - Checkout `defaultBranch`
   - Pull latest changes if `origin` exists
   - Re-check `git status` is clean

3. **Create a task branch**
   - Branch naming convention:
     - `task/<task-id>-<kebab-short-description>`
   - Create from `defaultBranch` and checkout the new branch.

4. **State tracking (optional)**
   - If the project uses `.sdd/git-state.json`, initialize or update it with the new branch name.

## Output contract

Return:
- `baseBranch`: the `defaultBranch` you used
- `taskBranch`: the created/checked-out branch name
- `status`: `ready` | `blocked` (and why)
