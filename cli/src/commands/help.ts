/**
 * Displays help information for the CLI
 */
export function runHelp(): void {
  console.log('Spec-Driven Development CLI\n');
  console.log('Usage:');
  console.log('  spec <command> [options]\n');
  console.log('Commands:');
  console.log('  init       Create a new SDD project');
  console.log('  install    Install SDD to an existing project');
  console.log('  update     Update SDD system in an existing installation');
  console.log('  workspace  Open a project in Cursor IDE');
  console.log('  help       Show this help message\n');
  console.log('Examples:');
  console.log('  spec init                    Create a new project');
  console.log('  spec install                 Install to current directory');
  console.log('  spec install ./my-project    Install to specific directory');
  console.log('  spec update                  Update SDD in current directory');
  console.log('  spec workspace               Open current directory in Cursor\n');
  console.log('For more information, see the README at:');
  console.log('  https://github.com/eskoubar95/spec-driven-development\n');
}

