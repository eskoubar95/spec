import path from 'path';
import { checkVersion, updateVersionFile } from '../lib/version-check.js';
import { backupCursorFolder } from '../lib/backup-cursor.js';
import { installTemplate } from '../lib/copy-template.js';
import { runDetection } from '../lib/detection.js';
import fs from 'fs-extra';

/**
 * Updates SDD system in an existing installation
 */
export async function runUpdate(projectPath?: string): Promise<void> {
  console.log('🔄 Spec-Driven Development Updater\n');

  const cwd = process.cwd();
  const finalPath = projectPath ? path.resolve(cwd, projectPath) : cwd;

  try {
    // Check if .sdd folder exists (indicates SDD is installed)
    const sddPath = path.join(finalPath, '.sdd');
    if (!(await fs.pathExists(sddPath))) {
      console.error(`\n❌ Error: SDD is not installed in this project.`);
      console.error('   Run `spec install` to install SDD first.\n');
      process.exit(1);
    }

    // Check current version
    const versionInfo = await checkVersion(finalPath);
    
    if (!versionInfo.needsUpdate && versionInfo.currentVersion) {
      console.log(`✓ SDD is already up to date (version ${versionInfo.currentVersion}).\n`);
      return;
    }

    if (versionInfo.currentVersion) {
      console.log(`📊 Current version: ${versionInfo.currentVersion}`);
      console.log(`📊 Latest version: ${versionInfo.latestVersion}\n`);
    } else {
      console.log(`📊 Installing SDD (version ${versionInfo.latestVersion})...\n`);
    }

    // Backup .cursor/ folder before update
    console.log('💾 Backing up current .cursor/ folder...');
    const backupPath = await backupCursorFolder(finalPath);
    console.log(`   Backed up to: ${path.basename(backupPath)}\n`);

    // Update template files (using merge strategy to preserve user customizations)
    console.log('📦 Updating SDD system files...');
    await installTemplate(finalPath, 'merge');

    // Update version file
    await updateVersionFile(finalPath, versionInfo.latestVersion);

    // Update install-info.json
    const installInfoPath = path.join(sddPath, 'install-info.json');
    let installInfo: any = {};
    if (await fs.pathExists(installInfoPath)) {
      try {
        installInfo = await fs.readJson(installInfoPath);
      } catch {
        // Ignore read errors
      }
    }
    installInfo.version = versionInfo.latestVersion;
    installInfo.update_date = new Date().toISOString().split('T')[0];
    await fs.writeJson(installInfoPath, installInfo, { spaces: 2 });

    // Update detection cache
    console.log('🔍 Updating detection cache...');
    const detectionResults = await runDetection(finalPath);
    const detectionCachePath = path.join(sddPath, 'detection-cache.json');
    await fs.writeJson(detectionCachePath, detectionResults, { spaces: 2 });

    console.log('\n✅ SDD system updated successfully!\n');
    console.log(`   Version: ${versionInfo.currentVersion || 'new'} → ${versionInfo.latestVersion}`);
    console.log(`   Backup: ${path.basename(backupPath)}\n`);
  } catch (error) {
    console.error(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

