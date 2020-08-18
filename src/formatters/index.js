import formatStylish from './stylish';
import formatPlain from './plain';

const formatJson = (diff) => JSON.stringify(diff);

const formattersMap = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default (format) => {
  const formatter = formattersMap[format];

  if (!formatter) {
    throw new Error(`Unknown output format: ${format}`);
  }

  return formatter;
};
