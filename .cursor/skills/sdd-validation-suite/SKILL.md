---
name: sdd-validation-suite
description: Run a lightweight, project-agnostic validation suite (lint, typecheck, build, tests when present) and summarize pass/fail with actionable error highlights.
metadata:
  sdd_category: validation
---

# SDD: Validation Suite

## When to use

- During `/task/validate` before opening/updating a PR.
- During `/task/batch` after each task (and optionally after each logical unit).

## Inputs

- Project root (current workspace)
- Optional: workspace scope (monorepo), e.g. `apps/storefront`
- Optional policy from spec or config: e.g., “tests must pass” vs “warn only”

## Steps (project-agnostic)

1. **Detect available commands**
   - If `package.json` exists, read scripts for:
     - `lint`
     - `type-check` / `typecheck`
     - `build`
     - `test` / `test:ci`
   - If none exist, fall back to framework-specific defaults only if clearly detectable.

2. **Run checks in safe order**
   - Lint
   - Type check (if applicable)
   - Tests (if applicable)
   - Build (if applicable)

   **Monorepo rule (if applicable):**
   - If the repo is a monorepo, run commands **scoped to the task workspace** (do not run repo-wide by default).
   - Examples:
     - `pnpm -C <workspace> run lint`
     - `npm --prefix <workspace> run test`
     - `yarn --cwd <workspace> test`
   - If no workspace scope is provided for a monorepo task, treat validation as **blocked** until scope is clarified.

3. **Summarize results**
   - Show pass/fail per check
   - If failures, extract:
     - error type (lint/type/test/build)
     - 3–10 most relevant error lines
     - affected files (if detectable)

4. **Gate behavior**
   - If the project defines strict gating (e.g., in `spec/06-acceptance.md`), block PR on failures.
   - Otherwise: warn, but let the user decide.

## Output contract

Return:
- `results`: list of `{check, status, notes}`
- `blocking`: `true/false`
- `nextActions`: short list of concrete fix steps if failures exist
