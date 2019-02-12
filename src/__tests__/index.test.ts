import { installSoftware } from '../install-software';
import nock = require('nock');
import { join, basename } from 'path';
import * as tempy from 'tempy';
import { readFileSync, readdirSync } from 'fs';
import { toBitcoinHome } from '../to-bitcoin-home';
import { uninstallSoftware } from '../uninstall-software';
import mkdirp = require('mkdirp');

describe(installSoftware.name, () => {
  it('downloads a tarball and extracts it to softwareVersionDir', async () => {
    const softwareDir = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    nock('https://bitcoincore.org/')
      .get(/^\/bin\/bitcoin-core-1.2.3\/bitcoin-1.2.3-.*\.tar\.gz$/)
      .replyWithFile(200, join(__dirname, 'bitcoin-1.2.3.tar.gz'));
    const bitcoinHome = toBitcoinHome({ softwareDir, version, implementation });
    await installSoftware(bitcoinHome);
    const bitcoindContents = readFileSync(join(bitcoinHome, 'bin', 'bitcoind'), {
      encoding: 'utf8',
    });
    expect(bitcoindContents).toBe('dummy bitcoind\n');
  });
});

describe(uninstallSoftware.name, () => {
  it('rimrafs version directory', async () => {
    const softwareDir = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    const bitcoinHome = toBitcoinHome({ softwareDir, version, implementation });
    mkdirp.sync(bitcoinHome);
    expect(readdirSync(softwareDir)).toEqual([basename(bitcoinHome)]);
    await uninstallSoftware(bitcoinHome);
    expect(readdirSync(softwareDir)).toEqual([]);
  });
});
