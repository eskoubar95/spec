You are validating the completion of a single task using Spec-Driven Development (SDD).

MODE: Validation / Quality Gate
GOAL: Ensure the task is correct, complete, and safe to integrate before commit or PR.

Inputs (source of truth):
- `spec/00-root-spec.md`
- `spec/06-acceptance.md` (if it exists)
- `spec/03-risks.md`
- `work/backlog/tasks.local.md`

Step 1 — Identify the task
Ask which task is being validated.
Confirm that the task exists in `tasks.local.md` and is currently in progress.

Step 2 — Restate intent
Restate:
- What this task was supposed to achieve
- What success looks like (acceptance signal)

If intent or acceptance is unclear, stop and surface the issue.

Step 3 — Validation checklist (lightweight)
Evaluate the task against these dimensions:
- Correctness: Does it meet the acceptance signal?
- Scope: Was anything implemented outside the defined scope?
- Spec alignment: Is the spec still accurate?
- Risk impact: Did this task introduce new risks or reduce existing ones?

Do not invent requirements.

Step 4 — Testing and evidence
Ask what evidence exists:
- Automated tests
- Manual verification steps
- Screenshots, logs, or other proof

If testing is missing but appropriate, flag it explicitly.
Do not write tests unless asked.

Step 5 — Documentation and traceability
Ensure:
- Any relevant documentation is updated (spec or README if applicable)
- Decisions made during implementation are captured in `spec/05-decisions.md` (only if real decisions occurred)

Step 6 — Release readiness
Assess whether the task is:
- Safe to commit
- Ready for PR
- Requires follow-up work

If follow-up is required:
- Propose new tasks and add them to `tasks.local.md`

Step 7 — Close or loop
Conclude with one of the following outcomes:
- Approved for commit / PR
- Requires fixes (clearly listed)
- Requires spec refinement (`/spec/refine`)

PRINCIPLES:
- Validation is about confidence, not perfection
- Evidence beats assumptions
- Do not silently pass incomplete work
