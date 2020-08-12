import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const updateIniParser = (object) => _.mapValues(object, (value) => {
  if (!_.isObject(value)) {
    return parseFloat(value) || value;
  }
  return updateIniParser(value);
});

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: (data) => updateIniParser(ini.parse(data)),
};

export default (type, data) => mapping[type](data);
