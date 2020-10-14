import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

const getFormatter = (type) => {
  const formatter = formatters[type];

  if (!formatter) throw new Error('Invalid formatter type!');

  return formatter;
};

export default getFormatter;
