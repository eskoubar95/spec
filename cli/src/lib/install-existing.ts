import fs from 'fs-extra';
import path from 'path';

/**
 * Creates spec/00-root-spec.md for existing projects with frontmatter marking
 * @param projectPath - Path to the project
 */
export async function createSpecForExistingProject(projectPath: string): Promise<void> {
  const specPath = path.join(projectPath, 'spec', '00-root-spec.md');

  // Check if spec already exists
  if (await fs.pathExists(specPath)) {
    return; // Don't overwrite existing spec
  }

  // Ensure spec directory exists
  await fs.ensureDir(path.dirname(specPath));

  // Get current date
  const installationDate = new Date().toISOString().split('T')[0];

  // Create spec file with frontmatter marking for existing projects
  const specContent = `---
sdd_version: 0.1.0
installed_in_existing_project: true
installation_date: ${installationDate}
---

# Project Root Specification

## 1. Idea Overview
Describe the idea in broad terms.
What problem does this project aim to solve?

## 2. Motivation
Why does this project exist?
What makes it worth building?

## 3. Target Users
Who is this for?
(Keep it high-level; personas can come later.)

## 4. Core Value
What is the main value delivered to users?

## 5. Initial Scope
What feels in-scope right now?
What explicitly feels out-of-scope?

## 6. Open Questions
List uncertainties, assumptions, or things that need clarification.

## 7. Early Risks & Concerns
Only include risks that are already visible at this stage.

## 8. Notes
Anything else discovered during discussion or research.

## 9. Related Specifications
If applicable, reference:
- \`spec/01-prd.md\` (if PRD was created)
- \`spec/02-architecture.md\` (if architecture is documented)
- \`spec/07-design-system.md\` (if design is critical)
- \`spec/08-infrastructure.md\` (if infrastructure is critical)
`;

  await fs.writeFile(specPath, specContent, 'utf-8');
}

