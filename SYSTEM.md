# SDD System Architecture

This document provides a comprehensive overview of the Spec-Driven Development (SDD) system architecture, workflows, integrations, and optimizations.

## System Overview

The SDD system is organized into three main components:

### Commands Structure
- **`spec/`** - Specification commands (init, refine, plan, audit, sync, evolve)
- **`task/`** - Task execution commands (start, validate)
- **`tools/`** - Utility commands (refactor)

### Shared Helpers
Located in `.cursor/commands/_shared/` with **16 helpers**:
- **Core Helpers:** detection, activation, state-assertions, scaling, verification-checkpoints, command-stacks
- **Integration Helpers:** linear-automation, linear-helpers, github-helpers, github-workflows, coderabbit-integration
- **Workflow Helpers:** git-workflow, pr-description, deployment-detection
- **Quality Helpers:** test-automation, performance-monitoring, documentation-lookup

### Rules
Located in `.cursor/rules/` with **11 rules**:
- **Foundation:** 00-pos.mdc, 01-sdd.mdc, 02-work-mode.mdc
- **Domain:** 10-engineering.mdc, 11-design.mdc, 12-business.mdc
- **Technology:** 20-nextjs.mdc, 21-api-design.mdc, 30-database.mdc, 31-testing.mdc
- **System:** openmemory.mdc

### Cache System
Located in `.sdd/` directory:
- **`detection-cache.json`** - Cached project detection results
- **`rule-metadata-cache.json`** - Cached rule metadata for faster activation
- **`git-state.json`** - Git/GitHub workflow state tracking
- **`docs-cache.json`** - Cached documentation lookups (Context7)
- **`test-coverage.json`** - Test coverage tracking
- **`performance-metrics.json`** - Performance metrics tracking

## Workflow Diagram

### SDD Lifecycle

```
┌─────────────┐
│  /spec/init │  ← Project initialization, PRD creation
└──────┬──────┘
       │
       ▼
┌─────────────┐
│/spec/refine │  ← Specification refinement (optional, repeatable)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ /spec/plan  │  ← Task planning, milestone creation
└──────┬──────┘
       │
       ▼
┌─────────────┐
│/task/start  │  ← Task implementation
└──────┬──────┘
       │
       ▼
┌─────────────┐
│/task/validate│ ← Task validation, PR creation
└─────────────┘
```

### Command Lifecycle

Every command follows this pattern:

1. **State Assertion** - Explicit mode, boundaries, context
2. **Detection** - Project type, size, phase, technologies
3. **Activation** - Activate relevant rules based on detection
4. **Execution** - Command-specific logic
5. **Integration** - Linear, GitHub, testing, performance (conditional)

### Integration Points

```
Commands
   │
   ├─→ Detection Engine → Rule Activation
   │
   ├─→ Linear MCP (if enabled) → Linear Automation
   │
   ├─→ GitHub (if PR exists) → CodeRabbit, PR Automation
   │
   ├─→ Context7 MCP → Documentation Lookup
   │
   ├─→ Test Framework → Test Automation
   │
   └─→ Preview URL → Performance Monitoring
```

## Helper Dependency Graph

### Dependencies

```
coderabbit-integration
   └─→ github-helpers
        (CodeRabbit uses GitHub helpers for PR operations)

linear-automation
   └─→ linear-helpers
        (Linear automation uses helpers for status mapping)
```

### Standalone Helpers

These helpers have no dependencies:
- `test-automation.md`
- `performance-monitoring.md`
- `deployment-detection.md`
- `git-workflow.md`
- `pr-description.md`
- `documentation-lookup.md`
- `github-workflows.md`
- `detection.md`
- `activation.md`
- `state-assertions.md`
- `scaling.md`
- `verification-checkpoints.md`
- `command-stacks.md`

### Dependency Resolution

When a helper with dependencies is loaded:
1. Check if parent helper should be loaded (based on `load_when` conditions)
2. If yes → automatically load all dependencies
3. Dependencies are loaded with same conditions as parent
4. Dependencies can have their own dependencies (future support)

**Example:**
```markdown
**ONLY READ IF PR exists:**
- Read `coderabbit-integration.md` ONLY IF PR exists
  - Auto-loads: `github-helpers.md` (dependency)
- Read sections: "CodeRabbit Detection", "Conversation Resolution"
```

