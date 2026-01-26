## Overview

This repository provides a **Spec-Driven Development (SDD)** “Project Operating System” for Cursor:

- Specs are the source of truth (`spec/`)
- Plans and tasks are tracked in `work/`
- Execution is driven by `.cursor/commands/`
- Behavior is enforced by `.cursor/rules/`

Cursor 2.4+ additions:
- `.cursor/skills/`: reusable micro-workflows (git hygiene, validation, design bootstrap)
- `.cursor/agents/`: subagents for batch orchestration and independent verification

## Architecture

- `.cursor/commands/spec/*`: create/refine/plan the specification (no code changes)
- `.cursor/commands/task/*`: execute and validate a single task (code changes allowed)
- `.cursor/commands/_shared/*`: helper library used by commands (conditionally loaded)
- `.cursor/rules/*`: always-on or auto-activated rule sets (POS/SDD boundaries + domain patterns)
- `spec/templates/*`: project-agnostic templates for architecture, infrastructure, and design system

## Components

- **Helper**: `branch-detection` (`.cursor/commands/_shared/branch-detection.md`)
  - Purpose: resolve the repo base branch without hardcoding `main`/`develop`
  - Used by: task start/validate, PR description, git workflow guidance, workflow generation guidance

- **Skills** (Cursor 2.4+; `.cursor/skills/*`):
  - `sdd-git-default-branch`: resolve base branch (config → remote HEAD → fallbacks)
  - `sdd-task-preflight`: ensure clean tree + correct base + task branch
  - `sdd-commit-unit`: create small logical commits with task-linked messages
  - `sdd-validation-suite`: run lightweight validation (lint/typecheck/tests/build) when present
  - `sdd-pr-create-or-update`: standardize PR creation/update with correct base branch
  - `sdd-design-system-bootstrap`: bootstrap Tailwind + shadcn/ui design system into `spec/07-design-system.md`

- **Subagents** (Cursor 2.4+; `.cursor/agents/*`):
  - `batch-runner`: long-running multi-task execution with concise summaries
  - `verifier`: independent quality gate before PR/merge

## Patterns

- **Base branch resolution**: commands should not assume `main`. Resolve `defaultBranch` via:
  1) `.sdd/git-config.json` (preferred when teams use non-standard branches like `staging`)
  2) remote HEAD branch (if available)
  3) conventional fallbacks (`main`, `master`, `develop`)

- **Linear hard stop (planning)**: if `work/linear/sync-config.md` enables `MODE=linear` but required status mappings are missing, `/spec/plan` must stop Linear sync and require config completion before creating Linear projects/issues/documents.
  - Required keys: `STATUS_BACKLOG`, `STATUS_IN_PROGRESS`, `STATUS_DONE`, `STATUS_BLOCKED`
  - Task execution (`/task/*`) should not be blocked; it should skip Linear ops for that run and continue local if config is incomplete.

- **Design system first**: when UI choices affect implementation, create `spec/07-design-system.md` early
  - Default stack: Tailwind + shadcn/ui + tokens + WCAG AA checklist

- **Monorepo workspace scope**: if `projectType=monorepo`, every task must declare an explicit `Workspace:` path (e.g. `apps/storefront`) and all lint/test/build commands must be run scoped to that workspace. Tasks/batches should hard-stop if workspace is missing to avoid cross-app changes.

- **Sitemap-first planning (web apps)**: create `spec/09-sitemap.md` during `/spec/plan` for UI projects (especially `projectType=web-app`). This becomes the source of truth for required pages, so planning can turn each page into explicit tasks and avoid “missing screens” mid-implementation.

## User Defined Namespaces
- 

