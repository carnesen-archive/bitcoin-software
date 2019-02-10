import { promisify } from 'util';
import { existsSync } from 'fs';

import rimraf = require('rimraf');

import { getBitcoinHome } from './get-bitcoin-home';
import { Target } from './constants';
import { withDefaults } from './with-defaults';

export async function uninstallSoftware(target: Target = {}) {
  const targetWithDefaults = withDefaults(target);
  const bitcoinHome = getBitcoinHome(targetWithDefaults);
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
