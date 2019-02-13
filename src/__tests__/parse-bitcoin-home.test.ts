import { parseBitcoinHome as subject } from '../parse-bitcoin-home';

type Data = [Parameters<typeof subject>, ReturnType<typeof subject>][];

const data: Data = [
  [
    ['/foo/bar/bitcoin-core-carl'],
    {
      destination: '/foo/bar',
      implementation: 'core',
      version: 'carl',
    },
  ],
  [
    ['/foo/bar/bitcoin-abc-foo'],
    {
      destination: '/foo/bar',
      implementation: 'abc',
      version: 'foo',
    },
  ],
];

describe(subject.name, () => {
  for (const [args, returnValue] of data) {
    it(`${args} => ${returnValue}`, () => {
      expect(subject(...args)).toEqual(returnValue);
    });
  }

  it('throws "implementation" if the implementation is not valid', () => {
    expect(() => {
      subject('/foo/bitcoin-carl-1.2.3');
    }).toThrow('implementation');
  });

  it('throws "absolute path" if the path is not absolute', () => {
    expect(() => {
      subject('foo/bitcoin-carl-1.2.3');
    }).toThrow('absolute path');
  });

  it('throws "bitcoin-<implementation>-<version>" if the last part of the path is not like that', () => {
    expect(() => {
      subject('/foo/bitcoin-carl');
    }).toThrow('bitcoin-<implementation>-<version>');
  });
});
