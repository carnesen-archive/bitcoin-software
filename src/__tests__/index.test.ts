import { install } from '../install';
import nock = require('nock');
import { join, basename } from 'path';
import * as tempy from 'tempy';
import { readFileSync, readdirSync } from 'fs';
import { getInstalledDir } from '../get-installed-dir';
import { uninstall } from '../uninstall';
import mkdirp = require('mkdirp');

describe(install.name, () => {
  it('downloads a tarball and extracts it to softwareVersionDir', async () => {
    const destination = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    nock('https://bitcoincore.org/')
      .get(/^\/bin\/bitcoin-core-1.2.3\/bitcoin-1.2.3-.*\.tar\.gz$/)
      .replyWithFile(200, join(__dirname, 'bitcoin-1.2.3.tar.gz'));
    await install({ implementation, version, destination });
    const targetDir = getInstalledDir({ version, implementation, destination });
    const bitcoindContents = readFileSync(join(targetDir, 'bin', 'bitcoind'), {
      encoding: 'utf8',
    });
    expect(bitcoindContents).toBe('dummy bitcoind\n');
  });
});

describe(uninstall.name, () => {
  it('rimrafs version directory', async () => {
    const destination = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    const targetDir = getInstalledDir({ version, implementation, destination });
    mkdirp.sync(targetDir);
    expect(readdirSync(destination)).toEqual([basename(targetDir)]);
    await uninstall({ version, implementation, destination });
    expect(readdirSync(destination)).toEqual([]);
  });
});
