import path from 'path';
import fs from 'fs';
import keys from 'lodash/keys.js';
import union from 'lodash/union.js';
import has from 'lodash/has.js';
import find from 'lodash/find.js';
import isObject from 'lodash/isObject.js';
import isArray from 'lodash/isArray.js';
import getParser from './parsers.js';
import getFormatter from './formatters';

const getDiff = (data1, data2) => {
  const diffs = [
    {
      checker: (key) => isObject(data1[key])
        && isObject(data2[key])
        && !isArray(data1[key])
        && !isArray(data2[key]),
      process: (key) => ({
        type: 'NESTED',
        key,
        value: getDiff(data1[key], data2[key]),
      }),
    },
    {
      checker: (key) => !has(data1, key) && has(data2, key),
      process: (key) => ({
        type: 'ADDED',
        key,
        value: data2[key],
      }),
    },
    {
      checker: (key) => has(data1, key) && !has(data2, key),
      process: (key) => ({
        type: 'REMOVED',
        key,
        value: data1[key],
      }),
    },
    {
      checker: (key) => has(data1, key) && has(data2, key) && data1[key] !== data2[key],
      process: (key) => ({
        type: 'CHANGED',
        key,
        prevValue: data1[key],
        value: data2[key],
      }),
    },
    {
      checker: (key) => has(data1, key) && has(data2, key) && data1[key] === data2[key],
      process: (key) => ({
        type: 'UNCHANGED',
        key,
        value: data1[key],
      }),
    },
  ];

  const result = union(keys(data1), keys(data2))
    .sort()
    .map((key) => {
      const { process } = find(diffs, ({ checker }) => checker(key));

      const node = process(key);

      return node;
    });

  return result;
};

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);

  const data1 = getParser(path.extname(path1).slice(1))(fs.readFileSync(path1, 'utf-8'));
  const data2 = getParser(path.extname(path2).slice(1))(fs.readFileSync(path2, 'utf-8'));

  const diff = getDiff(data1, data2);

  const result = getFormatter('stylish')(diff);

  return result;
};

export default genDiff;
