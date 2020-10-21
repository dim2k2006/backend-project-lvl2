import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const cases = [
  [
    'flat1.json',
    'flat2.json',
    'flat-expected.txt',
    'stylish',
  ],
  [
    'flat1.yml',
    'flat2.yml',
    'flat-expected.txt',
    'stylish',
  ],
  [
    'flat1.ini',
    'flat2.ini',
    'flat-expected.txt',
    'stylish',
  ],
  [
    'nested1.json',
    'nested2.json',
    'nested-expected.txt',
    'stylish',
  ],
  [
    'nested1.json',
    'nested2.json',
    'nested-plain-expected.txt',
    'plain',
  ],
  [
    'nested1.json',
    'nested2.json',
    'nested-json-expected.txt',
    'json',
  ],
];

describe('Should compare files', () => {
  test.each(cases)(
    'Filepath1: %p, Filepath2: %p, Expectedpath: %p, Format: %p',
    (filename1, filename2, filename3, format) => {
      const filepath1 = getFixturePath(filename1);
      const filepath2 = getFixturePath(filename2);
      const filepath3 = getFixturePath(filename3);

      const expected = readFile(filepath3);
      const actual = genDiff(filepath1, filepath2, format);

      expect(actual).toEqual(expected);
    },
  );
});
