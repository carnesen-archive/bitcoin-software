import { Target, PartialTarget } from './constants';

export function getTarget(partialTarget: PartialTarget = {}): Target {
  const { implementation = 'core', destination = 'software' } = partialTarget;
  let { version } = partialTarget;
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
  };
}
