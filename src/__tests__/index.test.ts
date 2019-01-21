import { install } from '../install';
import nock = require('nock');
import { join, basename } from 'path';
import * as tempy from 'tempy';
import { readFileSync, readdirSync } from 'fs';
import { getDir } from '../get-dir';
import { uninstall } from '../uninstall';
import mkdirp = require('mkdirp');

describe(install.name, () => {
  it('downloads a tarball and extracts it to softwareVersionDir', async () => {
    const softwareDir = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    nock('https://bitcoincore.org/')
      .get(/^\/bin\/bitcoin-core-1.2.3\/bitcoin-1.2.3-.*\.tar\.gz$/)
      .replyWithFile(200, join(__dirname, 'bitcoin-1.2.3.tar.gz'));
    await install({ implementation, version, softwareDir });
    const versionDir = getDir({ version, implementation, softwareDir });
    const bitcoindContents = readFileSync(join(versionDir, 'bin', 'bitcoind'), {
      encoding: 'utf8',
    });
    expect(bitcoindContents).toBe('dummy bitcoind\n');
  });
});

describe(uninstall.name, () => {
  it('rimrafs version directory', async () => {
    const softwareDir = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    const versionDir = getDir({ version, implementation, softwareDir });
    mkdirp.sync(versionDir);
    expect(readdirSync(softwareDir)).toEqual([basename(versionDir)]);
    await uninstall({ version, implementation, softwareDir });
    expect(readdirSync(softwareDir)).toEqual([]);
  });
});
