import { toBitcoinHome as subject } from '../to-bitcoin-home';

type Data = {
  args: Parameters<typeof subject>;
  returnValue: ReturnType<typeof subject>;
}[];

const data: Data = [
  {
    args: [
      {
        softwareDir: '/foo/bar',
        implementation: 'core',
        version: 'carl',
      },
    ],
    returnValue: '/foo/bar/bitcoin-core-carl',
  },
  {
    args: [
      {
        softwareDir: '/foo/bar',
        implementation: 'abc',
        version: 'carl',
      },
    ],
    returnValue: '/foo/bar/bitcoin-abc-carl',
  },
];

describe(subject.name, () => {
  for (const { args, returnValue } of data) {
    it(`${args} => ${returnValue}`, () => {
      expect(subject(...args)).toBe(returnValue);
    });
  }
});
