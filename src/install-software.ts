import { join, dirname } from 'path';
import { promisify } from 'util';
import { rename, existsSync } from 'fs';

import download = require('download');
import rimraf = require('rimraf');
import mkdirp = require('mkdirp');

import { getUrl } from './get-url';
import { getTarballPrefix } from './get-tarball-prefix';
import { parseBitcoinHome } from './parse-bitcoin-home';

const rimrafAsync = promisify(rimraf);

export async function installSoftware(bitcoinHome: string) {
  const { implementation, version } = parseBitcoinHome(bitcoinHome);
  let changed = false;
  if (!existsSync(bitcoinHome)) {
    changed = true;
    const downloadDir = `${bitcoinHome}.download`;
    await rimrafAsync(downloadDir);
    const url = getUrl(implementation, version);
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
  };
}
