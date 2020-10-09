import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const getParser = (type) => {
  const parser = parsers[type];

  if (!parser) throw new Error(`Invalid parser type: ${type}`);

  return parser;
};

export default getParser;
