/**
 * Normalizes project name by converting spaces to hyphens and lowercase
 * @param name - The project name to normalize
 * @returns Normalized project name
 */
export function normalizeProjectName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase()
    .replace(/[<>:"/\\|?*]/g, ''); // Remove invalid characters (should already be validated, but extra safety)
}

