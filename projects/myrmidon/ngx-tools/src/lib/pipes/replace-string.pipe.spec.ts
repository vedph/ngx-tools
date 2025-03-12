import { ReplaceStringPipe } from './replace-string.pipe';

describe('ReplaceStringPipe', () => {
  let pipe: ReplaceStringPipe;

  beforeEach(() => {
    pipe = new ReplaceStringPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Basic string replacement', () => {
    it('should replace a simple substring', () => {
      expect(pipe.transform('Hello, world!', 'world', 'planet')).toBe(
        'Hello, planet!'
      );
    });

    it('should replace all occurrences of a substring', () => {
      expect(pipe.transform('test test test', 'test', 'passed')).toBe(
        'passed passed passed'
      );
    });

    it('should not replace anything when search string is not found', () => {
      expect(pipe.transform('Hello, world!', 'universe', 'multiverse')).toBe(
        'Hello, world!'
      );
    });
  });

  describe('Regex mode', () => {
    it('should replace using regex pattern', () => {
      expect(pipe.transform('Hello, world!', '[aeiou]', '*', true)).toBe(
        'H*ll*, w*rld!'
      );
    });

    it('should handle regex special characters in literal mode', () => {
      expect(pipe.transform('price is $10.99', '$', 'USD', false)).toBe(
        'price is USD10.99'
      );
    });

    it('should support capture groups in regex mode', () => {
      expect(pipe.transform('John Doe', '(\\w+) (\\w+)', '$2, $1', true)).toBe(
        'Doe, John'
      );
    });
  });

  describe('Case sensitivity', () => {
    it('should be case sensitive by default', () => {
      expect(pipe.transform('Hello World', 'world', 'planet')).toBe(
        'Hello World'
      );
    });

    it('should support case insensitive mode', () => {
      expect(
        pipe.transform('Hello World', 'world', 'planet', false, false)
      ).toBe('Hello planet');
    });
  });

  describe('Edge cases', () => {
    it('should return empty string when input is null', () => {
      expect(pipe.transform(null, 'test', 'passed')).toBe('');
    });

    it('should return empty string when input is undefined', () => {
      expect(pipe.transform(undefined, 'test', 'passed')).toBe('');
    });

    it('should return input when search string is empty', () => {
      expect(pipe.transform('test', '', 'passed')).toBe('test');
    });

    it('should handle empty replacement string', () => {
      expect(pipe.transform('Hello, world!', 'world', '')).toBe('Hello, !');
    });
  });

  describe('Error handling', () => {
    it('should return original string when regex is invalid', () => {
      const consoleSpy = spyOn(console, 'warn');
      const result = pipe.transform('test', '[', 'replacement', true);
      expect(result).toBe('test');
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
