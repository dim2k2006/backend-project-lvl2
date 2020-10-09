import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const fixturesPath = path.join('.', '__fixtures__');

const cases = [
  [
    path.join(fixturesPath, 'flat1.json'),
    path.join(fixturesPath, 'flat2.json'),
    fs.readFileSync(path.join(fixturesPath, 'flat-expected.txt'), 'utf-8'),
  ],
  [
    path.join(fixturesPath, 'flat1.yml'),
    path.join(fixturesPath, 'flat2.yml'),
    fs.readFileSync(path.join(fixturesPath, 'flat-expected.txt'), 'utf-8'),
  ],
];

describe('Should compare files', () => {
  test.each(cases)(
    'Filepath1: %p, Filepath2: %p',
    (filepath1, filepath2, expected) => {
      expect(genDiff(filepath1, filepath2)).toEqual(expected);
    },
  );
});
