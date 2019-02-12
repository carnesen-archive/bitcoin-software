import { platform } from 'os';

import { Implementation } from './constants';
import { getTarballPrefix } from './get-tarball-prefix';

export function getUrl(
  implementation: Implementation,
  version: string,
  nodejsPlatform: NodeJS.Platform = platform(),
) {
  let baseUrl: string;
  let osSeparator: string;
  switch (nodejsPlatform) {
    case 'darwin':
    case 'linux':
      break;
    default:
      throw new Error(`Platform "${nodejsPlatform}" is not yet supported`);
  }
  switch (implementation) {
    case 'core':
      baseUrl = 'https://bitcoincore.org/bin/bitcoin-core-';
      osSeparator = '';
      break;
    case 'abc':
      baseUrl = 'https://download.bitcoinabc.org/';
      switch (nodejsPlatform) {
        case 'darwin':
          osSeparator = 'osx/';
          break;
        case 'linux':
          osSeparator = 'linux/';
          break;
      }
      break;
    default:
      throw new Error(`Unexpected implementation "${implementation}"`);
  }

  let fileNameSuffix: string;
  switch (nodejsPlatform) {
    case 'darwin':
      fileNameSuffix = 'osx64.tar.gz';
      break;
    case 'linux':
      fileNameSuffix = 'x86_64-linux-gnu.tar.gz';
      break;
  }
  const tarballPrefix = getTarballPrefix(implementation);
  return `${baseUrl}${version}/${osSeparator!}${tarballPrefix}-${version}-${fileNameSuffix!}`;
}
