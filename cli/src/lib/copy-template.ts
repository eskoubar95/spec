import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the template directory path
 * Works in both development (template at repo root) and published (template at package root)
 */
async function getTemplateDir(): Promise<string> {
  // Try package root first (for published package)
  const packageRoot = path.resolve(__dirname, '../..');
  const templateInPackage = path.join(packageRoot, 'template');
  
  // Try repo root (for development)
  const repoRoot = path.resolve(__dirname, '../../../..');
  const templateInRepo = path.join(repoRoot, 'template');
  
  // Return the first path that exists
  if (await fs.pathExists(templateInPackage)) {
    return templateInPackage;
  }
  if (await fs.pathExists(templateInRepo)) {
    return templateInRepo;
  }
  // Fallback to package root (will fail with clear error in copyTemplate)
  return templateInPackage;
}

/**
 * Copies the template directory to the destination
 */
export async function copyTemplate(destPath: string): Promise<void> {
  const templateDir = await getTemplateDir();
  
  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  // Check if destination exists
  if (await fs.pathExists(destPath)) {
    throw new Error(`Destination already exists: ${destPath}`);
  }

  // Copy template to destination
  await fs.copy(templateDir, destPath);
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

