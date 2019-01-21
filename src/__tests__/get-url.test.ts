import { getUrl } from '../get-url';

const testData: { [url: string]: Parameters<typeof getUrl>[0] } = {
  'https://download.bitcoinabc.org/0.18.6/osx/bitcoin-abc-0.18.6-osx64.tar.gz': {
    version: '0.18.6',
    implementation: 'abc',
    nodejsPlatform: 'darwin',
  },
  'https://bitcoincore.org/bin/bitcoin-core-0.17.1/bitcoin-0.17.1-osx64.tar.gz': {
    version: '0.17.1',
    implementation: 'core',
    nodejsPlatform: 'darwin',
  },
  'https://download.bitcoinabc.org/0.18.6/linux/bitcoin-abc-0.18.6-x86_64-linux-gnu.tar.gz': {
    version: '0.18.6',
    implementation: 'abc',
    nodejsPlatform: 'linux',
  },
  'https://bitcoincore.org/bin/bitcoin-core-0.17.1/bitcoin-0.17.1-x86_64-linux-gnu.tar.gz': {
    version: '0.17.1',
    implementation: 'core',
    nodejsPlatform: 'linux',
  },
};

describe(getUrl.name, () => {
  Object.entries(testData).forEach(([url, namedArgs]) => {
    it(`returns ${url} when passed ${namedArgs}`, () => {
      expect(getUrl(namedArgs)).toBe(url);
    });
  });
  it('throws "not yet supported" on windows', () => {
    expect(() => {
      getUrl({ implementation: 'core', version: '1.2.3', nodejsPlatform: 'win32' });
    }).toThrow('not yet supported');
  });
});
