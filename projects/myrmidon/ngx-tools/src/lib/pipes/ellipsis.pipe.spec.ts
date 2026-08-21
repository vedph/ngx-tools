import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  let pipe: EllipsisPipe;

  beforeEach(() => {
    pipe = new EllipsisPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null from null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('returns null from undefined', () => {
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('leaves a string shorter than the limit unchanged', () => {
    expect(pipe.transform('hello')).toBe('hello');
  });

  it('leaves a string exactly at the limit unchanged', () => {
    expect(pipe.transform('0123456789', 10)).toBe('0123456789');
  });

  it('cuts a string in non-smart mode at the exact limit', () => {
    const v = pipe.transform('0123456789ABCDEFGHIJ', 10, false);
    expect(v).toBe('012345678 ...');
  });

  it('cuts a string in smart mode at the limit when no delimiter is nearby', () => {
    const v = pipe.transform('0123456789ABCDEFGHIJ', 10, true);
    expect(v).toBe('012345678 ...');
  });

  it('cuts a string in smart mode at a nearby delimiter', () => {
    const v = pipe.transform('Hello there, friend! Bye', 20, true);
    expect(v).toBe('Hello there, friend ...');
  });

  it('uses the custom delimiters when provided', () => {
    const value = '012345678901234567/89ABCDEFGHIJ';
    // with the default delimiters, '/' is not recognized, so the cut
    // falls back to the exact limit, keeping the '/' in the result
    expect(pipe.transform(value, 20, true)).toBe(
      '012345678901234567/ ...',
    );
    // with '/' as a custom delimiter, the cut moves back to just before it
    expect(pipe.transform(value, 20, true, '/')).toBe(
      '012345678901234567 ...',
    );
  });

  it('appends a suffix without leading whitespace as-is', () => {
    const v = pipe.transform('0123456789ABCDEFGHIJ', 10, false, '!?.;:,', '***');
    expect(v).toBe('0123456789***');
  });

  it('omits the suffix when it is empty', () => {
    const v = pipe.transform('0123456789ABCDEFGHIJ', 10, false, '!?.;:,', '');
    expect(v).toBe('0123456789');
  });
});
