import path from 'path';
import fs from 'fs';
import { test, expect, beforeAll } from '@jest/globals';
import gendiff from '../src/index';

const formats = ['json', 'yml', 'ini'];

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
  const beforeFilePath = getFixturePath(`before.${format}`);
  const afterFilePath = getFixturePath(`after.${format}`);

  const actualStylish = gendiff(beforeFilePath, afterFilePath, 'stylish');
  const actualPlain = gendiff(beforeFilePath, afterFilePath, 'plain');
  const actualJson = gendiff(beforeFilePath, afterFilePath, 'json');

  expect(actualStylish).toBe(expectedStylish);
  expect(actualPlain).toBe(expectedPlain);
  expect(actualJson).toBe(expectedJson);
});
