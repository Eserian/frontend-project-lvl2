import stylish from './stylish';
import plain from './plain';
import json from './json';

const map = {
  stylish,
  plain,
  json,
};

export default (formatter) => map[formatter];
