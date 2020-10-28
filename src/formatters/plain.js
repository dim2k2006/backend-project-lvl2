import isObject from 'lodash/isObject.js';
import isString from 'lodash/isString.js';
import find from 'lodash/find.js';
import get from 'lodash/get.js';
import identity from 'lodash/identity.js';

const valueTypes = [
  {
    checker: (value) => isObject(value),
    process: () => '[complex value]',
  },
  {
    checker: (value) => isString(value),
    process: (value) => `'${value}'`,
  },
];

const toString = (value) => {
  const item = find(valueTypes, ({ checker }) => checker(value));
  const process = get(item, 'process', identity);

  const result = process(value);

  return result;
};

const genPath = (path, part) => `${path ? `${path}.${part}` : part}`;

const nodeTypes = {
  NESTED: (node, path, fn) => fn(node.value, genPath(path, node.key)),
  ADDED: (node, path) => `Property '${genPath(path, node.key)}' was added with value: ${toString(node.value)}`,
  REMOVED: (node, path) => `Property '${genPath(path, node.key)}' was removed`,
  CHANGED: (node, path) => `Property '${genPath(path, node.key)}' was updated. From ${toString(node.valueBefore)} to ${toString(node.valueAfter)}`,
  UNCHANGED: () => '',
};

const plain = (ast) => {
  const iter = (tree, path = '') => {
    const result = tree.map((node) => {
      const process = nodeTypes[node.type];

      const processedNode = process(node, path, iter);

      return processedNode;
    });

    return result
      .flat(Infinity)
      .filter((item) => item !== '');
  };

  const result = iter(ast, '');

  return result.join('\n');
};

export default plain;
