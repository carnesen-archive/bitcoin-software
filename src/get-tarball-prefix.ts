import { Implementation } from './constants';

export function getTarballPrefix(implementation: Implementation) {
  let tarballPrefix: string;
  switch (implementation) {
    case 'core':
      tarballPrefix = 'bitcoin';
      break;
    case 'abc':
      tarballPrefix = 'bitcoin-abc';
      break;
    default:
      throw new Error(`Unknown implementation "${implementation}"`);
  }
  return tarballPrefix;
}
