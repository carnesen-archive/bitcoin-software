import { join } from 'path';
import { toAbsolute } from '@carnesen/bitcoin-config';

import { Target } from './constants';
import { withDefaults } from './with-defaults';

export function getBitcoinHome(target: Target) {
  const { destination, implementation, version, datadir } = withDefaults(target);
  return join(toAbsolute(destination, datadir), `bitcoin-${implementation}-${version}`);
}
