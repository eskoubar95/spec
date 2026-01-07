import fs from 'fs-extra';
import path from 'path';

export interface VersionInfo {
  currentVersion?: string;
  latestVersion: string;
  needsUpdate: boolean;
}

/**
 * Gets the current package version from package.json
 */
export async function getPackageVersion(): Promise<string> {
  const packageJsonPath = path.resolve(import.meta.url.replace('file://', ''), '../../../package.json');
  
  try {
    const packageJson = await fs.readJson(packageJsonPath);
    return packageJson.version || '0.1.0';
  } catch {
    return '0.1.0'; // Fallback
  }
}

/**
 * Checks the current version and determines if an update is needed
 * @param projectPath - Path to the project
 */
export async function checkVersion(projectPath: string): Promise<VersionInfo> {
  const versionPath = path.join(projectPath, '.sdd', 'version');
  const latestVersion = await getPackageVersion();

  let currentVersion: string | undefined;
  if (await fs.pathExists(versionPath)) {
    try {
      currentVersion = (await fs.readFile(versionPath, 'utf-8')).trim();
    } catch {
      // Ignore read errors
    }
  }

  const needsUpdate = currentVersion !== undefined && currentVersion !== latestVersion;

  return {
    currentVersion,
    latestVersion,
    needsUpdate,
  };
}

/**
 * Updates the version file in the project
 * @param projectPath - Path to the project
 * @param version - Version string to write
 */
export async function updateVersionFile(projectPath: string, version: string): Promise<void> {
  const versionPath = path.join(projectPath, '.sdd', 'version');
  await fs.ensureDir(path.dirname(versionPath));
  await fs.writeFile(versionPath, version, 'utf-8');
}

