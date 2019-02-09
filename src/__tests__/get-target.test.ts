import { getTarget } from '../get-target';

const semverRegex = /^\d*\.\d*\.\d*$/;

describe(getTarget.name, () => {
  it('defaults to implementation "core"', () => {
    expect(getTarget().implementation).toBe('core');
  });

  it('prefers a passed implementation', () => {
    expect(getTarget({ implementation: 'abc' }).implementation).toBe('abc');
  });

  it('defaults to destination "software"', () => {
    expect(getTarget().destination).toBe('software');
  });

  it('prefers a passed destination', () => {
    expect(getTarget({ destination: 'foo' }).destination).toBe('foo');
  });

  it('defaults to a version for core', () => {
    expect(getTarget({ implementation: 'core' }).version).toMatch(semverRegex);
  });

  it('defaults to a version for abc', () => {
    expect(getTarget({ implementation: 'abc' }).version).toMatch(semverRegex);
  });

  it('defaults to a different version for abc and core', () => {
    expect(getTarget({ implementation: 'core' }).version).not.toMatch(
      getTarget({ implementation: 'abc' }).version,
    );
  });

  it('throws "implementation" if a bad implementation is passed', () => {
    expect(() => {
      getTarget({ implementation: 'abcdef' as 'abc' });
    }).toThrow('implementation');
  });
});