## Token Efficiency Metrics

### Before Optimization
- **Typical command:** ~3,550 tokens
  - Command file: ~400 tokens
  - Foundation rules: ~500 tokens
  - Domain/tech rules: ~600 tokens
  - Helpers (read fully): ~2,000 tokens
  - Detection (cached): ~50 tokens

### After Optimization
- **Typical command:** ~2,370 tokens
  - Command file: ~400 tokens
  - Foundation rules: ~500 tokens
  - Domain/tech rules: ~600 tokens
  - Helpers (relevant sections only): ~800 tokens
  - Detection (cached): ~50 tokens
  - Rule metadata (cached): ~20 tokens

### Reduction
- **33% reduction** (1,180 tokens saved per command)
- **Optimization strategies:**
  - Conditional helper loading (only when conditions met)
  - Section-based reading (only relevant sections)
  - Rule metadata caching (faster activation)
  - Detection caching (avoid redundant detection)

## Cache System

### Detection Cache
**File:** `.sdd/detection-cache.json`

**Purpose:** Cache project detection results to avoid redundant detection

**Structure:**
```json
{
  "projectType": "web-app",
  "projectSize": "medium",
  "projectPhase": "expansion",
  "technologies": ["nextjs", "react", "postgres"],
  "teamSize": 3,
  "last_updated": "2026-01-07T12:00:00Z"
}
```

**Invalidation:** When project structure changes significantly

### Rule Metadata Cache
**File:** `.sdd/rule-metadata-cache.json`

**Purpose:** Cache rule metadata for faster activation scanning

**Structure:**
```json
{
  "rules": {
    "20-nextjs.mdc": {
      "activation": {
        "projectTypes": ["web-app"],
        "technologies": ["nextjs"]
      },
      "requires": ["10-engineering"]
    }
  },
  "last_updated": "2026-01-07T12:00:00Z",
  "rule_files": {
    "20-nextjs.mdc": {
      "mtime": 1704633600000
    }
  }
}
```

**Invalidation:** When rule files are modified (compare mtime)

### Git State Cache
**File:** `.sdd/git-state.json`

**Purpose:** Track Git/GitHub workflow state

**Structure:**
```json
{
  "branch": "task/t1.2-feature",
  "commits": 3,
  "pr": {
    "number": 123,
    "url": "https://github.com/owner/repo/pull/123"
  },
  "deployment": {
    "provider": "vercel",
    "preview_url": "https://preview.vercel.app",
    "status": "ready"
  },
  "validated": true,
  "last_updated": "2026-01-07T12:00:00Z"
}
```

### Documentation Cache
**File:** `.sdd/docs-cache.json`

**Purpose:** Cache Context7 documentation lookups

**Structure:**
```json
{
  "nextjs-server-components": {
    "content": "...",
    "source": "context7",
    "cached_at": "2026-01-07T12:00:00Z",
    "expires_at": "2026-01-08T12:00:00Z"
  }
}
```

**Invalidation:** After 24 hours or when framework version changes

## Integration Points

### Linear MCP Integration

**Detection:**
- Check if `work/linear/sync-config.md` exists
- Verify `MODE=linear`
- Check `MCP_CONNECTION_NAME` for specific connection

**Automation:**
- **Documents:** Create/update Linear documents from spec files
- **Issues:** Sync task status, create issues from milestones
- **Projects:** Create projects for milestones
- **Labels:** Auto-assign labels based on task type
- **Statuses:** Map SDD states to Linear statuses

**Fallback:** Local mode if Linear MCP unavailable

### GitHub Integration

**Detection:**
- Check for GitHub MCP availability
- Fallback to GitHub CLI (`gh`)
- Fallback to local mode

**Automation:**
- **PR Creation:** Auto-create PRs with generated descriptions
- **CodeRabbit:** Read and resolve CodeRabbit comments
- **Deployment:** Trigger preview deployments
- **Workflows:** Generate GitHub Actions workflows

**Fallback Strategy:** MCP → CLI → Local

### Context7 Documentation Lookup

**Purpose:** Dynamic documentation lookup for any framework/tool

**Process:**
1. Check Context7 MCP availability
2. Query Context7 with framework name and topic
3. Fallback to Cursor documentation indexing
4. Fallback to web search
5. Fallback to general engineering patterns

