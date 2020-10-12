import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const cases = [
  [
    getFixturePath('flat1.json'),
    getFixturePath('flat2.json'),
    getFixturePath('flat-expected.txt'),
  ],
  [
    getFixturePath('flat1.yml'),
    getFixturePath('flat2.yml'),
    getFixturePath('flat-expected.txt'),
  ],
  [
    getFixturePath('flat1.ini'),
    getFixturePath('flat2.ini'),
    getFixturePath('flat-expected.txt'),
  ],
  [
    getFixturePath('nested1.json'),
    getFixturePath('nested2.json'),
    getFixturePath('nested-expected.txt'),
  ],
];

describe('Should compare files', () => {
  test.each(cases)(
    'Filepath1: %p, Filepath2: %p',
    (filepath1, filepath2, filepath3) => {
      const expected = readFile(filepath3);
      const actual = genDiff(filepath1, filepath2, 'stylish');

      expect(actual).toEqual(expected);
    },
  );
});
