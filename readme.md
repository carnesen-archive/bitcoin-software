# @carnesen/bitcoin-software [![Build Status](https://travis-ci.com/carnesen/bitcoin-software.svg?branch=master)](https://travis-ci.com/carnesen/bitcoin-software)

Node.js utilities for installing bitcoin server software

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
  destination: '/usr/local',
});
// Now bitcoind can be found in /usr/local/bitcoin-core-0.17.1/bin
```

## API

### install({implementation, version, destination}): Promise<{changed, dir}>
Installs bitcoin server software to the specified destination

#### implementation
`string`. Supported implementations are:
- `'core'`: Download from [https://bitcoincore.org/bin/](https://bitcoincore.org/bin/)
- `'abc'`: Download from [https://download.bitcoinabc.org/](https://download.bitcoinabc.org/)

#### version
`string`. Version of the software, e.g. `'0.17.1'`

#### destination
`string`. An absolute path of an existing directory under which the software will be installed. 

#### changed
`boolean`. `install` is [idempotent](https://en.wikipedia.org/wiki/Idempotence) in the sense that it does not modify an existing installation if there is one, nor does it throw. If the function finds the software already installed, it returns `changed = false`. If it actually downloads and extracts the tarball to `destination`, it returns `changed = true`.

#### dir
`string`. Absolute directory path to which the software is installed. Effectively:
```ts
dir = `${destination}/bitcoin-${implementation}-${version}` 
```

### uninstall({implementation, version, destination}): Promise<{changed, dir}>
Uninstalls bitcoin server software from the specified destination. Parameters and return values are the same as described above for `install`.

## More information
This library has a number of unit tests with ~100% coverage. Check out [the tests directory](src/__tests__) for more examples of how it works. If you encounter any bugs or have any questions or feature requests, please don't hesitate to [file an issue](https://github.com/carnesen/bitcoin-software/issues/new) or [submit a pull request](https://github.com/carnesen/bitcoin-software/compare) on [this project's repository on GitHub](https://github.com/carnesen/bitcoin-software).

## Related
- [@carnesen/bitcoin-core-cli](https://github.com/carnesen/bitcoin-core-cli): A Node.js command-line interface (CLI) for installing and launching Bitcoin Core

- [@carnesen/bitcoin-abc-cli](https://github.com/carnesen/bitcoin-abc-cli): A Node.js command-line interface (CLI) for installing and launching Bitcoin ABC

- [@carnesen/bitcoin-config](https://github.com/carnesen/bitcoin-config): Node.js constants, utilities, and TypeScript types for bitcoin server software configuration

- [@carnesen/spawn-bitcoind](https://github.com/carnesen/spawn-bitcoind): A Node.js utility for launching bitcoin server software

- [@carnesen/bitcoin-rpc](https://github.com/carnesen/bitcoin-rpc): A Node.js client for bitcoin's remote procedure call (RPC) interface

- [@carnesen/bitcoin-rpc-cli](https://github.com/carnesen/bitcoin-rpc): A Node.js command-line client for bitcoin's remote procedure call (RPC) interface
