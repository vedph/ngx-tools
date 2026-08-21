import { deepCopy } from './functions';

describe('deepCopy', () => {
  it('should return primitives unchanged', () => {
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(true)).toBe(true);
  });

  it('should return null and undefined unchanged', () => {
    expect(deepCopy(null)).toBeNull();
    expect(deepCopy(undefined)).toBeUndefined();
  });

  it('should copy a Date by value', () => {
    const date = new Date('2020-01-01T00:00:00.000Z');
    const copy = deepCopy(date);

    expect(copy).not.toBe(date);
    expect(copy.getTime()).toBe(date.getTime());
  });

  it('should deep-copy an array', () => {
    const arr = [1, { a: 2 }, [3, 4]];
    const copy = deepCopy(arr);

    expect(copy).toEqual(arr);
    expect(copy).not.toBe(arr);
    expect(copy[1]).not.toBe(arr[1]);
    expect(copy[2]).not.toBe(arr[2]);
  });

  it('should deep-copy a plain object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = deepCopy(obj);

    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(copy.b).not.toBe(obj.b);
  });

  it('should not carry over mutations from the source after copying', () => {
    const obj = { a: { b: 1 } };
    const copy = deepCopy(obj);

    obj.a.b = 2;

    expect(copy.a.b).toBe(1);
  });

  it('should only copy own enumerable properties', () => {
    const proto = { inherited: 'nope' };
    const obj = Object.create(proto);
    obj.own = 'yes';

    const copy = deepCopy(obj);

    expect(copy.own).toBe('yes');
    expect(copy.inherited).toBeUndefined();
  });
});
