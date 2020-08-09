import _ from 'lodash';

export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.union(keys1, keys2);

  const result = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}`];
      }
      return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }

    if (!_.has(obj1, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }

    return [...acc, `  - ${key}: ${obj1[key]}`];
  }, []);

  return `{\n${result.join('\n')}\n}`;
};
