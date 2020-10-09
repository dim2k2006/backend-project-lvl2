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
];

describe('Should compare files', () => {
  test.each(cases)(
    'Filepath1: %p, Filepath2: %p',
    (filepath1, filepath2, filepath3) => {
      const expected = readFile(filepath3);

      expect(genDiff(filepath1, filepath2)).toEqual(expected);
    },
  );
});
