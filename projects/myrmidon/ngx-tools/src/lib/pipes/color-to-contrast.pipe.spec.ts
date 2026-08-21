import { ColorToContrastPipe } from './color-to-contrast.pipe';
import { ColorNameService } from '../services/color-name.service';

describe('ColorToContrastPipe', () => {
  let pipe: ColorToContrastPipe;

  beforeEach(() => {
    pipe = new ColorToContrastPipe(new ColorNameService());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns the default fallback for a null value', () => {
    expect(pipe.transform(null)).toBe('#000000');
  });

  it('returns the default fallback for an undefined value', () => {
    expect(pipe.transform(undefined)).toBe('#000000');
  });

  it('returns a custom fallback for a null value when provided', () => {
    expect(pipe.transform(null, '#ABCDEF')).toBe('#ABCDEF');
  });

  it('returns black for transparent', () => {
    expect(pipe.transform('transparent')).toBe('#000000');
  });

  it('resolves a named color', () => {
    // white (#FFFFFF) is light, so the contrast color is black
    expect(pipe.transform('white')).toBe('#000000');
    // black (#000000) is dark, so the contrast color is white
    expect(pipe.transform('black')).toBe('#FFFFFF');
  });

  it('resolves a 6-digit hex color', () => {
    expect(pipe.transform('#FFFFFF')).toBe('#000000');
    expect(pipe.transform('#000000')).toBe('#FFFFFF');
  });

  it('resolves a 3-digit shorthand hex color', () => {
    expect(pipe.transform('#FFF')).toBe('#000000');
    expect(pipe.transform('#000')).toBe('#FFFFFF');
  });

  it('is case-insensitive for named colors', () => {
    expect(pipe.transform('WHITE')).toBe('#000000');
  });

  it('falls back to the default color for an invalid value', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(pipe.transform('not-a-color')).toBe('#000000');
    expect(warnSpy).toHaveBeenCalled();
  });

  it('falls back to a custom color for an invalid value', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(pipe.transform('not-a-color', '#123456')).toBe('#123456');
  });

  it('never throws and falls back when the color service throws', () => {
    vi.spyOn(pipe['_colorService'], 'normalizeColor').mockImplementation(() => {
      throw new Error('boom');
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(pipe.transform('white', '#123456')).toBe('#123456');
    expect(errorSpy).toHaveBeenCalled();
  });
});
