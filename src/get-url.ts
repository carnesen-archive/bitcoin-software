import { platform } from 'os';

import { Implementation } from './constants';

type NamedArgs = {
  version: string;
  implementation: Implementation;
  nodejsPlatform?: NodeJS.Platform;
};

export function getUrl(namedArgs: NamedArgs) {
  const { version, implementation, nodejsPlatform = platform() } = namedArgs;
  let baseUrl: string;
  let osSeparator: string;
  let fileNameBase: string;
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
      fileNameBase = 'bitcoin';
      osSeparator = '';
      break;
    case 'abc':
      baseUrl = 'https://download.bitcoinabc.org/';
      fileNameBase = 'bitcoin-abc';
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
  return `${baseUrl}${version}/${osSeparator!}${fileNameBase}-${version}-${fileNameSuffix!}`;
}
