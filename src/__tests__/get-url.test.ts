import { getUrl } from '../get-url';

const testData: { [url: string]: Parameters<typeof getUrl> } = {
  'https://download.bitcoinabc.org/0.18.6/osx/bitcoin-abc-0.18.6-osx64.tar.gz': [
    {
      version: '0.18.6',
      implementation: 'abc',
    },
    'darwin',
  ],
  'https://bitcoincore.org/bin/bitcoin-core-0.17.1/bitcoin-0.17.1-osx64.tar.gz': [
    {
      version: '0.17.1',
      implementation: 'core',
    },
    'darwin',
  ],
  'https://download.bitcoinabc.org/0.18.6/linux/bitcoin-abc-0.18.6-x86_64-linux-gnu.tar.gz': [
    {
      version: '0.18.6',
      implementation: 'abc',
    },
    'linux',
  ],
  'https://bitcoincore.org/bin/bitcoin-core-0.17.1/bitcoin-0.17.1-x86_64-linux-gnu.tar.gz': [
    {
      version: '0.17.1',
      implementation: 'core',
    },
    'linux',
  ],
};

describe(getUrl.name, () => {
  Object.entries(testData).forEach(([url, args]) => {
    it(`returns ${url} when passed ${args}`, () => {
      expect(getUrl(...args)).toBe(url);
    });
  });

  it('throws "not yet supported" on windows', () => {
    expect(() => {
      getUrl({ implementation: 'core', version: '1.2.3' }, 'win32');
    }).toThrow('not yet supported');
  });

  it('throws "implementation" if a bad one is passed', () => {
    expect(() => {
      getUrl({ implementation: 'abcd' as 'abc', version: 'foo' });
    }).toThrow('implementation');
  });
});
