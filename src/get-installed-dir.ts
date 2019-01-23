import { join } from 'path';
import { Implementation } from './constants';

export function getInstalledDir(namedArgs: {
  version: string;
  implementation: Implementation;
  destination: string;
}) {
  return join(
    namedArgs.destination,
    `bitcoin-${namedArgs.implementation}-${namedArgs.version}`,
  );
}
