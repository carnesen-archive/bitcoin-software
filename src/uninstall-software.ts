import { promisify } from 'util';
import { existsSync } from 'fs';

import rimraf = require('rimraf');

import { getBitcoinHome } from './get-bitcoin-home';
import { PartialTarget } from './constants';
import { getTarget } from './get-target';

export async function uninstallSoftware(partialTarget: PartialTarget = {}) {
  const target = getTarget(partialTarget);
  const bitcoinHome = getBitcoinHome(target);
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
