import fs from 'fs-extra';
import path from 'path';

/**
 * Creates a timestamp-based backup of the .cursor folder
 * @param projectPath - Path to the project
 * @returns Path to the backup directory
 */
export async function backupCursorFolder(projectPath: string): Promise<string> {
  const cursorPath = path.join(projectPath, '.cursor');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
  const backupPath = path.join(cursorPath, `_backup_${timestamp}`);

  // Ensure .cursor exists
  if (!(await fs.pathExists(cursorPath))) {
    throw new Error('.cursor folder does not exist');
  }

  // Create backup
  await fs.copy(cursorPath, backupPath);

  return backupPath;
}

/**
 * Checks if .cursor folder exists and has content
 * @param projectPath - Path to the project
 * @returns Object with hasCursorFolder and hasContent flags
 */
export async function checkCursorFolder(projectPath: string): Promise<{ hasCursorFolder: boolean; hasContent: boolean }> {
  const cursorPath = path.join(projectPath, '.cursor');

  if (!(await fs.pathExists(cursorPath))) {
    return { hasCursorFolder: false, hasContent: false };
  }

  // Check if it has rules or commands
  const rulesPath = path.join(cursorPath, 'rules');
  const commandsPath = path.join(cursorPath, 'commands');

  const hasRules = await fs.pathExists(rulesPath);
  const hasCommands = await fs.pathExists(commandsPath);

  let hasContent = false;

  if (hasRules) {
    const rulesFiles = await fs.readdir(rulesPath).catch(() => []);
    if (rulesFiles.length > 0) {
      hasContent = true;
    }
  }

  if (hasCommands && !hasContent) {
    const commandsFiles = await fs.readdir(commandsPath).catch(() => []);
    if (commandsFiles.length > 0) {
      hasContent = true;
    }
  }

  return { hasCursorFolder: true, hasContent };
}

