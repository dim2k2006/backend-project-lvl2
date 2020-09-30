import { fileURLToPath } from 'url';
import path, { dirname as dir } from 'path';
import fs from 'fs';
import genDiff from '../src';

const filename = fileURLToPath(import.meta.url);
const dirname = dir(filename);

const fixturesPath = path.join(dirname, '..', '__fixtures__');

const cases = [
  ['./__fixtures/flat1.json', './__fixtures/flat1.json', fs.readFileSync(path.resolve(dirname, fixturesPath, 'flat-expected.txt'), 'utf-8')],
];

describe('Should compare files', () => {
  test.each(cases)(
    'Filepath1: %p, Filepath2: %p, Expected: %p',
    (filepath1, filepath2, expected) => {
      expect(genDiff(filepath1, filepath2)).toEqual(expected);
    },
  );
});
