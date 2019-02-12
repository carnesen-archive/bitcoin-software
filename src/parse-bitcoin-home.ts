import { isAbsolute, dirname, basename } from 'path';
import { IMPLEMENTATIONS } from './constants';

function singleQuote(str: string) {
  return `'${str}'`;
}
export function toImplementation(maybeImplementation: string) {
  const implementation = maybeImplementation as typeof IMPLEMENTATIONS[number];
  if (!IMPLEMENTATIONS.includes(implementation)) {
    throw new Error(
      `Expected implementation to one of {${IMPLEMENTATIONS.map(singleQuote).join(',')}}`,
    );
  }
  return implementation;
}

export function parseBitcoinHome(bitcoinHome: string) {
  if (!isAbsolute(bitcoinHome)) {
    throw new Error('Expected bitcoinHome to be an absolute path');
  }
  const softwareDir = dirname(bitcoinHome);
  const bitcoinDir = basename(bitcoinHome);
  const splits = bitcoinDir.split('-');
  if (splits.length < 3) {
    throw new Error(
      'Expected last part of bitcoinHome to look like "bitcoin-<implementation>-<version>"',
    );
  }
  const version = splits.slice(-1)[0];
  const implementation = toImplementation(splits.slice(1, -1).join('-'));
  return { softwareDir, implementation, version };
}
