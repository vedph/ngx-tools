import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
  let pipe: JoinPipe;

  beforeEach(() => {
    pipe = new JoinPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null for an undefined array', () => {
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('joins with the default comma separator', () => {
    expect(pipe.transform(['a', 'b', 'c'])).toBe('a,b,c');
  });

  it('joins with a custom separator', () => {
    expect(pipe.transform(['a', 'b', 'c'], ' - ')).toBe('a - b - c');
  });

  it('joins the whole array when limit is 0 (default)', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'], ',', 0)).toBe('a,b,c,d');
  });

  it('joins only the first N elements when limit is set', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'], ',', 2)).toBe('a,b');
  });

  it('returns an empty string for an empty array', () => {
    expect(pipe.transform([])).toBe('');
  });
});
