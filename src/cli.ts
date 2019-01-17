import { cli, option, leaf, branch } from '@carnesen/cli';
import { BITCOIN_CONFIG_OPTIONS } from '@carnesen/bitcoin-config';
import { DEFAULT_VERSION } from './constants';
import { uninstallBitcoinCore, installBitcoinCore } from './software';
import { startBitcoind } from './spawn';
import { getSoftwareName } from './util';

const versionOptions = {
  version: option({
    typeName: 'string',
    description: 'Version string',
    defaultValue: DEFAULT_VERSION,
  }),
};
const datadirOptions = {
  datadir: option(BITCOIN_CONFIG_OPTIONS.datadir),
};

export const rootCommand = branch({
  commandName: 'bitcoin-core',
  description: `A command-line interface (CLI) for Bitcoin Core`,
  subcommands: [
    leaf({
      commandName: 'install',
      options: { ...versionOptions, ...datadirOptions },
      async action({ version, datadir }) {
        await installBitcoinCore({ version, datadir });
        const softwareName = getSoftwareName(version);
        return `${softwareName} is installed!`;
      },
    }),
    leaf({
      commandName: 'uninstall',
      options: { ...versionOptions, ...datadirOptions },
      async action({ version, datadir }) {
        await uninstallBitcoinCore({ version, datadir });
        return `${getSoftwareName(version)} is uninstalled!`;
      },
    }),
    leaf({
      commandName: 'start',
      options: {
        ...versionOptions,
        ...datadirOptions,
        daemon: option(BITCOIN_CONFIG_OPTIONS.daemon),
        regtest: option(BITCOIN_CONFIG_OPTIONS.regtest),
        testnet: option(BITCOIN_CONFIG_OPTIONS.testnet),
        config: option({
          typeName: 'json',
          description: 'Additional bitcoin configuration options',
          defaultValue: {},
        }),
      },
      async action({ version, config, ...rest }) {
        await startBitcoind({
          version,
          bitcoinConfig: { ...config, ...rest },
        });
      },
    }),
  ],
});

if (module === require.main) {
  cli(rootCommand);
}
