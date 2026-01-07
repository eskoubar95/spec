#!/usr/bin/env node

import { runInit } from './commands/init.js';
import { runInstall } from './commands/install.js';
import { runUpdate } from './commands/update.js';
import { runWorkspace } from './commands/workspace.js';
import { runHelp } from './commands/help.js';

const args = process.argv.slice(2);

if (args.length === 0) {
  // No command provided, show help
  runHelp();
  process.exit(0);
}

const command = args[0];
const projectPath = args[1]; // Optional project path for install/update/workspace

// Handle commands
switch (command) {
  case 'init':
    runInit().catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
    break;

  case 'install':
    runInstall(projectPath).catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
    break;

  case 'update':
    runUpdate(projectPath).catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
    break;

  case 'workspace':
    runWorkspace(projectPath).catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
    break;

  case 'help':
    runHelp();
    break;

  default:
    console.error(`Unknown command: ${command}\n`);
    runHelp();
    process.exit(1);
}
