# @carnesen/bitcoin-software [![Build Status](https://travis-ci.com/carnesen/bitcoin-software.svg?branch=master)](https://travis-ci.com/carnesen/bitcoin-software)

Node.js utilities for installing bitcoin server software

## Install
```
$ npm install @carnesen/bitcoin-software
```
The package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

Here is an example of a JavaScript script that installs Bitcoin Core:

```js
// example.js
const { install } = require('@carnesen/bitcoin-software');
const runAndExit = require('@carnesen/run-and-exit');
const { homedir } = require('os');

runAndExit(async () => {
  console.log('Installing Bitcoin Core ...')
  const { changed, dir } = await install({
    implementation: 'core',
    version: '0.17.1',
    destination: homedir(),
  });
  const message = changed 
    ? `Installed Bitcoin Core to ${dir}`
    : `Bitcoin Core is already installed at ${dir}`;
  console.log(message);
});
```

Here is the console output when that script is executed:
```
$ node example.js
Installing Bitcoin Core ...
Installed Bitcoin Core to /Users/carnesen/bitcoin-core-0.17.1

$ node example.js
Installing Bitcoin Core ...
Bitcoin Core is already installed at /Users/carnesen/bitcoin-core-0.17.1
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
`string`. An absolute path of an existing directory below which the software will be installed. 

#### changed
`boolean`. `install` is [idempotent](https://en.wikipedia.org/wiki/Idempotence) in the sense that it does not modify an existing installation if there is one, nor does it throw. If `install` actually downloads and extracts the tarball to `destination`, it returns an object with `changed` set to `true`. If `install` finds the software already installed, it returns an object with `changed` set to `false`. This feature was inspired by [Ansible](https://docs.ansible.com/ansible/latest/reference_appendices/common_return_values.html).

#### dir
`string`. Absolute directory path at which the software is installed. Effectively:
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
