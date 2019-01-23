import { join, dirname } from 'path';
import { promisify } from 'util';
import { rename, existsSync } from 'fs';

import download = require('download');
import rimraf = require('rimraf');
import mkdirp = require('mkdirp');

import { getInstalledDir } from './get-installed-dir';
import { Target } from './constants';
import { getUrl } from './get-url';
import { getTarballPrefix } from './get-tarball-prefix';

const rimrafAsync = promisify(rimraf);

export async function install(target: Target) {
  const { implementation, version, destination } = target;
  const dir = getInstalledDir({ version, implementation, destination });
  let changed = false;
  if (!existsSync(dir)) {
    changed = true;
    const downloadDir = `${dir}.download`;
    await rimrafAsync(downloadDir);
    const url = getUrl({ version, implementation });
    try {
      await download(url, downloadDir, {
        extract: true,
      });
      const tarballPrefix = getTarballPrefix(implementation);
      const extractedDir = join(downloadDir, `${tarballPrefix}-${version}`);
      await promisify(mkdirp)(dirname(dir));
      await promisify(rename)(extractedDir, dir);
    } finally {
      await rimrafAsync(downloadDir);
    }
  }
  return {
    changed,
    dir,
  };
}
