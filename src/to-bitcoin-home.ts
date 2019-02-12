import { join, isAbsolute } from 'path';
import { parseBitcoinHome } from './parse-bitcoin-home';

export function toBitcoinHome(options: ReturnType<typeof parseBitcoinHome>) {
  const { softwareDir, implementation, version } = options;
  if (!isAbsolute(softwareDir)) {
    throw new Error('Expected "softwareDir" to be an absolute path');
  }

  return join(softwareDir, `bitcoin-${implementation}-${version}`);
}
