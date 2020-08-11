import path from 'path';
import fs from 'fs';
import { test, expect, beforeAll } from '@jest/globals';
import genDiff from '../src/index';
import parser from '../src/parser';
import formatter from '../src/stylish';

const formats = ['json', 'ini', 'yml'];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expected;

beforeAll(() => {
  expected = readFile('result.txt');
});

test.each(formats)('%s', (format) => {
  const before = parser(format, readFile(`before.${format}`));
  const after = parser(format, readFile(`after.${format}`));
  const actual = formatter(genDiff(before, after));

  expect(actual).toBe(expected);
});
