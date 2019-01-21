import { join } from 'path';
import { toAbsolute } from '@carnesen/bitcoin-config';
import { Implementation } from './constants';

export function getDir(namedArgs: {
  version: string;
  implementation: Implementation;
  softwareDir: string;
}) {
  return join(
    toAbsolute(namedArgs.softwareDir),
    `bitcoin-${namedArgs.implementation}-${namedArgs.version}`,
  );
}
