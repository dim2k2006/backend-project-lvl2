import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const cases = [
  [
    'before.json',
    'after.json',
    'expected-stylish.txt',
    'stylish',
  ],
  [
    'before.json',
    'after.json',
    'expected-plain.txt',
    'plain',
  ],
  [
    'before.json',
    'after.json',
    'expected-json.txt',
    'json',
  ],

  [
    'before.yml',
    'after.yml',
    'expected-stylish.txt',
    'stylish',
  ],
  [
    'before.yml',
    'after.yml',
    'expected-plain.txt',
    'plain',
  ],
  [
    'before.yml',
    'after.yml',
    'expected-json.txt',
    'json',
  ],

  [
    'before.ini',
    'after.ini',
    'expected-stylish.txt',
    'stylish',
  ],
  [
    'before.ini',
    'after.ini',
    'expected-plain.txt',
    'plain',
  ],
  [
    'before.ini',
    'after.ini',
    'expected-json.txt',
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
