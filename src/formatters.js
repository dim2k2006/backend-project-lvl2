import head from 'lodash/head.js';
import tail from 'lodash/tail.js';
import isObject from 'lodash/isObject.js';
import toPairs from 'lodash/toPairs.js';

const placeholder = ' ';
const indent = 4;
const charLength = 2;
const startChar = '{';
const endChar = '}';

const getIndentation = (depth) => placeholder.repeat(indent * depth - charLength);

const getEndCharIndentation = (depth) => placeholder.repeat(indent * depth - indent);

const toString = (value, depth) => {
  if (!isObject(value)) return value;

  const result = toPairs(value)
    .map(([key, val]) => `  ${key}: ${toString(val, depth + 1)}`)
    .map((val) => `${getIndentation(depth)}${val}`)
    .join('\n');

  return `${startChar}\n${result}\n${depth > 1 ? getEndCharIndentation(depth) : ''}${endChar}`;
};

const nodeTypes = {
  NESTED: (node, depth, fn) => [`  ${node.key}: ${fn(node.value, [], depth + 1)}`],
  ADDED: (node, depth) => [`+ ${node.key}: ${toString(node.value, depth + 1)}`],
  REMOVED: (node, depth) => [`- ${node.key}: ${toString(node.value, depth + 1)}`],
  CHANGED: (node, depth) => [`- ${node.key}: ${toString(node.prevValue, depth + 1)}`, `+ ${node.key}: ${toString(node.value, depth + 1)}`],
  UNCHANGED: (node, depth) => [`  ${node.key}: ${toString(node.value, depth + 1)}`],
};

const stylish = (ast) => {
  const iter = (tree, acc, depth = 1) => {
    if (!tree.length) {
      return `${startChar}\n${acc.join('\n')}\n${depth > 1 ? getEndCharIndentation(depth) : ''}${endChar}`;
    }

    const node = head(tree);

    const process = nodeTypes[node.type];

    const result = process(node, depth, iter)
      .map((item) => `${getIndentation(depth)}${item}`);

    return iter(tail(tree), [...acc, ...result], depth);
  };

  const result = iter(ast, []);

  return result;
};

const formatters = {
  stylish,
};

const getFormatter = (type) => {
  const formatter = formatters[type];

  if (!formatter) throw new Error('Invalid formatter type!');

  return formatter;
};

export default getFormatter;
