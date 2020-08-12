import path from 'path';
import fs from 'fs';
import { test, expect, beforeAll } from '@jest/globals';
import genDiff from '../src/buildDiff';
import parser from '../src/parser';
import getFormatter from '../src/formatters/index';

const formats = ['json', 'ini', 'yml'];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedStylish;
let expectedPlain;
let expectedJson;

beforeAll(() => {
  expectedStylish = readFile('resultStylish.txt');
  expectedPlain = readFile('resultPlain.txt');
  expectedJson = readFile('result.json');
});

test.each(formats)('%s', (format) => {
  const before = parser(format, readFile(`before.${format}`));
  const after = parser(format, readFile(`after.${format}`));

  const actualStylish = getFormatter('stylish')(genDiff(before, after));
  const actualPlain = getFormatter('plain')(genDiff(before, after));
  const actualJson = getFormatter('json')(genDiff(before, after));

  expect(actualStylish).toBe(expectedStylish);
  expect(actualPlain).toBe(expectedPlain);
  expect(actualJson).toBe(expectedJson);
});
