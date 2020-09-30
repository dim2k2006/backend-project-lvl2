import { fileURLToPath } from 'url';
import path, { dirname as dir } from 'path';

const genDiff = (filepath1, filepath2) => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = dir(filename);

  const path1 = path.resolve(dirname, filepath1);
  const path2 = path.resolve(dirname, filepath2);


};

export default genDiff;
