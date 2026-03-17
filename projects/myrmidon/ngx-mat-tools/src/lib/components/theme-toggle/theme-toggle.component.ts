import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from './theme.service';

/**
 * A component that provides a button to toggle between light and dark themes.
 * It uses the ThemeService to manage the theme state and updates the icon
 * accordingly.
 */
@Component({
  selector: 'ngx-theme-toggle',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button
      mat-icon-button
      (click)="themeService.toggle()"
      aria-label="Toggle theme"
    >
      <mat-icon>{{
        themeService.isDarkMode() ? 'light_mode' : 'dark_mode'
      }}</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
