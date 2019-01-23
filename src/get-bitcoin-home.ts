import { join, isAbsolute } from 'path';
import { Target } from './constants';

export function getBitcoinHome(target: Target) {
  if (!isAbsolute(target.destination)) {
    throw new Error('Expected "destination" to be an absolute path');
  }
  return join(target.destination, `bitcoin-${target.implementation}-${target.version}`);
}
