import yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (type, data) => mapping[type](data);
