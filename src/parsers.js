import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getParser = (type) => {
  const parser = parsers[type];

  if (!parser) throw new Error(`Invalid parser type: ${type}`);

  return parser;
};

export default getParser;
