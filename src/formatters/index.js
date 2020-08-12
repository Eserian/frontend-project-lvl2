import stylish from './stylish';
import plain from './plain';

const map = {
  stylish,
  plain,
};

export default (formatter) => map[formatter];
