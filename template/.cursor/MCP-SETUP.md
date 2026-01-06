# Linear MCP Setup (Optional)

If you're using Linear task mode, you may want to configure the Linear MCP server in Cursor to enable Linear integration.

## Quick Setup

1. Get your Linear API key from https://linear.app/settings/api
2. Configure MCP in Cursor Settings → Features → Model Context Protocol
3. Add Linear MCP server configuration with your API key
4. Restart Cursor

## Settings File Location

- **macOS**: `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`
- **Windows**: `%APPDATA%\Cursor\User\globalStorage\rooveterinaryinc.roo-cline\settings\cline_mcp_settings.json`
- **Linux**: `~/.config/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`

## Example Configuration

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear"],
      "env": {
        "LINEAR_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

For more details, see [MCP Documentation](https://modelcontextprotocol.io).
