/**
 * Detects if the CLI is running from within Cursor IDE terminal
 * @returns true if running in Cursor, false otherwise
 */
export function isRunningInCursor(): boolean {
  // Check environment variables
  const env = process.env;

  // Check for Cursor-specific variables (will check below)

  // Check for VS Code variables (Cursor is based on VS Code)
  if (env.VSCODE_PID !== undefined || env.VSCODE_INJECTION !== undefined) {
    return true;
  }

  // Check TERM_PROGRAM
  if (env.TERM_PROGRAM === 'cursor' || env.TERM_PROGRAM === 'vscode') {
    return true;
  }

  // Check for CURSOR_* pattern in environment
  const cursorVars = Object.keys(env).filter(key => key.startsWith('CURSOR_'));
  if (cursorVars.length > 0) {
    return true;
  }

  // Check parent process name (if available)
  if (env._) {
    const processPath = env._.toLowerCase();
    if (processPath.includes('cursor') || processPath.includes('cursor.app')) {
      return true;
    }
  }

  return false;
}

