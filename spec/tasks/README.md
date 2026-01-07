# Task-Level Specs

Task-level specs provide detailed specifications for complex tasks that require more detail than project-level specs.

## Purpose

Task-level specs are **optional** and only created for **complex tasks** that need:
- Detailed task-specific specifications
- Task-specific acceptance criteria
- Task-specific design decisions
- Task-specific dependencies and prerequisites

## When to Create Task-Level Specs

**Create task-level specs for:**
- Complex tasks (fx "Implement payment on frontend, setup Stripe")
- Tasks with many subtasks
- Tasks that require their own specification
- Tasks with complex acceptance criteria
- Tasks involving multiple technologies or external services

**Do NOT create task-level specs for:**
- Simple tasks (fx "Add button component")
- Tasks that are clear from project-level spec
- Tasks that don't need additional specification

## Structure

Task-level specs are organized by task ID:

```
spec/tasks/
  [task-id]/              # Task ID (local: t1.2, Linear: LIN-123)
    spec.md               # Task-specific specification
    acceptance.md         # Task-specific acceptance criteria
```

## Task ID Format

**Local Tasks:**
- Task IDs from `work/backlog/tasks.local.md` (fx `t1.2`, `t2.3`)
- Used as-is for directory name: `spec/tasks/t1.2/`

**Linear Tasks:**
- Linear issue IDs (fx `LIN-123`, `HUD-456`)
- Used as-is for directory name: `spec/tasks/LIN-123/`

**Task ID Normalization:**
- Special characters are normalized for file paths
- Both formats can coexist in same project

## File Contents

### spec.md

Task-specific specification that includes:
- Task overview and purpose
- Detailed requirements (expanded from Linear issue or tasks.local.md)
- Task-specific design decisions
- Task-specific dependencies
- Task-specific constraints
- Reference to project-level spec for context

**Example structure:**
```markdown
# Task Specification: [Task ID] - [Task Name]

## Overview
[Task purpose and context]

## Requirements
[Detailed requirements expanded from source]

## Design Decisions
[Task-specific design decisions]

## Dependencies
[Task-specific dependencies]

## Constraints
[Task-specific constraints]

## Reference
- Project-level spec: `spec/00-root-spec.md`
- Related tasks: [task IDs]
```

### acceptance.md

Task-specific acceptance criteria that includes:
- Detailed acceptance criteria
- Test scenarios
- Edge cases
- Validation steps

**Example structure:**
```markdown
# Acceptance Criteria: [Task ID] - [Task Name]

## Acceptance Criteria
[Detailed, testable criteria]

## Test Scenarios
[Test cases]

## Edge Cases
[Edge cases to handle]

## Validation Steps
[How to validate completion]
```

## Integration

**With Local Tasks:**
- Task-level specs work with tasks from `work/backlog/tasks.local.md`
- `/task/start t1.2` automatically checks for `spec/tasks/t1.2/spec.md`

**With Linear Tasks:**
- Task-level specs work with Linear issues
- `/task/start LIN-123` automatically checks for `spec/tasks/LIN-123/spec.md`
- Linear issue description is included in task-level spec

**Workflow:**
1. `/task/start [task-id]` detects task complexity
2. If complex and no task-level spec → suggests creating one
3. If task-level spec exists → uses it as primary source
4. Project-level spec provides context

## Guidelines

- **Keep it focused:** Task-level specs should only contain task-specific information
- **Reference project spec:** Don't duplicate project-level information
- **Update when needed:** Update task-level spec if task evolves
- **Clean up:** Remove task-level specs when task is complete (optional)

## Examples

**Example 1: Complex Payment Task**
- Task ID: `t2.1` (local) or `LIN-456` (Linear)
- Task: "Implement payment on frontend, setup Stripe"
- Task-level spec includes: Stripe integration details, payment flow, error handling, security requirements

**Example 2: Simple Component Task**
- Task ID: `t3.2` (local)
- Task: "Add button component"
- No task-level spec needed (simple task, clear from project spec)

