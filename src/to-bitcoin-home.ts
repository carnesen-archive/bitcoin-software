import { join, isAbsolute } from 'path';
import { parseBitcoinHome } from './parse-bitcoin-home';

export function toBitcoinHome(options: ReturnType<typeof parseBitcoinHome>) {
  const { destination, implementation, version } = options;
  if (!isAbsolute(destination)) {
    throw new Error('Expected "destination" to be an absolute path');
  }

  return join(destination, `bitcoin-${implementation}-${version}`);
}
