import { getBitcoinHome } from '../get-bitcoin-home';
import { Target } from '../constants';
import { toAbsolute } from '@carnesen/bitcoin-config';

type Data = { [bitcoinHome: string]: Target };

const data: Data = {
  '/foo/bar/bitcoin-core-carl': {
    implementation: 'core',
    destination: '/foo/bar',
    version: 'carl',
  },
  [`${toAbsolute('foo')}/bitcoin-core-carl`]: {
    implementation: 'core',
    destination: 'foo',
    version: 'carl',
  },
};

describe(getBitcoinHome.name, () => {
  for (const [bitcoinHome, target] of Object.entries(data)) {
    it(`calculates ${target} => ${bitcoinHome}`, () => {
      expect(getBitcoinHome(target)).toBe(bitcoinHome);
    });
  }
});
