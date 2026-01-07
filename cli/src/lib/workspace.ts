import { exec } from 'child_process';
import { promisify } from 'util';
import { isRunningInCursor } from './cursor-detection.js';

const execAsync = promisify(exec);

/**
 * Opens a project in Cursor IDE
 * @param projectPath - Path to the project to open
 * @param skipIfAlreadyInCursor - Skip if already running in Cursor (default: true)
 */
export async function openInCursor(
  projectPath: string,
  skipIfAlreadyInCursor: boolean = true
): Promise<void> {
  // Check if already in Cursor
  if (skipIfAlreadyInCursor && isRunningInCursor()) {
    console.log('\n✓ You are already in Cursor. No need to open the project.\n');
    return;
  }

  // Check if cursor command is available
  try {
    await execAsync('which cursor');
  } catch {
    console.log('\n⚠️  Cursor command not found in PATH.');
    console.log('   Please open the project manually in Cursor IDE.');
    console.log(`   Path: ${projectPath}\n`);
    return;
  }

  // Open project in Cursor
  try {
    await execAsync(`cursor "${projectPath}"`);
    console.log(`\n✓ Opening project in Cursor...\n`);
  } catch (error) {
    console.error('\n❌ Error opening project in Cursor:');
    console.error(`   ${error instanceof Error ? error.message : String(error)}`);
    console.log(`\n   Please open the project manually in Cursor IDE.`);
    console.log(`   Path: ${projectPath}\n`);
  }
}

