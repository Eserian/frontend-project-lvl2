import _ from 'lodash';

const makeIndent = (dept) => ' '.repeat(2 * dept);

const stringify = (item, dept) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item).map(([key, value]) => `${makeIndent(dept + 2)}${key}: ${stringify(value, dept + 2)}`);
  return `{\n${result.join('\n')}\n${makeIndent(dept)}}`;
};

const render = (diff, dept = 1) => {
  const mapped = {
    add: (key, value) => `${makeIndent(dept)}+ ${key}: ${stringify(value, dept + 1)}`,
    remove: (key, value) => `${makeIndent(dept)}- ${key}: ${stringify(value, dept + 1)}`,
    updated: (key, { oldValue, newValue }) => `${makeIndent(dept)}- ${key}: ${stringify(oldValue, dept + 1)}\n${makeIndent(dept)}+ ${key}: ${stringify(newValue, dept + 1)}`,
    unchanged: (key, value) => `${makeIndent(dept)}  ${key}: ${stringify(value, dept + 1)}`,
    object: (key, value) => `${makeIndent(dept)}  ${key}: ${render(value, dept + 2)}`,
  };

  const rendered = diff.map(({ key, value, type }) => mapped[type](key, value));
  return `{\n${rendered.join('\n')}\n${makeIndent(dept - 1)}}`;
};

export default render;
