/* eslint-disable no-unused-vars */
import _ from 'lodash';

const mapForStringify = [
  {
    check: _.isObject,
    action: () => '[complex value]',
  },
  {
    check: _.isBoolean,
    action: (value) => value,
  },
  {
    check: _.isString,
    action: (value) => `'${value}'`,
  },
  {
    check: _.isNumber,
    action: (value) => value,
  },
];

const stringify = (value) => {
  const { action } = mapForStringify.find((item) => item.check(value));
  return action(value);
};

const typeMapping = {
  added: ({ key, value }) => `Property '${key}' was added with value: ${stringify(value)}`,
  removed: ({ key }) => `Property '${key}' was removed`,
  changed: ({ key, value: { oldValue, newValue } }) => `Property '${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  nested: ({ key, children }, f) => f(children, key),
};

const render = (diff, parent = null) => {
  const rendered = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => ({ ...node, key: parent ? `${parent}.${node.key}` : node.key }))
    .map((node) => typeMapping[node.type](node, render));

  return rendered.join('\n');
};

export default render;
