#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { Command } from 'commander';
import genDiff from '../index';
import parser from '../parser';
import stylish from '../stylish';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');
const getFileType = (filepath) => path.extname(filepath).slice(1);

const program = new Command();

const formatters = {
  stylish,
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parser(getFileType(filepath1), readFile(filepath1));
    const data2 = parser(getFileType(filepath2), readFile(filepath2));

    console.log(formatters[program.format](genDiff(data1, data2)));
  });

program.parse(process.argv);
