import { withDefaults } from '../with-defaults';

const semverRegex = /^\d*\.\d*\.\d*$/;

describe(withDefaults.name, () => {
  it('defaults to implementation "core"', () => {
    expect(withDefaults().implementation).toBe('core');
  });

  it('prefers a passed implementation', () => {
    expect(withDefaults({ implementation: 'abc' }).implementation).toBe('abc');
  });

  it('defaults to destination "software"', () => {
    expect(withDefaults().destination).toBe('software');
  });

  it('prefers a passed destination', () => {
    expect(withDefaults({ destination: 'foo' }).destination).toBe('foo');
  });

  it('defaults to a version for core', () => {
    expect(withDefaults({ implementation: 'core' }).version).toMatch(semverRegex);
  });

  it('defaults to a version for abc', () => {
    expect(withDefaults({ implementation: 'abc' }).version).toMatch(semverRegex);
  });

  it('defaults to a different version for abc and core', () => {
    expect(withDefaults({ implementation: 'core' }).version).not.toMatch(
      withDefaults({ implementation: 'abc' }).version,
    );
  });

  it('throws "implementation" if a bad implementation is passed', () => {
    expect(() => {
      withDefaults({ implementation: 'abcdef' as 'abc' });
    }).toThrow('implementation');
  });
});
