import { promisify } from 'util';
import { existsSync } from 'fs';

import rimraf = require('rimraf');

import { getBitcoinHome } from './get-bitcoin-home';
import { Target } from './constants';

export async function uninstall(target: Target) {
  const { version, implementation, destination } = target;
  const bitcoinHome = getBitcoinHome({ version, implementation, destination });
  let changed = false;
  if (existsSync(bitcoinHome)) {
    changed = true;
    await promisify(rimraf)(bitcoinHome);
  }
  return {
    changed,
    bitcoinHome,
  };
}
