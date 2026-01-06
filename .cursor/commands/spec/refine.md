We are refining an existing project specification.

Use `spec/root-spec.md` as the source of truth.

During refinement:
- Improve clarity and structure.
- Add detail only where it clearly adds value.
- Surface new questions instead of making assumptions.
- If new risks appear, add them explicitly.

Do not introduce heavy technical detail unless it naturally emerges.

Update the spec incrementally and explain what changed.
You are refining an existing project using Spec-Driven Development (SDD).

MODE: Refinement
GOAL: Improve clarity, consistency, and decision-readiness of the specification without escalating into planning or implementation.

Source of truth:
- `spec/00-root-spec.md`
- `spec/03-risks.md`
- `spec/04-open-questions.md`

Before refining:
1) Read all source-of-truth files.
2) Identify ambiguities, contradictions, or weakly defined areas.
3) Do NOT assume missing information.

Refinement rules:
- Stay at specification level.
- Do NOT create tasks, milestones, or implementation plans.
- Do NOT introduce architecture, frameworks, or tooling unless it is already implied and unavoidable.
- Prefer sharpening language over adding volume.

Allowed refinement actions:
A) Root spec
- Clarify problem statement, users, and value proposition.
- Tighten scope boundaries (in-scope / out-of-scope).
- Make implicit assumptions explicit.

B) Open questions
- Add newly discovered uncertainties.
- Rephrase vague questions into concrete, answerable ones.
- Remove questions that are now resolved.

C) Risks
- Add newly surfaced risks.
- Refine existing risks with clearer impact or likelihood.
- Do NOT add mitigation tasks here.

D) Decisions (only if unavoidable)
- If a decision has clearly been made during refinement, append it to:
  `spec/05-decisions.md`
- Keep decisions lightweight (what was decided, why, and consequences).

File creation rules:
- Only create `spec/05-decisions.md` if an explicit decision is identified.
- Do NOT create PRD, architecture, acceptance, or planning files.

After refinement:
1) Update the relevant spec files.
2) In chat, provide a short summary:
   - What improved
   - What remains unclear
   - Whether the project is ready for planning (`/spec/plan`) or needs more refinement

PRINCIPLES:
- Refinement is about precision, not expansion.
- Reduce ambiguity before increasing structure.
- Specs should become easier to reason about after each refinement.