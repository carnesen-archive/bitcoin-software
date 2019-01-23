# @carnesen/bitcoin-software

Node.js utilities for downloading bitcoin server software

## Install
```
$ npm install @carnesen/bitcoin-software
```
The package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

```ts
import { install } from '@carnesen/bitcoin-software';

install({
  implementation: 'core',
  version: '0.17.1',
  softwareDir: '/usr/local',
});
// Now bitcoind can be found in /usr/local/bitcoin-core-0.17.1/bin
```

## API
### install({version, implementation, softwareDir})
Async function that installs bitcoin server software to the specified directory
#### version
Version string of the software, e.g. `0.17.1`
#### implementation
Name string for the software. Supported implementations are:
- `'core'`: Download from [https://bitcoincore.org/bin/](https://bitcoincore.org/bin/)
- `'abc'`: Download from [https://download.bitcoinabc.org/](https://download.bitcoinabc.org/)
#### softwareDir
(Optional) A relative or absolute path. Defaults to `'software'`. Relative paths are relative to the default bitcoin data directory. For example on Linux, Bitcoin Core 0.17.1 would be installed to "~/.bitcoin/software/bitcoin-core-0.17.1"
### uninstall({version, implementation, softwareDir})

## More information
This library has a number of unit tests with ~100% coverage. Check out [the tests directory](src/__tests__) for more examples of how it works. If you encounter any bugs or have any questions or feature requests, please don't hesitate to [file an issue](https://github.com/carnesen/bitcoin-software/issues/new) or [submit a pull request](https://github.com/carnesen/bitcoin-software/compare) on [this project's repository on GitHub](https://github.com/carnesen/bitcoin-software).

## Related
- [@carnesen/bitcoin-config](https://github.com/carnesen/bitcoin-config): Node.js constants, utilities, and TypeScript types for bitcoin server software configuration

- [@carnesen/bitcoin-software](https://github.com/carnesen/bitcoin-core): Node.js utilities for installing bitcoin server software

- [@carnesen/spawn-bitcoind](https://github.com/carnesen/spawn-bitcoind): A Node.js utility for launching bitcoin server software

- [@carnesen/bitcoin-rpc](https://github.com/carnesen/bitcoin-rpc): A Node.js client for bitcoin's remote procedure call (RPC) interface

- [@carnesen/bitcoin-rpc-cli](https://github.com/carnesen/bitcoin-rpc): A Node.js command-line client for bitcoin's remote procedure call (RPC) interface
