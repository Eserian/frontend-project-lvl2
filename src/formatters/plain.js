/* eslint-disable no-unused-vars */
import _ from 'lodash';

const mapForStringify = [
  {
    check: (value) => _.isObject(value),
    action: () => '[complex value]',
  },
  {
    check: (value) => _.isBoolean(value),
    action: (value) => value,
  },
  {
    check: (value) => _.isString(value),
    action: (value) => `'${value}'`,
  },
  {
    check: (value) => _.isNumber(value),
    action: (value) => value,
  },
];

const stringify = (value) => {
  const { action } = mapForStringify.find((item) => item.check(value));
  return action(value);
};

const typeMapping = {
  added: (key, value) => `Property '${key}' was added with value: ${stringify(value)}`,
  removed: (key) => `Property '${key}' was removed`,
  changed: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  nested: (key, value, f) => f(value, key),
};

const render = (diff, parent = null) => {
  const rendered = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => ({ ...node, key: parent ? `${parent}.${node.key}` : node.key }))
    .map(({ key, children, type }) => typeMapping[type](key, children, render));

  return rendered.join('\n');
};

export default render;
