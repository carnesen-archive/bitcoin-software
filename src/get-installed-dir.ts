import { join, isAbsolute } from 'path';
import { Implementation } from './constants';

export function getInstalledDir(namedArgs: {
  version: string;
  implementation: Implementation;
  destination: string;
}) {
  if (!isAbsolute(namedArgs.destination)) {
    throw new Error('Expected "destination" to be an absolute path');
  }
  return join(
    namedArgs.destination,
    `bitcoin-${namedArgs.implementation}-${namedArgs.version}`,
  );
}
