import stylish from './stylish';
import plain from './plain';
import json from './json';

const formatters = {
  stylish,
  plain,
  json,
};

export default (format) => {
  if (!formatters[format]) {
    throw new Error(`Unknown output format: ${format}`);
  }
  return formatters[format];
};
