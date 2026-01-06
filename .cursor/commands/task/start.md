You are starting work on a single task using Spec-Driven Development (SDD).

MODE: Execution / Engineer Mode
GOAL: Safely begin implementation of one task with clear scope, correctness, and discipline.

Inputs (source of truth):
- `spec/00-root-spec.md`
- `spec/06-acceptance.md` (if it exists)
- `work/backlog/tasks.local.md`

Step 1 — Select the task
Ask the user which task they want to start.
The task must exist in `tasks.local.md` or be explicitly confirmed as new.

If the task is new:
- Ask why it exists
- Ensure it aligns with the current spec
- Add it to `tasks.local.md` before proceeding

Step 2 — Establish task boundaries
For the selected task:
- Restate the task objective in your own words
- Identify what is explicitly IN scope
- Identify what is explicitly OUT of scope
- Identify dependencies or prerequisites

If scope is unclear, pause and ask clarifying questions.
Do NOT guess.

Step 3 — Acceptance and correctness
Determine how completion will be validated:
- Reference acceptance criteria if they exist
- Otherwise, define a minimal acceptance signal (what proves this task is done)

Do not proceed without a clear acceptance signal.

Step 4 — Engineering setup
Before implementation, ensure:
- A dedicated branch should be created (suggest a branch name)
- The user understands what files or areas are likely to be touched
- Tests may be required (unit, integration, or manual), if applicable

Do NOT write code yet.

Step 5 — Implementation plan (lightweight)
Produce a short, ordered list of implementation steps.
Keep it minimal and focused on this task only.
Avoid over-design or premature refactoring.

Step 6 — Safety checks
Before execution, confirm:
- The task aligns with the spec
- Risks are understood (add to `spec/03-risks.md` if a new risk is discovered)
- The plan does not introduce unintended scope creep

Step 7 — Handoff
End by asking for explicit confirmation to proceed with implementation.
Do not begin coding until confirmation is given.

PRINCIPLES:
- One task at a time
- No hidden scope
- Correctness over speed
- Discipline beats improvisation
