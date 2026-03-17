import {
  Injectable,
  signal,
  effect,
  inject,
  RendererFactory2,
} from '@angular/core';

/**
 * A service to manage the application's theme (light/dark mode).
 * It uses a signal to track the current theme state and updates
 * the HTML class accordingly.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer = inject(RendererFactory2).createRenderer(null, null);

  // Signal to track theme state
  isDarkMode = signal<boolean>(localStorage.getItem('user-theme') === 'dark');

  constructor() {
    // Automatically update the HTML class whenever the signal changes
    effect(() => {
      const darkMode = this.isDarkMode();
      if (darkMode) {
        this.renderer.addClass(document.documentElement, 'dark-mode');
        localStorage.setItem('user-theme', 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark-mode');
        localStorage.setItem('user-theme', 'light');
      }
    });
  }

  toggle() {
    this.isDarkMode.update((v) => !v);
  }
}
