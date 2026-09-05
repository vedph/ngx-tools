# History

- [ngx-tools](./projects/myrmidon/ngx-tools/README.md#history)
- [ngx-mat-tools](./projects/myrmidon/ngx-mat-tools/README.md#history)

- 2026-09-05: updated packages.

## 3.0.1

- 2026-08-21:
  - 🆕 added `NgxToolsSignalValidators`, the signal-forms (`@angular/forms/signals`) counterpart of `NgxToolsValidators`.
  - replaced all three projects' test targets in angular.json with the native @angular/build:unit-test builder (Vitest runner, the modern Angular 22+ default), dropping the stale, uninstalled @angular-builders/jest:run references.

## 2.0.0

- 2026-06-07: ⚠️ upgraded to Angular 22.

## 1.0.2

- 2026-03-17:
  - upgraded Angular and packages.
  - refactored demo app styles for Angular Material M3 dark/light themes and utility classes.
  - 🆕 added `ThemeToggleComponent` (`ngx-theme-toggle`).
  - ⚠️ migrated to `OnPush` and zoneless.

## 1.0.1

- 2025-11-22:
  - ⚠️ upgraded to Angular 21.
  - ⚠️ migrated to `pnpm`.
- 2025-05-29: ⚠️ upgraded to Angular 20.
- 2025-03-12:
  - updated Angular and packages.
  - added replace string pipe.
