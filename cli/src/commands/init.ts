import path from 'path';
import { copyTemplate, createLinearConfig } from '../lib/copy-template.js';
import { initGit } from '../lib/git.js';
import { promptInit } from '../lib/prompts.js';
import { openInCursor } from '../lib/workspace.js';
import { isRunningInCursor } from '../lib/cursor-detection.js';
import { runInstall } from './install.js';
import fs from 'fs-extra';

/**
 * Initializes a new SDD project
 */
export async function runInit(): Promise<void> {
  console.log('🚀 Spec-Driven Development Project Initializer\n');

  // Get current working directory
  const cwd = process.cwd();

  try {
    // Prompt for project details (includes smart detection)
    const answers = await promptInit();
    
    // Resolve destination path
    const destPath = path.resolve(cwd, answers.projectName);

    // Check if destination exists
    if (await fs.pathExists(destPath)) {
      console.error(`\n❌ Error: Directory "${answers.projectName}" already exists.`);
      console.error('   Please choose a different name or remove the existing directory.\n');
      process.exit(1);
    }

    // Copy template
    console.log(`\n📦 Copying template to "${answers.projectName}"...`);
    await copyTemplate(destPath);

    // Create linear config if needed
    if (answers.taskMode === 'linear') {
      console.log('📋 Creating Linear sync configuration...');
      await createLinearConfig(destPath);
    }

    // Initialize git if requested
    if (answers.gitInit) {
      console.log('🔧 Initializing git repository...');
      initGit(destPath);
    }

    // Open in Cursor if requested (and not already in Cursor)
    if (answers.openInCursor) {
      await openInCursor(destPath);
    }

    // Success message
    console.log('\n✅ Project initialized successfully!\n');
    console.log('Next steps:');
    console.log(`  1. cd ${answers.projectName}`);
    if (!isRunningInCursor()) {
      console.log('  2. Open the project in Cursor');
    }
    if (answers.taskMode === 'linear') {
      console.log(`  ${isRunningInCursor() ? '2' : '3'}. Configure Linear MCP in Cursor (see .cursor/MCP-SETUP.md if needed)`);
      console.log(`  ${isRunningInCursor() ? '3' : '4'}. Run \`/spec/init\` to begin defining your project specification\n`);
    } else {
      console.log(`  ${isRunningInCursor() ? '2' : '3'}. Run \`/spec/init\` to begin defining your project specification\n`);
    }
  } catch (error) {
    // Check if promptInit suggests switching to install mode
    if (error instanceof Error && error.message === 'SWITCH_TO_INSTALL') {
      // Run install command instead
      console.log('\n🔄 Switching to install mode...\n');
      await runInstall();
      return;
    }

    console.error(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}
