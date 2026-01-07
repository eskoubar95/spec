import path from 'path';
import { installTemplate, createLinearConfig } from '../lib/copy-template.js';
import { promptInstall } from '../lib/prompts.js';
import { openInCursor } from '../lib/workspace.js';
import { isRunningInCursor } from '../lib/cursor-detection.js';
import { runDetection } from '../lib/detection.js';
import { createSpecForExistingProject } from '../lib/install-existing.js';
import { updateVersionFile, getPackageVersion } from '../lib/version-check.js';
import fs from 'fs-extra';

/**
 * Installs SDD system to an existing project
 */
export async function runInstall(projectPath?: string): Promise<void> {
  console.log('🔧 Spec-Driven Development Installer\n');

  // Get current working directory
  const cwd = process.cwd();

  // Use provided path or current directory
  const initialPath = projectPath ? path.resolve(cwd, projectPath) : cwd;

  try {
    // Prompt for installation options
    const answers = await promptInstall(initialPath);

    // Resolve final project path
    const finalProjectPath = path.resolve(cwd, answers.projectPath);

    // Check if project path exists
    if (!(await fs.pathExists(finalProjectPath))) {
      console.error(`\n❌ Error: Directory "${finalProjectPath}" does not exist.`);
      console.error('   Please provide a valid project path.\n');
      process.exit(1);
    }

    // Install template with backup/merge strategy
    console.log(`\n📦 Installing SDD system to "${answers.projectPath}"...`);
    await installTemplate(finalProjectPath, answers.backupStrategy);

    // Install spec/ and work/ folders if requested
    if (answers.installSpecFolders) {
      // Already done by installTemplate, but check if spec/00-root-spec.md should be created
      if (answers.createRootSpec) {
        await createSpecForExistingProject(finalProjectPath);
      }
    }

    // Create .sdd/ folder and initialize version
    const sddPath = path.join(finalProjectPath, '.sdd');
    await fs.ensureDir(sddPath);
    const packageVersion = await getPackageVersion();
    await updateVersionFile(finalProjectPath, packageVersion);

    // Create install-info.json
    const installInfoPath = path.join(sddPath, 'install-info.json');
    const installInfo = {
      version: packageVersion,
      installed_date: new Date().toISOString().split('T')[0],
      installed_by: 'cli',
      installation_type: 'existing' as const,
    };
    await fs.writeJson(installInfoPath, installInfo, { spaces: 2 });

    // Initialize detection cache if requested
    if (answers.initializeDetection) {
      console.log('🔍 Running project detection...');
      const detectionResults = await runDetection(finalProjectPath);
      const detectionCachePath = path.join(sddPath, 'detection-cache.json');
      await fs.writeJson(detectionCachePath, detectionResults, { spaces: 2 });
      console.log(`   Detected: ${detectionResults.projectType} (${detectionResults.projectSize})`);
      if (detectionResults.technologies.length > 0) {
        console.log(`   Technologies: ${detectionResults.technologies.join(', ')}`);
      }
    }

    // Open in Cursor if requested (and not already in Cursor)
    if (answers.openInCursor) {
      await openInCursor(finalProjectPath);
    }

    // Success message
    console.log('\n✅ SDD system installed successfully!\n');
    console.log('Next steps:');
    if (!isRunningInCursor()) {
      console.log('  1. Open the project in Cursor');
    }
    if (answers.createRootSpec) {
      console.log(`  ${isRunningInCursor() ? '1' : '2'}. Review and update spec/00-root-spec.md for your existing project`);
      console.log(`  ${isRunningInCursor() ? '2' : '3'}. Run \`/spec/init\` to begin defining your project specification\n`);
    } else {
      console.log(`  ${isRunningInCursor() ? '1' : '2'}. Run \`/spec/init\` to begin defining your project specification\n`);
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