**Caching:** Results cached for 24 hours

### Test Automation

**Detection:**
- Check `package.json` for test framework dependencies
- Check for config files (jest.config.js, vitest.config.ts, etc.)
- Check test scripts

**Automation:**
- Run tests automatically during validation
- Collect test coverage
- Detect test failures
- Generate test suggestions

**Frameworks Supported:** Jest, Vitest, Playwright, Cypress, Mocha, pytest, etc.

### Performance Monitoring

**Detection:**
- Check for preview URL availability
- Check for performance monitoring tools (Vercel Analytics, Sentry, etc.)

**Automation:**
- Collect bundle size metrics
- Track load time metrics
- Run Lighthouse audits
- Detect performance regressions

**Integration:** Vercel Analytics, Google Analytics, Sentry Performance, New Relic, Datadog

## Quick Start Guide

### For New Users

1. **Initialize Project:**
   ```
   /spec/init
   ```
   - Answer 5 structured questions
   - Creates PRD (`spec/01-prd.md`)
   - Identifies risks and open questions

2. **Refine Specification (optional):**
   ```
   /spec/refine
   ```
   - Improve clarity and structure
   - Add design/infrastructure details
   - Surface new questions

3. **Plan Tasks:**
   ```
   /spec/plan
   ```
   - Create milestones
   - Break down into tasks
   - Optional: Create Linear projects/issues

4. **Start Task:**
   ```
   /task/start T1.2
   ```
   - Creates task branch
   - Sets up task-level spec (if complex)
   - Initializes Git state tracking

5. **Validate Task:**
   ```
   /task/validate
   ```
   - Validates completion
   - Runs tests (if framework detected)
   - Creates PR (if validated)
   - Triggers preview deployment

### Workflow Example

```bash
# 1. Initialize
/spec/init
# → Creates spec/01-prd.md

# 2. Plan
/spec/plan
# → Creates milestones and tasks

# 3. Start task
/task/start T1.2
# → Creates branch: task/t1.2-feature
# → Implements feature

# 4. Validate
/task/validate
# → Runs tests
# → Creates PR
# → Deploys preview
```

## System Principles

### 1. Conditional Loading
- Helpers only load when conditions are met
- Sections only read when needed
- Rules only activate when relevant

### 2. Graceful Degradation
- All integrations have fallback strategies
- Never block workflow due to missing integrations
- Safe defaults for all operations

### 3. Cache First
- Detection results cached
- Rule metadata cached
- Documentation cached
- Only invalidate when necessary

### 4. Explicit Instructions
- "ONLY READ IF [condition]" instead of vague references
- Clear section specifications
- Explicit skip conditions

### 5. Quality Over Speed
- Validation before integration
- Testing when framework detected
- Performance monitoring when available
- Code quality checks via refactoring command

## Maintenance

### Helper Metadata Validation
Run validation script to check helper metadata:
```bash
node .cursor/scripts/validate-helpers.js
```

**Checks:**
- All helpers have frontmatter
- Section line ranges are correct
- Section titles match headings
- All helpers documented in helper-metadata.md
- Metadata consistency

### Cache Management
- Detection cache: Auto-invalidates on structure changes
- Rule metadata cache: Auto-invalidates on rule file changes
- Documentation cache: Expires after 24 hours
- Git state: Updated on every Git operation

### Adding New Helpers
1. Create helper file in `.cursor/commands/_shared/`
2. Add YAML frontmatter with metadata
3. Add to `helper-metadata.md` registry
4. Update commands that should use it
5. Run validation script

### Adding New Rules
1. Create rule file in `.cursor/rules/`
2. Add activation metadata in frontmatter
3. Rule metadata cache will auto-update
4. Rules activate automatically based on detection

## Token Efficiency Best Practices

1. **Always check conditions before reading helpers**
2. **Read only specified sections** (not entire helpers)
3. **Use cache when possible** (detection, rule metadata)
4. **Skip helpers entirely** if conditions not met
5. **Group related helpers** in commands
6. **Specify exact line ranges** for sections

## Support

For issues or questions:
- Check helper-metadata.md for helper usage
- Check individual helper files for detailed logic
- Check command files for workflow patterns
- Run validation script to check metadata

---

**Last Updated:** 2026-01-07
**System Version:** 1.0.0

