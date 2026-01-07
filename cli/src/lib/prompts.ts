import inquirer from 'inquirer';
import { normalizeProjectName } from './project-name.js';
import { isRunningInCursor } from './cursor-detection.js';
import { isExistingProject } from './detection.js';
import path from 'path';
import type { InitAnswers, InstallAnswers } from '../types.js';

// Re-export for backward compatibility
export type { InitAnswers, InstallAnswers };

/**
 * Prompts the user for project initialization options
 */
export async function promptInit(): Promise<InitAnswers> {
  const cwd = process.cwd();

  // Smart mode detection: Check if in Cursor + existing project
  const inCursor = isRunningInCursor();
  const isExisting = await isExistingProject(cwd);

  if (inCursor && isExisting) {
    // Auto-suggest install mode
    const { shouldInstall } = await inquirer.prompt<{ shouldInstall: boolean }>([
      {
        type: 'confirm',
        name: 'shouldInstall',
        message: 'Detected you\'re in an existing project in Cursor. Install SDD to this project?',
        default: true,
      },
    ]);

    if (shouldInstall) {
      // This will be handled by the init command
      throw new Error('SWITCH_TO_INSTALL');
    }
  }

  // Normal init flow
  const answers = await inquirer.prompt<InitAnswers>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name (folder name):',
      validate: (input: string) => {
        if (!input.trim()) {
          return 'Project name cannot be empty';
        }
        // Basic validation for folder names
        if (/[<>:"/\\|?*]/.test(input)) {
          return 'Project name contains invalid characters';
        }
        return true;
      },
      filter: (input: string) => {
        // Normalize project name: convert spaces to hyphens, lowercase
        return normalizeProjectName(input);
      },
      transformer: (input: string) => {
        // Show normalized version while typing
        return normalizeProjectName(input);
      },
    },
    {
      type: 'list',
      name: 'taskMode',
      message: 'Task mode:',
      choices: [
        { name: 'local', value: 'local' },
        { name: 'linear', value: 'linear' },
      ],
      default: 'local',
    },
    {
      type: 'confirm',
      name: 'gitInit',
      message: 'Initialize git repository?',
      default: true,
    },
    ...(isRunningInCursor() ? [] : [
      {
        type: 'confirm',
        name: 'openInCursor',
        message: 'Open in Cursor?',
        default: true,
      },
    ]),
  ]);

  return answers;
}

/**
 * Prompts the user for installation options
 */
export async function promptInstall(projectPath: string): Promise<InstallAnswers> {
  const inCursor = isRunningInCursor();
  const isExisting = await isExistingProject(projectPath);

  // Auto-detect project path if in Cursor and current directory is a project
  let finalProjectPath = projectPath;
  if (inCursor && isExisting && projectPath === process.cwd()) {
    // Use current directory automatically
  } else {
    const { path: selectedPath } = await inquirer.prompt<{ path: string }>([
      {
        type: 'input',
        name: 'path',
        message: 'Project path:',
        default: projectPath,
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Project path cannot be empty';
          }
          return true;
        },
      },
    ]);
    finalProjectPath = selectedPath;
  }

  // Check if .cursor folder exists
  const { hasCursorFolder } = await import('./backup-cursor.js').then(m => 
    m.checkCursorFolder(finalProjectPath)
  );

  const answers = await inquirer.prompt<InstallAnswers>([
    {
      type: 'list',
      name: 'backupStrategy',
      message: hasCursorFolder ? 'Backup existing .cursor folder or merge?' : 'Backup strategy:',
      choices: [
        { name: 'Backup existing .cursor folder', value: 'backup' },
        { name: 'Merge with existing', value: 'merge' },
      ],
      default: 'backup',
      when: hasCursorFolder,
    },
    {
      type: 'confirm',
      name: 'installSpecFolders',
      message: 'Install spec/ and work/ folders?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'createRootSpec',
      message: 'Create spec/00-root-spec.md if missing?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'initializeDetection',
      message: 'Initialize detection cache?',
      default: true,
    },
    ...(isRunningInCursor() ? [] : [
      {
        type: 'confirm',
        name: 'openInCursor',
        message: 'Open in Cursor?',
        default: true,
      },
    ]),
  ]);

  return {
    ...answers,
    projectPath: finalProjectPath,
    backupStrategy: answers.backupStrategy || 'backup', // Default if not asked
  };
}
