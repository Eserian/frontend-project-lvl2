#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../../package.json';
import gendiff from '../index';

const program = new Command();

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(`\n${gendiff(filepath1, filepath2, program.format)}`));

program.parse(process.argv);
