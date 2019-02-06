import { installSoftware } from '../install-software';
import nock = require('nock');
import { join, basename } from 'path';
import * as tempy from 'tempy';
import { readFileSync, readdirSync } from 'fs';
import { getBitcoinHome } from '../get-bitcoin-home';
import { uninstallSoftware } from '../uninstall-software';
import mkdirp = require('mkdirp');

describe(installSoftware.name, () => {
  it('downloads a tarball and extracts it to softwareVersionDir', async () => {
    const destination = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    nock('https://bitcoincore.org/')
      .get(/^\/bin\/bitcoin-core-1.2.3\/bitcoin-1.2.3-.*\.tar\.gz$/)
      .replyWithFile(200, join(__dirname, 'bitcoin-1.2.3.tar.gz'));
    await installSoftware({ implementation, version, destination });
    const targetDir = getBitcoinHome({ version, implementation, destination });
    const bitcoindContents = readFileSync(join(targetDir, 'bin', 'bitcoind'), {
      encoding: 'utf8',
    });
    expect(bitcoindContents).toBe('dummy bitcoind\n');
  });
});

describe(uninstallSoftware.name, () => {
  it('rimrafs version directory', async () => {
    const destination = tempy.directory();
    const implementation = 'core';
    const version = '1.2.3';
    const targetDir = getBitcoinHome({ version, implementation, destination });
    mkdirp.sync(targetDir);
    expect(readdirSync(destination)).toEqual([basename(targetDir)]);
    await uninstallSoftware({ version, implementation, destination });
    expect(readdirSync(destination)).toEqual([]);
  });
});
