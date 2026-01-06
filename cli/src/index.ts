#!/usr/bin/env node

import { runInit } from './commands/init.js';

const args = process.argv.slice(2);

if (args.length === 0 || args[0] !== 'init') {
  console.log('Spec-Driven Development CLI\n');
  console.log('Usage:');
  console.log('  spec init    Initialize a new SDD project\n');
  process.exit(1);
}

if (args[0] === 'init') {
  runInit().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

