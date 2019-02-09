import { join } from 'path';
import { toAbsolute } from '@carnesen/bitcoin-config';

import { Target } from './constants';

export function getBitcoinHome(target: Target) {
  const { destination, implementation, version } = target;
  return join(toAbsolute(destination), `bitcoin-${implementation}-${version}`);
}
