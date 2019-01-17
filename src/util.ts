import { join } from 'path';
import { toAbsolute } from '@carnesen/bitcoin-config';

export function getSoftwareVersionDir(version: string, datadir?: string) {
  return toAbsolute(join('software', `bitcoin-${version}`), datadir);
}

export function getSoftwareName(version: string) {
  return `Bitcoin Core version ${version}`;
}
