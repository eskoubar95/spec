import fs from 'fs-extra';
import path from 'path';

export interface DetectionResults {
  projectType: string;
  projectSize: 'small' | 'medium' | 'large' | 'enterprise';
  technologies: string[];
  phase?: 'initialization' | 'expansion' | 'maintenance' | 'migration' | 'legacy';
}

export interface ProjectInfo {
  hasCursorFolder: boolean;
  hasCodebase: boolean;
  projectType?: string;
  techStack?: string[];
}

/**
 * Checks if a path is an existing project (has files, manifests, etc.)
 */
export async function isExistingProject(projectPath: string): Promise<boolean> {
  if (!(await fs.pathExists(projectPath))) {
    return false;
  }

  const files = await fs.readdir(projectPath).catch(() => []);
  
  // Check for project manifests
  const hasManifest = files.some(file => 
    ['package.json', 'pyproject.toml', 'go.mod', 'Cargo.toml', 'requirements.txt'].includes(file)
  );

  // Check for source directories
  const hasSourceDirs = files.some(file => 
    ['src', 'app', 'lib', 'pages', 'components'].includes(file)
  );

  // Check for git repository
  const hasGit = files.some(file => file === '.git');

  // Has content (not empty)
  const hasContent = files.length > 0;

  // It's a project if it has manifest OR (has source dirs AND has content) OR has git
  return hasManifest || (hasSourceDirs && hasContent) || hasGit;
}

/**
 * Detects existing project info (for installation context)
 */
export async function detectExistingProject(projectPath: string): Promise<ProjectInfo> {
  const cursorPath = path.join(projectPath, '.cursor');
  const hasCursorFolder = await fs.pathExists(cursorPath);

  const hasCodebase = await isExistingProject(projectPath);

  let projectType: string | undefined;
  let techStack: string[] = [];

  if (hasCodebase) {
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      try {
        const packageJson = await fs.readJson(packageJsonPath);
        
        // Detect technologies from dependencies
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        if (deps.next) techStack.push('nextjs');
        if (deps.react) techStack.push('react');
        if (deps.vue) techStack.push('vue');
        if (deps.express) techStack.push('express');
        if (deps.fastapi || deps.flask) techStack.push('python-api');
        if (deps['@nestjs/core']) techStack.push('nestjs');
        if (deps.typeorm || deps.prisma) techStack.push('database-orm');
        
        // Detect project type
        if (packageJson.bin) {
          projectType = 'cli-tool';
        } else if (deps.next || deps.react || deps.vue) {
          projectType = 'web-app';
        } else if (deps.express || deps['@nestjs/core']) {
          projectType = 'api-service';
        } else if (packageJson.exports || packageJson.types) {
          projectType = 'library';
        }
      } catch {
        // Ignore JSON parse errors
      }
    }
  }

  return {
    hasCursorFolder,
    hasCodebase,
    projectType,
    techStack,
  };
}

/**
 * Runs simplified detection matching detection helper logic
 */
export async function runDetection(projectPath: string): Promise<DetectionResults> {
  const technologies: string[] = [];
  let projectType = 'unknown';
  let projectSize: 'small' | 'medium' | 'large' | 'enterprise' = 'small';

  // Check for package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      // Detect technologies
      if (deps.next) {
        technologies.push('Next.js');
        projectType = 'web-app';
      }
      if (deps.react) technologies.push('React');
      if (deps.vue) {
        technologies.push('Vue');
        if (!projectType || projectType === 'unknown') projectType = 'web-app';
      }
      if (deps.express) {
        technologies.push('Express');
        if (projectType === 'unknown') projectType = 'api-service';
      }
      if (deps.fastapi || deps.flask) {
        technologies.push('Python');
        if (projectType === 'unknown') projectType = 'api-service';
      }
      if (deps.typeorm || deps.prisma) technologies.push('ORM');
      if (deps.mongodb || deps.pg) technologies.push('Database');

      // Check for CLI tool
      if (packageJson.bin) {
        projectType = 'cli-tool';
      }

      // Check for library
      if ((packageJson.exports || packageJson.types) && !packageJson.bin) {
        if (projectType === 'unknown') projectType = 'library';
      }
    } catch {
      // Ignore JSON parse errors
    }
  }

  // Check for Python project
  const pyprojectPath = path.join(projectPath, 'pyproject.toml');
  if (await fs.pathExists(pyprojectPath)) {
    technologies.push('Python');
    if (projectType === 'unknown') projectType = 'api-service';
  }

  // Count files (simplified)
  let fileCount = 0;
  try {
    const countFiles = async (dir: string): Promise<number> => {
      let count = 0;
      const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        // Skip ignored directories
        if (['node_modules', '.git', 'dist', 'build', '.next', '.cursor'].includes(entry.name)) {
          continue;
        }
        
        if (entry.isDirectory()) {
          count += await countFiles(fullPath);
        } else {
          count++;
        }
        
        // Limit counting to avoid performance issues
        if (count > 1000) break;
      }
      
      return count;
    };
    
    fileCount = await countFiles(projectPath);
  } catch {
    // Ignore errors
  }

  // Determine project size
  if (fileCount < 50) {
    projectSize = 'small';
  } else if (fileCount < 200) {
    projectSize = 'medium';
  } else if (fileCount < 1000) {
    projectSize = 'large';
  } else {
    projectSize = 'enterprise';
  }

  return {
    projectType,
    projectSize,
    technologies,
  };
}

