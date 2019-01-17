import { platform } from 'os';
import { join, dirname } from 'path';
import { promisify } from 'util';
import { rename, existsSync } from 'fs';

import { toAbsolute } from '@carnesen/bitcoin-config';
import download = require('download');
import rimraf = require('rimraf');
import mkdirp = require('mkdirp');

import { getSoftwareVersionDir } from './util';
import { DEFAULT_VERSION } from './constants';

type Options = Partial<{
  version: string;
  datadir: string;
}>;

export async function installBitcoinCore(options: Options = {}) {
  const { version = DEFAULT_VERSION, datadir } = options;
  const softwareVersionDir = getSoftwareVersionDir(version, datadir);
  if (!existsSync(softwareVersionDir)) {
    let fileNameSuffix: string;
    switch (platform()) {
      case 'darwin':
        fileNameSuffix = 'osx64.tar.gz';
        break;
      case 'win32':
        // Note: platform() returns "win32" even on 64-bit Windows
        fileNameSuffix = process.arch === 'x64' ? 'win64.zip' : 'win32.zip';
        break;
      case 'linux':
        fileNameSuffix = 'x86_64-linux-gnu.tar.gz';
      default:
        throw new Error(`Unsupported platform "${platform()}"`);
    }
    // Download the file to datadir instead of /tmp for example so that
    // we can be reasonably sure that downloadsDir is on the same disk
    // as softwareDir and therefore the rename below is atomic.
    const downloadsDir = toAbsolute('downloads', datadir);
    const url = `https://bitcoincore.org/bin/bitcoin-core-${version}/bitcoin-${version}-${fileNameSuffix}`;
    const extractedDir = join(downloadsDir, `bitcoin-${version}`);
    await promisify(rimraf)(extractedDir);
    await download(url, downloadsDir, {
      extract: true,
    });
    await promisify(mkdirp)(dirname(softwareVersionDir));
    await promisify(rename)(extractedDir, softwareVersionDir);
  }
}

export async function uninstallBitcoinCore(options: Options = {}) {
  const { version = DEFAULT_VERSION, datadir } = options;
  const softwareVersionDir = getSoftwareVersionDir(version, datadir);
  await promisify(rimraf)(softwareVersionDir);
}
