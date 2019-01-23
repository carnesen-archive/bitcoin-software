export const IMPLEMENTATIONS = ['core' as 'core', 'abc' as 'abc'];
export type Implementation = typeof IMPLEMENTATIONS[number];

export type Target = {
  version: string;
  implementation: Implementation;
  destination: string;
};
