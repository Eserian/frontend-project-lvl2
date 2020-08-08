#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { Command } from 'commander';
import genDiff from '../index';
import parser from '../parser';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parser(filepath1, readFile(filepath1));
    const data2 = parser(filepath2, readFile(filepath2));

    console.log(genDiff(data1, data2));
  })
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
