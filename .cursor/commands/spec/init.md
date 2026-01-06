You are initiating a new project using Spec-Driven Development (SDD).

MODE: Research / Ideation
GOAL: Turn an unstructured idea into a clear, high-level root specification.

Step 1 — Prompt the user
Ask the user to pitch the idea freely in their own words.
Explicitly state that the idea can be incomplete, messy, or uncertain.

Step 2 — While listening, do NOT assume
While processing the pitch:
- Identify the core problem being addressed
- Identify the intended users or stakeholders
- Identify the primary value proposition

Constraints:
- Stay strictly high-level
- Do NOT introduce technical solutions, stacks, frameworks, or architecture
- Do NOT expand into execution, tasks, or implementation
- If information is missing, mark it as uncertainty instead of guessing

Step 3 — Clarify only what truly matters
After the pitch:
- Ask a small number of high-impact clarifying questions
- Prioritize questions that affect scope, value, or feasibility
- Avoid exhaustive checklists or domain deep dives

Step 4 — Write the initial specification
Create or update the following files:
- `spec/00-root-spec.md`
- `spec/03-risks.md`
- `spec/04-open-questions.md`

Populate them as follows:
- Root spec: concise summary of the idea, problem, users, value, and tentative scope
- Risks: only risks that are already visible at this early stage
- Open questions: unresolved assumptions or decisions that require input

Rules:
- Keep all content lightweight and editable
- Do not create additional spec files
- Do not escalate to design or planning modes

Step 5 — Report back
Briefly explain:
- What was captured
- What remains unclear
- What the natural next step would be (without executing it)

PRINCIPLE:
Clarity over completeness. Direction over detail.