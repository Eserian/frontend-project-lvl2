const mapping = {
  json: JSON.parse,
};

export default (type, data) => mapping[type](data);
