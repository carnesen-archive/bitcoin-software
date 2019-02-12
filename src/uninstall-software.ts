import { promisify } from 'util';
import { existsSync } from 'fs';

import rimraf = require('rimraf');

export async function uninstallSoftware(bitcoinHome: string) {
  let changed = false;
  if (existsSync(bitcoinHome)) {
    changed = true;
    await promisify(rimraf)(bitcoinHome);
  }
  return {
    changed,
  };
}
