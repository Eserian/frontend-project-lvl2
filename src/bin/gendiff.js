#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../index';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2, program.format)));

program.parse(process.argv);
