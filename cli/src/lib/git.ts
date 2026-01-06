import { execSync } from 'child_process';
import path from 'path';

/**
 * Initializes a git repository in the specified directory
 */
export function initGit(projectPath: string): void {
  try {
    execSync('git init', {
      cwd: projectPath,
      stdio: 'inherit',
    });
  } catch (error) {
    throw new Error(`Failed to initialize git repository: ${error}`);
  }
}

