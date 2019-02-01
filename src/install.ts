import { join, dirname } from 'path';
import { promisify } from 'util';
import { rename, existsSync } from 'fs';

import download = require('download');
import rimraf = require('rimraf');
import mkdirp = require('mkdirp');

import { getBitcoinHome } from './get-bitcoin-home';
import { Target } from './constants';
import { getUrl } from './get-url';
import { getTarballPrefix } from './get-tarball-prefix';

const rimrafAsync = promisify(rimraf);

export async function install(target: Target) {
  const { implementation, version, destination } = target;
  const bitcoinHome = getBitcoinHome({ version, implementation, destination });
  if (!existsSync(destination)) {
    throw new Error(`Expected "destination" to be an existing directory`);
  }
  let changed = false;
  if (!existsSync(bitcoinHome)) {
    changed = true;
    const downloadDir = `${bitcoinHome}.download`;
    await rimrafAsync(downloadDir);
    const url = getUrl({ version, implementation });
    try {
      await download(url, downloadDir, {
        extract: true,
      });
      const tarballPrefix = getTarballPrefix(implementation);
      const extractedDir = join(downloadDir, `${tarballPrefix}-${version}`);
      await promisify(mkdirp)(dirname(bitcoinHome));
      await promisify(rename)(extractedDir, bitcoinHome);
    } finally {
      await rimrafAsync(downloadDir);
    }
  }
  return {
    changed,
    bitcoinHome,
  };
}
