import { cli, option, command } from '@carnesen/cli';
import { BITCOIN_CONFIG_OPTIONS } from '@carnesen/bitcoin-config';

import { installBitcoinCore, uninstallBitcoinCore } from './software';
import { spawnBitcoind } from './spawn';
import { DEFAULT_VERSION } from './constants';
import { getSoftwareName } from './util';
const pkg = require('../package.json');

const versionOptions = {
  version: option({
    typeName: 'string',
    description: 'Version string',
    defaultValue: DEFAULT_VERSION,
  }),
};

const { regtest, testnet } = BITCOIN_CONFIG_OPTIONS;

const rootCommand = command({
  commandName: 'bitcoin-core',
  description: `A command-line interface for ${pkg.name}`,
  subcommands: [
    command({
      commandName: 'install',
      options: { ...versionOptions },
      async action({ version }) {
        const alreadyInstalled = await installBitcoinCore(version);
        const softwareName = getSoftwareName(version);
        const message = alreadyInstalled
          ? `Found ${softwareName} already installed`
          : `Installed ${softwareName}!`;
        return message;
      },
    }),
    command({
      commandName: 'uninstall',
      options: versionOptions,
      async action({ version }) {
        const alreadyUninstalled = await uninstallBitcoinCore(version);
        const softwareName = getSoftwareName(version);
        const message = alreadyUninstalled
          ? `Found ${softwareName} already uninstalled`
          : `Uninstalled ${softwareName}!`;
        return message;
      },
    }),
    command({
      commandName: 'spawn',
      options: {
        ...versionOptions,
        regtest,
        testnet,
      },
      async action({ version, ...bitcoinConfig }) {
        await new Promise((_, reject) => {
          const spawned = spawnBitcoind({
            version,
            bitcoinConfig,
            spawnOptions: {
              stdio: 'inherit',
            },
          });
          spawned.on('exit', (code, signal) => {
            reject(`Process exited with code=${code}, signal=${signal}`);
          });
          spawned.on('error', err => {
            reject(err);
          });
        });
      },
    }),
  ],
});

if (module === require.main) {
  cli(rootCommand);
}
