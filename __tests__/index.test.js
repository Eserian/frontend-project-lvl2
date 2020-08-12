import path from 'path';
import fs from 'fs';
import { test, expect, beforeAll } from '@jest/globals';
import genDiff from '../src/buildDiff';
import parser from '../src/parser';
import getFormatter from '../src/formatters/index';

const formats = ['json', 'yml', 'ini'];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedStylish;
let expectedPlain;

beforeAll(() => {
  expectedStylish = readFile('resultStylish.txt');
  expectedPlain = readFile('resultPlain.txt');
});

test.each(formats)('%s', (format) => {
  const before = parser(format, readFile(`before.${format}`));
  const after = parser(format, readFile(`after.${format}`));

  const actualStylish = getFormatter('stylish')(genDiff(before, after));
  const actualPlain = getFormatter('plain')(genDiff(before, after));

  expect(actualStylish).toBe(expectedStylish);
  expect(actualPlain).toBe(expectedPlain);
});
