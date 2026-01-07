# Linear Sync Configuration

This file configures Linear MCP integration with SDD workflow.

## Mode

Set to `linear` to enable Linear integration, or omit this file to use local mode only.

```
MODE=linear
```

## MCP Connection Configuration

Specify which Linear MCP connection to use (if you have multiple Linear connections in Cursor).

```
MCP_CONNECTION_NAME=linear
```

**If not specified:**
- System will try to use the default Linear MCP connection
- If multiple connections exist, you may need to specify which one to use

**To find your MCP connection name:**
1. Go to Cursor Settings → MCP
2. Find your Linear MCP connection
3. Use the connection name (e.g., "linear", "linear-huddle", "linear-project-name")

**Note:** 
- Each workspace can have its own Linear workspace, so specify the connection name that matches this project's Linear workspace
- The connection name should match the MCP server name in Cursor Settings
- If you only have one Linear MCP connection, you can omit this setting (system will use default)
- If you have multiple Linear connections, you must specify which one to use for this project

## Team Configuration

Optional: Assign all Linear projects and issues to a default team.

```
DEFAULT_TEAM_ID=[team-id]
```

To find your team ID:
1. Go to Linear Settings → Teams
2. Select your team
3. Copy the team ID from the URL or team settings

## Status Mapping

Map SDD workflow states to Linear statuses. You can use either status IDs or status names.

**Using Status Names (recommended for custom statuser):**
```
STATUS_BACKLOG=Backlog
STATUS_IN_PROGRESS=In Progress
STATUS_DONE=Done
STATUS_BLOCKED=Blocked
```

**Using Status IDs (if you need specific status IDs):**
```
STATUS_BACKLOG=[status-id]
STATUS_IN_PROGRESS=[status-id]
STATUS_DONE=[status-id]
STATUS_BLOCKED=[status-id]
```

To find status IDs:
1. Go to Linear Settings → Statuses
2. Select a status
3. Copy the status ID from the URL or status settings

**Note:** If you use custom statuser, use status names. The system will try to find them by name. If not found, you'll be guided to create them.

## Label Configuration

Enable automatic label assignment based on task type.

```
AUTO_ASSIGN_LABELS=true
```

Optional: Add a prefix to all auto-assigned labels.

```
LABEL_PREFIX=[prefix]
```

## Project Configuration

Enable automatic Linear project creation for milestones.

```
AUTO_CREATE_PROJECTS=true
```

## Document Configuration

Enable automatic Linear document creation for spec files.

```
AUTO_CREATE_DOCUMENTS=true
```

## Cycle Configuration (Optional)

Enable cycle integration for milestone projects.

```
USE_CYCLES=true
```

Optional: Specify active cycle ID (otherwise auto-detected).

```
ACTIVE_CYCLE_ID=[cycle-id]
```

## Example Configuration

```markdown
MODE=linear

# MCP Connection Configuration
MCP_CONNECTION_NAME=linear

# Team Configuration
DEFAULT_TEAM_ID=team-abc123

# Status Mapping (using status names for custom statuser)
STATUS_BACKLOG=Backlog
STATUS_IN_PROGRESS=In Progress
STATUS_DONE=Done
STATUS_BLOCKED=Blocked

# Label Configuration
AUTO_ASSIGN_LABELS=true

# Project Configuration
AUTO_CREATE_PROJECTS=true

# Document Configuration
AUTO_CREATE_DOCUMENTS=true

# Cycle Configuration
USE_CYCLES=false
```

## Setup

For detailed setup instructions, see `work/linear/SETUP.md`.

