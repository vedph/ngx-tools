import { StringToColorPipe } from './string-to-color.pipe';

describe('StringToColorPipe', () => {
  let pipe: StringToColorPipe;

  beforeEach(() => {
    pipe = new StringToColorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns the first palette color for null', () => {
    const colors = ['#111111', '#222222', '#333333'];
    expect(pipe.transform(null, colors)).toBe(colors[0]);
  });

  it('returns the first palette color for undefined', () => {
    const colors = ['#111111', '#222222', '#333333'];
    expect(pipe.transform(undefined, colors)).toBe(colors[0]);
  });

  it('returns the first palette color for an empty string', () => {
    const colors = ['#111111', '#222222', '#333333'];
    expect(pipe.transform('', colors)).toBe(colors[0]);
  });

  it('is deterministic for the same input', () => {
    const a = pipe.transform('hello');
    const b = pipe.transform('hello');
    expect(a).toBe(b);
  });

  it('picks a color from the default palette', () => {
    const v = pipe.transform('hello world');
    // access the pipe's own default palette to avoid duplicating it here
    expect(pipe['defaultColors']).toContain(v);
  });

  it('picks a color from a custom palette when provided', () => {
    const colors = ['#111111', '#222222', '#333333'];
    const v = pipe.transform('hello world', colors);
    expect(colors).toContain(v);
  });

  it('can return different colors for different strings', () => {
    const colors = ['#111111', '#222222', '#333333', '#444444', '#555555'];
    const values = new Set(
      ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((s) => pipe.transform(s, colors)),
    );
    // not a strict guarantee for any hash, but with 5 colors and 7 inputs
    // we expect more than a single color to be used
    expect(values.size).toBeGreaterThan(1);
  });
});
