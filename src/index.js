import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.union(keys1, keys2).sort();

  const diff = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        type: 'object',
        key,
        value: buildDiff(obj1[key], obj2[key]),
      };
    }

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return {
          type: 'unchanged',
          key,
          value: obj1[key],
        };
      }
      return {
        type: 'updated',
        key,
        value: {
          oldValue: obj1[key],
          newValue: obj2[key],
        },
      };
    }

    if (!_.has(obj1, key)) {
      return {
        type: 'add',
        key,
        value: obj2[key],
      };
    }

    return {
      type: 'remove',
      key,
      value: obj1[key],
    };
  });

  return diff;
};

export default buildDiff;
