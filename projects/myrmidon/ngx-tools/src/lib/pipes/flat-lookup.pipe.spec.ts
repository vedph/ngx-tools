import { FlatLookupPipe } from './flat-lookup.pipe';

describe('FlatLookupPipe', () => {
  it('create an instance', () => {
    const pipe = new FlatLookupPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null from null', () => {
    const pipe = new FlatLookupPipe();
    const v = pipe.transform(null, {
      r: 'red',
      g: 'green',
      b: 'blue',
    });
    expect(v).toBeNull();
  });

  it('returns null from undefined', () => {
    const pipe = new FlatLookupPipe();
    const v = pipe.transform(undefined, {
      r: 'red',
      g: 'green',
      b: 'blue',
    });
    expect(v).toBeNull();
  });

  it('lookups an object', () => {
    const pipe = new FlatLookupPipe();
    const v = pipe.transform('r', {
      r: 'red',
      g: 'green',
      b: 'blue',
    });
    expect(v).toBe('red');
  });

  it('fallbacks to value when object lookup fails', () => {
    const pipe = new FlatLookupPipe();
    const v = pipe.transform('x', {
      r: 'red',
      g: 'green',
      b: 'blue',
    });
    expect(v).toBe('x');
  });

  it('lookups an array', () => {
    const pipe = new FlatLookupPipe();
    const v = pipe.transform('r', [
      {
        id: 'r',
        label: 'red',
      },
      {
        id: 'g',
        label: 'green',
      },
    ]);
    expect(v).toBe('red');
  });

  it('fallbacks to value when array lookup fails', () => {
    const pipe = new FlatLookupPipe();
    const v = pipe.transform('x', [
      {
        id: 'r',
        label: 'red',
      },
      {
        id: 'g',
        label: 'green',
      },
    ]);
    expect(v).toBe('x');
  });

  it('lookups an array with custom names', () => {
    const pipe = new FlatLookupPipe();
    const v = pipe.transform(
      'r',
      [
        {
          value: 'r',
          name: 'red',
        },
        {
          value: 'g',
          name: 'green',
        },
      ],
      'value',
      'name'
    );
    expect(v).toBe('red');
  });
});
