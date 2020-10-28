import path from 'path';
import fs from 'fs';
import keys from 'lodash/keys.js';
import union from 'lodash/union.js';
import has from 'lodash/has.js';
import isPlainObject from 'lodash/isPlainObject.js';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';

const getDiff = (data1, data2) => {
  const result = union(keys(data1), keys(data2))
    .sort()
    .map((key) => {
      if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
        return {
          type: 'NESTED',
          key,
          value: getDiff(data1[key], data2[key]),
        };
      }

      if (!has(data1, key)) {
        return {
          type: 'ADDED',
          key,
          value: data2[key],
        };
      }

      if (has(data1, key) && !has(data2, key)) {
        return {
          type: 'REMOVED',
          key,
          value: data1[key],
        };
      }

      if (has(data1, key) && has(data2, key) && data1[key] !== data2[key]) {
        return {
          type: 'CHANGED',
          key,
          prevValue: data1[key],
          value: data2[key],
        };
      }

      return {
        type: 'UNCHANGED',
        key,
        value: data1[key],
      };
    });

  return result;
};

const genDiff = (filepath1, filepath2, format) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  const data1 = getParser(path.extname(path1).slice(1))(fs.readFileSync(path1, 'utf-8'));
  const data2 = getParser(path.extname(path2).slice(1))(fs.readFileSync(path2, 'utf-8'));

  const diff = getDiff(data1, data2);

  const result = getFormatter(format)(diff);

  return result;
};

export default genDiff;
