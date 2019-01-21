import { promisify } from 'util';

import rimraf = require('rimraf');

import { getDir } from './get-dir';
import { Implementation, DEFAULT_SOFTWARE_DIR } from './constants';

type NamedArgs = {
  version: string;
  implementation: Implementation;
  softwareDir?: string;
};

export async function uninstall(namedArgs: NamedArgs) {
  const { version, implementation, softwareDir = DEFAULT_SOFTWARE_DIR } = namedArgs;
  const dir = getDir({ version, implementation, softwareDir });
  await promisify(rimraf)(dir);
}
