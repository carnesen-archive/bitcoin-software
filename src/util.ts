import { join } from 'path';

import { SOFTWARE_DIR } from './constants';

export function getSoftwareVersionDir(version: string) {
  return join(SOFTWARE_DIR, `bitcoin-${version}`);
}

export function getSoftwareName(version: string) {
  return `Bitcoin Core version ${version}`;
}
