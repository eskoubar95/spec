# Linear Setup Guide

This guide walks you through setting up Linear integration with SDD workflow.

## Prerequisites

- Linear workspace created
- Linear MCP configured in Cursor
- Access to Linear Settings

## Step 1: Opret Linear Workspace

1. Gå til Linear og opret workspace (hvis ikke allerede oprettet)
2. Opret team (hvis nødvendigt)
3. Note team ID til sync-config.md

**To find team ID:**
- Go to Linear Settings → Teams
- Select your team
- Copy the team ID from the URL or team settings

## Step 2: Opret Custom Status (hvis nødvendigt)

1. Gå til Linear Settings → Statuses
2. Opret custom statuser (hvis standard statuser ikke passer)
3. Note status IDs eller names til sync-config.md

**Standard Linear statuser:**
- Backlog
- Todo
- In Progress
- In Review
- Done
- Canceled

**If you need custom statuser:**
- Create them in Linear Settings → Statuses
- Use status names in sync-config.md (recommended)
- Or use status IDs if you need specific IDs

**Note:** The system will try to find statuses by name first. If not found, you'll be guided to create them.

## Step 3: Opret Custom Labels (hvis nødvendigt)

1. Gå til Linear Settings → Labels
2. Opret custom labels (hvis standard labels ikke passer)
3. Labels oprettes automatisk hvis de mangler, men custom labels kan oprettes manuelt

**Auto-assigned labels (created automatically if missing):**
- `design`, `ui`, `frontend` (for design tasks)
- `engineering`, `backend`, `frontend`, `infrastructure` (for engineering tasks)
- `business`, `requirements` (for business tasks)
- `infrastructure`, `devops`, `deployment` (for infrastructure tasks)
- `external-service`, `integration` (for external service tasks)
- `risk`, `mitigation` (for risk mitigation tasks)

**If you need custom labels:**
- Create them in Linear Settings → Labels
- They will be used automatically if they match task types

## Step 4: Konfigurer Sync Config

1. Opret `work/linear/sync-config.md`
2. Sæt `MODE=linear`
3. **Tilføj MCP connection name (hvis du har flere Linear connections):**
   - Gå til Cursor Settings → MCP
   - Find din Linear MCP connection
   - Tilføj `MCP_CONNECTION_NAME=[connection-name]` til sync-config.md
   - Eksempel: `MCP_CONNECTION_NAME=linear` eller `MCP_CONNECTION_NAME=linear-huddle`
   - **Note:** 
     - Hvis du kun har én Linear connection, kan du udelade denne linje
     - Connection name skal matche MCP server navnet i Cursor Settings
     - Hvert workspace kan have sit eget Linear workspace, så specificer den connection der matcher dette projekt
4. Tilføj status mapping (IDs eller names)
5. Tilføj team ID (hvis relevant)
6. Tilføj andre indstillinger

**Example sync-config.md:**
```markdown
MODE=linear

# Team Configuration
DEFAULT_TEAM_ID=team-abc123

# Status Mapping (using status names)
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
```

## Step 5: Test Integration

1. Kør `/spec/plan`
2. Verificer at Linear projects/issues oprettes korrekt
3. Verificer at status mapping virker
4. Verificer at labels assignes korrekt
5. Verificer at documents oprettes korrekt

**If you encounter errors:**
- Check that Linear MCP is configured correctly
- Verify that status names/IDs are correct in sync-config.md
- Check that team ID is correct (if using)
- See error messages for specific guidance

## Troubleshooting

### Status not found

**Error:** "Status '[name]' ikke fundet i Linear"

**Solution:**
1. Go to Linear Settings → Statuses
2. Verify the status exists
3. Check the status name in sync-config.md (case-sensitive)
4. Or update sync-config.md with the status ID instead

### Label creation failed

**Error:** "Label '[name]' kunne ikke oprettes"

**Solution:**
1. Go to Linear Settings → Labels
2. Create the label manually
3. The system will use it automatically once created

### Team not found

**Error:** "Team '[id]' ikke fundet"

**Solution:**
1. Go to Linear Settings → Teams
2. Verify the team ID in sync-config.md
3. Update with correct team ID

### Linear MCP unavailable

**Error:** "Linear MCP er utilgængelig"

**Solution:**
1. Check that Linear MCP is configured in Cursor
2. Verify MCP connection
3. System will automatically fallback to local mode
4. Workflow will continue normally

## Next Steps

After setup:
- Use `/spec/plan` to create Linear projects and issues
- Use `/task/start` to sync task status with Linear
- Use `/task/validate` to update Linear issue status
- Spec documents will automatically sync to Linear

For more information, see `.cursor/commands/_shared/linear-automation.md`.

