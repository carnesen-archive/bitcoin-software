import { platform } from 'os';
import { join } from 'path';
import { spawn, SpawnOptions } from 'child_process';

import mkdirp = require('mkdirp');
import signalExit = require('signal-exit');

import {
  SectionedConfig,
  writeConfigFile,
  DEFAULT_CONFIG_FILE_NAME,
} from '@carnesen/bitcoin-config';
import { getSoftwareVersionDir } from './util';
import { DATA_DIR, DEFAULT_VERSION } from './constants';

type Options = Partial<{
  version: string;
  bitcoinConfig: SectionedConfig;
  spawnOptions: SpawnOptions;
}>;

export function spawnBitcoind(options: Options = {}) {
  const { version = DEFAULT_VERSION, bitcoinConfig = {}, spawnOptions = {} } = options;
  const softwareVersionDir = getSoftwareVersionDir(version);
  let binFilePath = join(softwareVersionDir, 'bin', 'bitcoind');
  if (platform() === 'win32') {
    binFilePath += '.exe';
  }
  mkdirp.sync(DATA_DIR);
  const configFilePath = join(DATA_DIR, DEFAULT_CONFIG_FILE_NAME);
  writeConfigFile(configFilePath, { daemon: false, datadir: DATA_DIR, ...bitcoinConfig });
  const spawned = spawn(binFilePath, [`-conf=${configFilePath}`], {
    stdio: 'ignore',
    ...spawnOptions,
  });

  signalExit(() => {
    spawned.kill();
  });

  return spawned;
}
