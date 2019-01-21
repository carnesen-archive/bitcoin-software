import { join, dirname } from 'path';
import { promisify } from 'util';
import { rename, existsSync } from 'fs';

import download = require('download');
import rimraf = require('rimraf');
import mkdirp = require('mkdirp');

import { getDir } from './get-dir';
import { Implementation, DEFAULT_SOFTWARE_DIR } from './constants';
import { getUrl } from './get-url';

type NamedArgs = {
  version: string;
  implementation: Implementation;
  softwareDir?: string;
};

export async function install(namedArgs: NamedArgs) {
  const { implementation, version, softwareDir = DEFAULT_SOFTWARE_DIR } = namedArgs;
  const dir = getDir({ version, implementation, softwareDir });
  if (!existsSync(dir)) {
    // Download the file to softwareDir instead of /tmp for example so that
    // we can be reasonably sure that downloadsDir is on the same disk
    // as softwareDir and therefore the rename below is atomic.
    const downloadsDir = join(dirname(dir), 'downloads');
    const url = getUrl({ version, implementation });
    const extractedDir = join(downloadsDir, `bitcoin-${version}`);
    await promisify(rimraf)(extractedDir);
    await download(url, downloadsDir, {
      extract: true,
    });
    await promisify(mkdirp)(dirname(dir));
    await promisify(rename)(extractedDir, dir);
  }
}
