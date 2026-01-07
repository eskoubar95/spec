export interface InitAnswers {
  projectName: string; // Already normalized via filter
  taskMode: 'local' | 'linear';
  gitInit: boolean;
  openInCursor?: boolean; // Optional, skipped if already in Cursor
}

export interface InstallAnswers {
  projectPath: string;
  backupStrategy: 'backup' | 'merge';
  installSpecFolders: boolean;
  createRootSpec: boolean;
  initializeDetection: boolean;
  openInCursor?: boolean; // Optional, skipped if already in Cursor
}

export interface ProjectInfo {
  hasCursorFolder: boolean;
  hasCodebase: boolean;
  projectType?: string;
  techStack?: string[];
}

export interface DetectionResults {
  projectType: string;
  projectSize: 'small' | 'medium' | 'large' | 'enterprise';
  technologies: string[];
  phase?: 'initialization' | 'expansion' | 'maintenance' | 'migration' | 'legacy';
}

export interface VersionInfo {
  currentVersion?: string;
  latestVersion: string;
  needsUpdate: boolean;
}

