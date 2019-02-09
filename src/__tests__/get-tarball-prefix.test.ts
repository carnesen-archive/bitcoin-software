import { getTarballPrefix } from '../get-tarball-prefix';

describe(getTarballPrefix.name, () => {
  it('throws "implementation" if a bad implementation is passed', () => {
    expect(() => {
      getTarballPrefix('foo' as 'core');
    }).toThrow('implementation');
  });
});
