import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-mode');
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-mode');
  });

  it('should default to light mode when nothing is stored', () => {
    const service = TestBed.inject(ThemeService);
    expect(service.isDarkMode()).toBe(false);
  });

  it('should initialize from a stored dark preference', () => {
    localStorage.setItem('user-theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.isDarkMode()).toBe(true);
  });

  it('should toggle the signal value', () => {
    const service = TestBed.inject(ThemeService);
    const initial = service.isDarkMode();

    service.toggle();

    expect(service.isDarkMode()).toBe(!initial);
  });

  it('should apply the dark-mode class and persist the preference on toggle', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();
    TestBed.tick();

    expect(document.documentElement.classList.contains('dark-mode')).toBe(
      true,
    );
    expect(localStorage.getItem('user-theme')).toBe('dark');
  });

  it('should remove the dark-mode class and persist the light preference when toggled back', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();
    TestBed.tick();
    service.toggle();
    TestBed.tick();

    expect(document.documentElement.classList.contains('dark-mode')).toBe(
      false,
    );
    expect(localStorage.getItem('user-theme')).toBe('light');
  });
});
