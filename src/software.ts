import { platform } from 'os';
import { join, dirname } from 'path';
import { promisify } from 'util';
import { rename, existsSync } from 'fs';

import download = require('download');
import rimraf = require('rimraf');
import mkdirp = require('mkdirp');

import { getSoftwareVersionDir } from './util';
import { DOWNLOADS_DIR } from './constants';

export async function installBitcoinCore(version: string, p = platform()) {
  const softwareVersionDir = getSoftwareVersionDir(version);
  let alreadyInstalled = true;
  if (existsSync(softwareVersionDir)) {
    return alreadyInstalled;
  }
  alreadyInstalled = false;
  let fileNameSuffix: string;
  switch (p) {
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
      throw new Error(`Unsupported platform "${p}"`);
  }
  const url = `https://bitcoincore.org/bin/bitcoin-core-${version}/bitcoin-${version}-${fileNameSuffix}`;
  const extractedDir = join(DOWNLOADS_DIR, `bitcoin-${version}`);
  await promisify(rimraf)(extractedDir);
  await download(url, DOWNLOADS_DIR, {
    extract: true,
  });
  await promisify(mkdirp)(dirname(softwareVersionDir));
  await promisify(rename)(extractedDir, softwareVersionDir);
  return alreadyInstalled;
}

export async function uninstallBitcoinCore(version: string) {
  const softwareVersionDir = getSoftwareVersionDir(version);
  let alreadyUninstalled = true;
  if (!existsSync(softwareVersionDir)) {
    return alreadyUninstalled;
  }
  alreadyUninstalled = false;
  await promisify(rimraf)(softwareVersionDir);
  return alreadyUninstalled;
}
