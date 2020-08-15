import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const normalizeNumbers = (object) => _.mapValues(object, (value) => {
  if (!_.isObject(value)) {
    return parseFloat(value) || value;
  }
  return normalizeNumbers(value);
});

const parseIni = (data) => normalizeNumbers(ini.parse(data));

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (type, data) => {
  if (!mapping[type]) {
    throw new Error(`Unsupported file extension: ${type}`);
  }
  return mapping[type](data);
};
