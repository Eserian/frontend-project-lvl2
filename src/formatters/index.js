import stylishFormat from './stylish';
import plainFormat from './plain';

const jsonFormat = (diff) => JSON.stringify(diff);

const formattersMap = {
  stylish: stylishFormat,
  plain: plainFormat,
  json: jsonFormat,
};

export default (format) => {
  const formatter = formattersMap[format];

  if (!formatter) {
    throw new Error(`Unknown output format: ${format}`);
  }

  return formatter;
};
