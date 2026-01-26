# Tasks

Tasks are organized by milestone. Each task has a unique ID, description, acceptance criteria, dependencies, and estimate.

## Task Structure

Each task follows this structure:

```markdown
## Task: [Task ID]

**Description:** [Task description - what needs to be done]

**Status:** backlog | in-progress | done | blocked

**Assignee:** [name/email] (optional)

**Tags:** [comma-separated tags, e.g., design, frontend, infrastructure]

**Workspace:** [path within repo, e.g., apps/storefront] (optional; REQUIRED for monorepos)

**Milestone:** [Milestone ID, e.g., M1]

**Sprint:** [Sprint ID, e.g., Sprint 1] (optional)

**Acceptance:** [Acceptance criteria - how to verify completion]

**Dependencies:** [Task IDs that must be completed first, e.g., t1.1, t1.2]

**Estimate:** S | M | L (Small, Medium, Large)

**Notes:**
- [Note 1]
- [Note 2]
```

## Status Values

- **backlog:** Task is planned but not started
- **in-progress:** Task is currently being worked on
- **done:** Task is completed and validated
- **blocked:** Task is blocked by dependencies or external factors

## Example Tasks

## Task: t1.1

**Description:** Setup project structure and initial configuration

**Status:** backlog

**Assignee:** (optional)

**Tags:** infrastructure, setup

**Workspace:** (optional; for monorepos)

**Milestone:** M1

**Acceptance:** 
- Project structure created
- Configuration files in place
- Build system working

**Dependencies:** (none)

**Estimate:** S

**Notes:**
- Initial setup task

## Task: t1.2

**Description:** Implement authentication system

**Status:** backlog

**Assignee:** (optional)

**Tags:** engineering, backend, security

**Workspace:** (optional; for monorepos)

**Milestone:** M1

**Acceptance:**
- User can register
- User can login
- User can logout
- Session management works

**Dependencies:** t1.1

**Estimate:** M

**Notes:**
- Requires external service selection (see t1.3)

