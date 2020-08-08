import path from 'path';

const mapping = {
  json: JSON.parse,
};

export default (file, data) => {
  const extname = path.extname(file);

  return mapping[extname.slice(1)](data);
};
