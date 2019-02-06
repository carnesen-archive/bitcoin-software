# @carnesen/bitcoin-software [![Build Status](https://travis-ci.com/carnesen/bitcoin-software.svg?branch=master)](https://travis-ci.com/carnesen/bitcoin-software)

A Node.js library for installing bitcoin server software

## Install
```
$ npm install @carnesen/bitcoin-software
```
The package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

Here is an example of a script that installs Bitcoin Core:

```ts
// example.ts
const { installSoftware } = require('@carnesen/bitcoin-software');
const { homedir } = require('os');

(async () => {
  console.log('Installing Bitcoin Core ...');
  const { changed, bitcoinHome } = await installSoftware({
    implementation: 'core',
    version: '0.17.1',
    destination: homedir(),
  });
  const message = changed
    ? `Installed Bitcoin Core to ${bitcoinHome}`
    : `Bitcoin Core is already installed at ${bitcoinHome}`;
  console.log(message);
})();
```

Here what that script looks like when run:
```
$ ts-node example.ts
Installing Bitcoin Core ...
Installed Bitcoin Core to /Users/carnesen/bitcoin-core-0.17.1

$ ts-node example.ts
Installing Bitcoin Core ...
Bitcoin Core is already installed at /Users/carnesen/bitcoin-core-0.17.1
```

The script would be the same in JavaScript just with the `import ... from` statements replaced by `const ... require` ones.

## API

### Target
A TypeScript type alias with shape `{implementation, version, destination}`

#### implementation
`string`. Supported implementations are:
- `'core'`: Download from [https://bitcoincore.org/bin/](https://bitcoincore.org/bin/)
- `'abc'`: Download from [https://download.bitcoinabc.org/](https://download.bitcoinabc.org/)

#### version
`string`. Version of the software, e.g. `'0.17.1'`

#### destination
`string`. An absolute path of an existing directory below which the software will be installed. 

### installSoftware(target): Promise<{changed, bitcoinHome}>
Downloads and unpacks a tarball of bitcoin server software

#### target
[`Target`](#target).

#### changed
`boolean`. `installSoftware` is [idempotent](https://en.wikipedia.org/wiki/Idempotence) in the sense that it does not modify an existing installation if there is one, nor does it throw. If `installSoftware` actually downloads and extracts the tarball to `destination`, it returns an object with `changed` set to `true`. If `install` finds the software already installed, it returns an object with `changed` set to `false`.

#### bitcoinHome
`string`. Absolute directory path at which the software is installed. Effectively:
```ts
bitcoinHome = `${destination}/bitcoin-${implementation}-${version}` 
```

### uninstallSoftware(target): Promise<{changed, bitcoinHome}>
Uninstalls bitcoin server software from the specified destination. Parameters and return values are the same as described above for `installSoftware`.

## More information
This library has a number of unit tests with ~100% coverage. Check out [the tests directory](src/__tests__) for more examples of how it works. If you encounter any bugs or have any questions or feature requests, please don't hesitate to [file an issue](https://github.com/carnesen/bitcoin-software/issues/new) or [submit a pull request](https://github.com/carnesen/bitcoin-software/compare) on [this project's repository on GitHub](https://github.com/carnesen/bitcoin-software).

## Related
- [@carnesen/bitcoin-software-cli](https://github.com/carnesen/bitcoin-software-cli): A Node.js command-line interface for managing bitcoin server software

- [@carnesen/bitcoin-config](https://github.com/carnesen/bitcoin-config): A Node.js library for bitcoin server software configuration

- [@carnesen/bitcoind](https://github.com/carnesen/bitcoind): A Node.js library for managing the bitcoin server process `bitcoind`

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
