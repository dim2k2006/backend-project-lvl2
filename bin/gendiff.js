#!/usr/bin/env node

import commander from 'commander';

const { program } = commander;

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<file1> <file2>');

program.parse(process.argv);
