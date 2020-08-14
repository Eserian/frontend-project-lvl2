import stylish from './stylish';
import plain from './plain';
import json from './json';

const formattersMap = {
  stylish,
  plain,
  json,
};

export default (format) => {
  if (!formattersMap[format]) {
    throw new Error(`Unknown output format: ${format}`);
  }
  return formattersMap[format];
};
