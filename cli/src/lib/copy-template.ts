import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { backupCursorFolder, checkCursorFolder } from './backup-cursor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the template directory path
 * Works in both development (template at repo root) and published (template at package root)
 */
async function getTemplateDir(): Promise<string> {
  // Try repo root (for development)
  const repoRoot = path.resolve(__dirname, '../../../..');
  const templateInRepo = path.join(repoRoot, 'template');

  // Try package root (for published package)
  const packageRoot = path.resolve(__dirname, '../..');
  const templateInPackage = path.join(packageRoot, 'template');
  
  // Return the first path that exists
  if (await fs.pathExists(templateInRepo)) {
    return templateInRepo;
  }
  if (await fs.pathExists(templateInPackage)) {
    return templateInPackage;
  }
  // Fallback to package root (will fail with clear error in copyTemplate)
  return templateInPackage;
}

/**
 * Copies the template directory to the destination
 * @param destPath - Destination path
 * @param allowOverwrite - Allow overwriting existing directory (for install mode)
 */
export async function copyTemplate(destPath: string, allowOverwrite: boolean = false): Promise<void> {
  const templateDir = await getTemplateDir();
  
  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  // Check if destination exists
  if (await fs.pathExists(destPath)) {
    if (!allowOverwrite) {
      throw new Error(`Destination already exists: ${destPath}`);
    }
  } else {
    // Create destination if it doesn't exist
    await fs.ensureDir(destPath);
  }

  // Copy template to destination
  await fs.copy(templateDir, destPath, {
    overwrite: allowOverwrite,
    filter: (src, dest) => {
      // Skip .git if exists in template
      if (path.basename(src) === '.git') {
        return false;
      }
      return true;
    },
  });
}

/**
 * Installs template to existing project with backup/merge support
 * @param projectPath - Path to the existing project
 * @param backupStrategy - 'backup' or 'merge'
 */
export async function installTemplate(
  projectPath: string,
  backupStrategy: 'backup' | 'merge' = 'backup'
): Promise<void> {
  const templateDir = await getTemplateDir();
  
  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  // Check if .cursor folder exists
  const { hasCursorFolder, hasContent } = await checkCursorFolder(projectPath);

  if (hasCursorFolder && hasContent && backupStrategy === 'backup') {
    // Backup existing .cursor folder
    const backupPath = await backupCursorFolder(projectPath);
    console.log(`   Backed up .cursor folder to: ${path.basename(backupPath)}`);
  }

  // Copy .cursor folder from template (will overwrite if backup was done, merge otherwise)
  const templateCursorPath = path.join(templateDir, '.cursor');
  const destCursorPath = path.join(projectPath, '.cursor');

  if (await fs.pathExists(templateCursorPath)) {
    if (backupStrategy === 'merge' && hasCursorFolder) {
      // Merge: Copy only files that don't exist
      const mergeCursorFolder = async (src: string, dest: string) => {
        const entries = await fs.readdir(src, { withFileTypes: true });
        
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          
          if (entry.isDirectory()) {
            if (!(await fs.pathExists(destPath))) {
              await fs.copy(srcPath, destPath);
            } else {
              await mergeCursorFolder(srcPath, destPath);
            }
          } else {
            // Only copy if file doesn't exist in destination
            if (!(await fs.pathExists(destPath))) {
              await fs.copy(srcPath, destPath);
            } else {
              console.log(`   Preserved existing file: .cursor/${entry.name}`);
            }
          }
        }
      };

      await fs.ensureDir(destCursorPath);
      await mergeCursorFolder(templateCursorPath, destCursorPath);
    } else {
      // Backup strategy or no existing .cursor: Copy all
      await fs.copy(templateCursorPath, destCursorPath, { overwrite: true });
    }
  }

  // Copy spec/ and work/ folders if they don't exist
  const specPath = path.join(projectPath, 'spec');
  const workPath = path.join(projectPath, 'work');
  const templateSpecPath = path.join(templateDir, 'spec');
  const templateWorkPath = path.join(templateDir, 'work');

  if (await fs.pathExists(templateSpecPath) && !(await fs.pathExists(specPath))) {
    await fs.copy(templateSpecPath, specPath);
  }

  if (await fs.pathExists(templateWorkPath) && !(await fs.pathExists(workPath))) {
    await fs.copy(templateWorkPath, workPath);
  }

  // Copy .sdd/ folder
  const sddPath = path.join(projectPath, '.sdd');
  const templateSddPath = path.join(templateDir, '.sdd');

  if (await fs.pathExists(templateSddPath)) {
    await fs.copy(templateSddPath, sddPath, { overwrite: true });
  }
}

/**
 * Creates the linear sync config file if mode is linear
 */
export async function createLinearConfig(projectPath: string): Promise<void> {
  const linearDir = path.join(projectPath, 'work', 'linear');
  const configPath = path.join(linearDir, 'sync-config.md');

  await fs.ensureDir(linearDir);
  await fs.writeFile(configPath, 'MODE=linear\n', 'utf-8');
}
