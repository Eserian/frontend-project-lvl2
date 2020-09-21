import _ from 'lodash';

const indent = (depth) => '  '.repeat(depth);

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item).map(([key, value]) => `${indent(depth + 2)}${key}: ${stringify(value, depth + 2)}`);
  return `{\n${result.join('\n')}\n${indent(depth)}}`;
};

const typeMapping = {
  added: ({ key, value }, depth) => `${indent(depth)}+ ${key}: ${stringify(value, depth + 1)}`,
  removed: ({ key, value }, depth) => `${indent(depth)}- ${key}: ${stringify(value, depth + 1)}`,
  changed: ({ key, value: { oldValue, newValue } }, depth) => `${indent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}\n${indent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`,
  unchanged: ({ key, value }, depth) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`,
  nested: ({ key, children }, depth, f) => `${indent(depth)}  ${key}: ${f(children, depth + 2)}`,
};

const render = (diff, depth = 1) => {
  const rendered = diff.map((node) => typeMapping[node.type](node, depth, render));

  return `{\n${rendered.join('\n')}\n${indent(depth - 1)}}`;
};

export default render;
