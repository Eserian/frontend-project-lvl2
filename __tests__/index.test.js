import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index';
import parser from '../src/parser';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  const before = parser('json', readFile('before.json'));
  const after = parser('json', readFile('after.json'));
  const expected = readFile('result.txt');

  expect(genDiff(before, after)).toBe(expected);
});
