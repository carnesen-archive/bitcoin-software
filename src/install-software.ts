import { join, dirname } from 'path';
import { promisify } from 'util';
import { rename, existsSync } from 'fs';

import download = require('download');
import rimraf = require('rimraf');
import mkdirp = require('mkdirp');

import { getBitcoinHome } from './get-bitcoin-home';
import { getUrl } from './get-url';
import { getTarballPrefix } from './get-tarball-prefix';
import { getTarget } from './get-target';
import { PartialTarget } from './constants';

const rimrafAsync = promisify(rimraf);

export async function installSoftware(partialTarget: PartialTarget = {}) {
  const target = getTarget(partialTarget);
  const bitcoinHome = getBitcoinHome(target);
  let changed = false;
  if (!existsSync(bitcoinHome)) {
    changed = true;
    const downloadDir = `${bitcoinHome}.download`;
    await rimrafAsync(downloadDir);
    const url = getUrl(target);
    try {
      await download(url, downloadDir, {
        extract: true,
      });
      const tarballPrefix = getTarballPrefix(target.implementation);
      const extractedDir = join(downloadDir, `${tarballPrefix}-${target.version}`);
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
