import path from 'path';
import fs from 'fs';
import buildDiff from './buildDiff';
import parse from './parser';
import getFormater from './formatters/index';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');
const getFileType = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, format) => {
  const data1 = parse(getFileType(filepath1), readFile(filepath1));
  const data2 = parse(getFileType(filepath2), readFile(filepath2));

  const formatter = getFormater(format);
  const diff = buildDiff(data1, data2);

  return formatter(diff);
};
