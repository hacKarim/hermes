import { getFileNameByPath } from './helpers';

describe('getFileNameByPath', () => {
  it('returns the file name without its extension', () => {
    expect(getFileNameByPath('src/utilities/helpers.ts')).toBe('helpers');
  });

  it('strips only the final extension, keeping intermediate dots', () => {
    expect(getFileNameByPath('/tmp/report.spec.ts')).toBe('report.spec');
  });

  it('returns a falsy value for an empty path', () => {
    expect(getFileNameByPath('')).toBeFalsy();
  });
});
