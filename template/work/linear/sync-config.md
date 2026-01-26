# Linear Sync Configuration

This file configures Linear MCP integration with the SDD workflow.

## Mode

Create this file and set:

```
MODE=linear
```

If the file does not exist (or MODE is not `linear`), the system runs in local mode only.

## MCP Connection Configuration (optional)

If you have multiple Linear MCP connections in Cursor, specify which one to use:

```
MCP_CONNECTION_NAME=linear
```

## Team Configuration (optional)

Assign projects/issues to a default team:

```
DEFAULT_TEAM_ID=[team-id]
```

## Status Mapping

Map SDD statuses to Linear statuses (names recommended):

**Required when `MODE=linear` (hard requirement for `/spec/plan` Linear sync):**
- `STATUS_BACKLOG`
- `STATUS_IN_PROGRESS`
- `STATUS_DONE`
- `STATUS_BLOCKED`

```
STATUS_BACKLOG=Backlog
STATUS_IN_PROGRESS=In Progress
STATUS_DONE=Done
STATUS_BLOCKED=Blocked
```

## Labels

Enable tag-driven label assignment:

```
AUTO_ASSIGN_LABELS=true
LABEL_PREFIX=
```

See `work/linear/LABEL-MAPPING-GUIDE.md`.

## Projects

Enable milestone → Linear project automation:

```
AUTO_CREATE_PROJECTS=true
```

## Documents

Enable spec → Linear document automation:

```
AUTO_CREATE_DOCUMENTS=true
```

## Cycles (optional)

```
USE_CYCLES=false
ACTIVE_CYCLE_ID=[cycle-id]
```

## Fallbacks + troubleshooting

- `work/linear/FALLBACK-STRATEGY.md`
- `work/linear/SETUP.md`

