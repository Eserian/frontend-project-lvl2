import stylishFormatter from './stylish';
import plainFormatter from './plain';

const jsonFormatter = (diff) => JSON.stringify(diff);

const formattersMap = {
  stylish: stylishFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

export default (format) => {
  const formatter = formattersMap[format];

  if (!formatter) {
    throw new Error(`Unknown output format: ${format}`);
  }
  return formatter;
};
