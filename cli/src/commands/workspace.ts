import path from 'path';
import { openInCursor } from '../lib/workspace.js';
import { isRunningInCursor } from '../lib/cursor-detection.js';

/**
 * Opens a project in Cursor workspace
 */
export async function runWorkspace(projectPath?: string): Promise<void> {
  const cwd = process.cwd();
  const finalPath = projectPath ? path.resolve(cwd, projectPath) : cwd;

  if (isRunningInCursor()) {
    console.log('\n✓ You are already in Cursor IDE.');
    console.log(`   Current directory: ${finalPath}\n`);
    return;
  }

  await openInCursor(finalPath, false); // Don't skip even if in Cursor (check is done above)
}

