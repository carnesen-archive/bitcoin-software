import { Target } from './constants';
import { getDefaultConfig } from '@carnesen/bitcoin-config';

export function withDefaults(target: Target = {}): Required<Target> {
  const {
    implementation = 'core',
    destination = 'software',
    datadir = getDefaultConfig('main').datadir,
  } = target;
  let { version } = target;
  if (!version) {
    switch (implementation) {
      case 'abc':
        version = '0.18.5';
        break;
      case 'core':
        version = '0.17.1';
        break;
      default:
        throw new Error(`Unexpected implementation "${implementation}"`);
    }
  }
  return {
    implementation,
    destination,
    version,
    datadir,
  };
}
