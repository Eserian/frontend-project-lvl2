import _ from 'lodash';

const map = [
  {
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    action: (obj1, obj2, key, f) => ({
      type: 'nested',
      key,
      children: f(obj1[key], obj2[key]),
    }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key),
    action: (obj1, obj2, key) => (obj1[key] === obj2[key]
      ? {
        type: 'unchanged',
        key,
        children: obj1[key],
      }
      : {
        type: 'changed',
        key,
        children: {
          oldValue: obj1[key],
          newValue: obj2[key],
        },
      }),
  },
  {
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    action: (_obj1, obj2, key) => ({
      type: 'added',
      key,
      children: obj2[key],
    }),
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    action: (obj1, _obj2, key) => ({
      type: 'removed',
      key,
      children: obj1[key],
    }),
  },
];

const buildDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.union(keys1, keys2).sort();

  const diff = keys.map((key) => {
    const { action } = map.find((item) => item.check(obj1, obj2, key));
    return action(obj1, obj2, key, buildDiff);
  });

  return diff;
};

export default buildDiff;
