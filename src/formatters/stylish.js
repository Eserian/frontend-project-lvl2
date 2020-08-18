import _ from 'lodash';

const indent = (dept) => ' '.repeat(2 * dept);

const stringify = (item, dept) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item).map(([key, value]) => `${indent(dept + 2)}${key}: ${stringify(value, dept + 2)}`);
  return `{\n${result.join('\n')}\n${indent(dept)}}`;
};

const typeMapping = {
  added: (key, value, dept) => `${indent(dept)}+ ${key}: ${stringify(value, dept + 1)}`,
  removed: (key, value, dept) => `${indent(dept)}- ${key}: ${stringify(value, dept + 1)}`,
  changed: (key, { oldValue, newValue }, dept) => `${indent(dept)}- ${key}: ${stringify(oldValue, dept + 1)}\n${indent(dept)}+ ${key}: ${stringify(newValue, dept + 1)}`,
  unchanged: (key, value, dept) => `${indent(dept)}  ${key}: ${stringify(value, dept + 1)}`,
  nested: (key, value, dept, f) => `${indent(dept)}  ${key}: ${f(value, dept + 2)}`,
};

const render = (diff, dept = 1) => {
  const rendered = diff.map(({ key, children, type }) => (
    typeMapping[type](key, children, dept, render)));
  return `{\n${rendered.join('\n')}\n${indent(dept - 1)}}`;
};

export default render;
