import { platform } from 'os';
import { join, dirname } from 'path';
import { spawn } from 'child_process';

import mkdirp = require('mkdirp');
import signalExit = require('signal-exit');

import CodedError = require('@carnesen/coded-error');

import {
  SectionedConfig,
  writeConfigFile,
  DEFAULT_CONFIG_FILE_NAME,
  toAbsolute,
} from '@carnesen/bitcoin-config';
import { getSoftwareVersionDir, getSoftwareName } from './util';
import { DEFAULT_VERSION } from './constants';
import { UsageError } from '@carnesen/cli';

type Options = Partial<{
  version: string;
  bitcoinConfig: SectionedConfig;
}>;

export function startBitcoind(options: Options = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const { version = DEFAULT_VERSION, bitcoinConfig = {} } = options;
    const { daemon } = bitcoinConfig;
    const softwareVersionDir = getSoftwareVersionDir(version, bitcoinConfig.datadir);
    let binFilePath = join(softwareVersionDir, 'bin', 'bitcoind');
    if (platform() === 'win32') {
      binFilePath += '.exe';
    }
    const confFilePath = toAbsolute(DEFAULT_CONFIG_FILE_NAME, bitcoinConfig.datadir);
    mkdirp.sync(dirname(confFilePath));
    writeConfigFile(confFilePath, bitcoinConfig);
    const spawned = spawn(binFilePath, [`-conf=${confFilePath}`], {
      stdio: 'inherit',
    });

    if (!daemon) {
      // Kill child when parent exits
      signalExit(() => {
        spawned.kill();
      });
    }

    spawned.on('error', err => {
      if ((err as CodedError).code === 'ENOENT') {
        reject(
          new UsageError(
            `${err.message}: Did you install ${getSoftwareName(
              version,
            )}? Try a different --datadir?`,
          ),
        );
      } else {
        reject(err);
      }
    });

    spawned.on('exit', code => {
      if (daemon) {
        if (code === 0) {
          resolve();
        } else {
          // Assume bitcoind has printed an error message
          reject('');
        }
      }
    });
  });
}
