import _ from 'lodash';

const makeIndent = (dept) => ' '.repeat(2 * dept);

const stringify = (item, dept) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item).map(([key, value]) => `${makeIndent(dept + 2)}${key}: ${stringify(value, dept + 2)}`);
  return `{\n${result.join('\n')}\n${makeIndent(dept)}}`;
};

const map = {
  add: (key, value, dept) => `${makeIndent(dept)}+ ${key}: ${stringify(value, dept + 1)}`,
  remove: (key, value, dept) => `${makeIndent(dept)}- ${key}: ${stringify(value, dept + 1)}`,
  updated: (key, { oldValue, newValue }, dept) => `${makeIndent(dept)}- ${key}: ${stringify(oldValue, dept + 1)}\n${makeIndent(dept)}+ ${key}: ${stringify(newValue, dept + 1)}`,
  unchanged: (key, value, dept) => `${makeIndent(dept)}  ${key}: ${stringify(value, dept + 1)}`,
  nested: (key, value, dept, f) => `${makeIndent(dept)}  ${key}: ${f(value, dept + 2)}`,
};

const render = (diff, dept = 1) => {
  const rendered = diff.map(({ key, children, type }) => map[type](key, children, dept, render));
  return `{\n${rendered.join('\n')}\n${makeIndent(dept - 1)}}`;
};

export default render;
