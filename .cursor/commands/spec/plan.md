You are moving the project from “Research / Ideation” into “Planning”.

MODE: Planning
GOAL: Turn the current specification into an executable plan (milestones + tasks) while keeping the spec consistent.

Inputs (source of truth):
- `spec/00-root-spec.md`
- `spec/03-risks.md`
- `spec/04-open-questions.md`

Before you plan
1) Read the source-of-truth files above.
2) If there are critical unknowns that block planning, ask only the minimum clarifying questions.
   - If unknowns exist but planning can still proceed, capture them as assumptions and keep them in `spec/04-open-questions.md`.

Planning outputs
A) Spec artifacts (create only if needed by planning)
- Create or update `spec/01-prd.md` if the feature set needs to be made explicit.
- Create or update `spec/06-acceptance.md` with high-level acceptance criteria / definition of done.

Rules for spec artifacts:
- Stay high-level. Do not write deep architecture.
- Do not introduce new features that were not implied by the root spec.
- If you suggest a new requirement, mark it as a question or assumption.

B) Execution artifacts (always produce these)
Create or update:
- `work/backlog/milestones.md`
- `work/backlog/tasks.local.md`

Milestones requirements:
- 3–7 milestones max.
- Each milestone has: objective, scope (in/out), and exit criteria.

Tasks requirements:
- Tasks must be traceable to the spec.
- Each task has: description, acceptance signal, dependencies, and rough estimate (S/M/L).
- Keep tasks implementation-agnostic unless necessary.

C) Risk-driven planning
- Update `spec/03-risks.md` with any planning-discovered risks.
- For the top 3 risks, add a concrete mitigation task into `tasks.local.md`.

D) Optional: Linear integration (ONLY if configured)
- Check if `work/linear/sync-config.md` exists.
  - If it exists and declares `MODE=linear`, then in addition to local files:
    - Propose a Linear structure (Project + Epics + Issues) that mirrors the milestones.
    - Ask for confirmation before creating/updating anything in Linear.
  - If it does not exist or is not set to linear: keep everything local.

Step-by-step deliverable
1) A short “Planning Summary” in chat: what you planned and what remains uncertain.
2) Updated/created files listed above.
3) A recommended next step:
   - either `/task/start` for the first task
   - or `/spec/refine` if the spec is still too unclear

PRINCIPLES:
- Planning is not implementation.
- Clarity and traceability over excessive detail.
- Keep it professional, lightweight, and actionable.
