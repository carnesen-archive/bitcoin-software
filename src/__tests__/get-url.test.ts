import { getUrl as subject } from '../get-url';

type Data = [Parameters<typeof subject>, ReturnType<typeof subject>][];

const data: Data = [
  [
    ['abc', '0.18.6', 'darwin'],
    'https://download.bitcoinabc.org/0.18.6/osx/bitcoin-abc-0.18.6-osx64.tar.gz',
  ],

  [
    ['core', '0.17.1', 'darwin'],
    'https://bitcoincore.org/bin/bitcoin-core-0.17.1/bitcoin-0.17.1-osx64.tar.gz',
  ],
  [
    ['abc', '0.18.6', 'linux'],
    'https://download.bitcoinabc.org/0.18.6/linux/bitcoin-abc-0.18.6-x86_64-linux-gnu.tar.gz',
  ],
  [
    ['core', '0.17.1', 'linux'],
    'https://bitcoincore.org/bin/bitcoin-core-0.17.1/bitcoin-0.17.1-x86_64-linux-gnu.tar.gz',
  ],
];

describe(subject.name, () => {
  for (const [args, returnValue] of data) {
    it(`"${args}" -> "${returnValue}`, () => {
      expect(subject(...args)).toBe(returnValue);
    });
  }

  it('throws "not yet supported" on windows', () => {
    expect(() => {
      subject('core', '1.2.3', 'win32');
    }).toThrow('not yet supported');
  });

  it('throws "implementation" if a bad one is passed', () => {
    expect(() => {
      subject('abcd' as 'abc', 'foo');
    }).toThrow('implementation');
  });
});
