import stylish from './stylish.js';

const formatters = {
  stylish,
};

const getFormatter = (type) => {
  const formatter = formatters[type];

  if (!formatter) throw new Error('Invalid formatter type!');

  return formatter;
};

export default getFormatter;
