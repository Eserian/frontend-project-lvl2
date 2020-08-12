/* eslint-disable no-unused-vars */
import _ from 'lodash';

const mapForStringify = [
  {
    check: (value) => _.isObject(value),
    action: (_value) => '[complex value]',
  },
  {
    check: (value) => _.isBoolean(value),
    action: (value) => value,
  },
  {
    check: (value) => _.isString(value),
    action: (value) => `'${value}'`,
  },
];

const stringify = (value) => {
  const { action } = mapForStringify.find((item) => item.check(value));
  return action(value);
};

const mapped = {
  add: (key, value) => `Property '${key}' was added with value: ${stringify(value)}`,
  remove: (key) => `Property '${key}' was removed`,
  updated: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  object: (key, value, f) => f(value, key),
};

const render = (diff, parent = null) => {
  const rendered = diff
    .filter((item) => item.type !== 'unchanged')
    .map((item) => ({ ...item, key: parent ? `${parent}.${item.key}` : item.key }))
    .map(({ key, value, type }) => mapped[type](key, value, render));

  return rendered.join('\n');
};

export default render;
