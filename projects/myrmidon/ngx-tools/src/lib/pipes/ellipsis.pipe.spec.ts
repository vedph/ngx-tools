import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  it('create an instance', () => {
    const pipe = new EllipsisPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null from null', () => {
    const pipe = new EllipsisPipe();
    const v = pipe.transform(null);
    expect(v).toBeNull();
  });

  it('returns null from undefined', () => {
    const pipe = new EllipsisPipe();
    const v = pipe.transform(undefined);
    expect(v).toBeNull();
  });

  it('leaves shorter string unchanged', () => {
    const pipe = new EllipsisPipe();
    const v = pipe.transform('hello');
    expect(v).toBe('hello');
  });

  it('cuts string in non-smart mode', () => {
    const pipe = new EllipsisPipe();
    const v = pipe.transform('hello, world!', 10, false);
    expect(v).toBe('hello, worl...');
  });

  it('cuts string in smart mode', () => {
    const pipe = new EllipsisPipe();
    const v = pipe.transform('hello, world!', 10, false);
    expect(v).toBe('hello, ...');
  });
});
