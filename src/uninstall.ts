import { promisify } from 'util';
import { existsSync } from 'fs';

import rimraf = require('rimraf');

import { getInstalledDir } from './get-installed-dir';
import { Target } from './constants';

export async function uninstall(target: Target) {
  const { version, implementation, destination } = target;
  const installedDir = getInstalledDir({ version, implementation, destination });
  let changed = false;
  if (existsSync(installedDir)) {
    changed = true;
    await promisify(rimraf)(installedDir);
  }
  return {
    changed,
    installedDir,
  };
}
