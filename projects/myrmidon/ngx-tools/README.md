# NgxTools

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0. It originates from `NgTools` while also renaming it.

My essential, general-purpose tools for Angular applications.

These are the typical services and tools shared by most of my Angular apps. For convenience, I packed them into a single reusable library having no dependencies other than Angular `CommonModule`.

- **directives**:
  - [autoFocus](src/lib/directives/auto-focus.directive.ts)
- **pipes**:
  - [colorToContrast](src/lib/pipes/color-to-contrast.pipe.ts): get contrast color from color.
  - [ellipsis](src/lib/pipes/ellipsis.pipe.ts): smart-cut a text.
  - [flat-lookup](src/lib/pipes/flat-lookup.pipe.ts): return a human-friendly string from some lookup value.
  - [joinPipe](src/lib/pipes/join.pipe.ts): join an array into a string.
  - [safeHtml](src/lib/pipes/safe-html.pipe.ts): HTML pipe to embed HTML code into a page.
  - [stringToColor](src/lib/pipes/string-to-color.pipe.ts): converts a string to a color. The same string will always return the same color.
- **services**:
  - [EnvService](src/lib/services/env.service.ts): service providing "environment" variables from unbundled file `env.js`.
  - [ErrorService](src/lib/services/error.service.ts)
  - [LocalStorageService](src/lib/services/local-storage.service.ts)
  - [RamStorageService](src/lib/services/ram-storage.service.ts)
  - [WindowRefService](src/lib/services/window-ref.service.ts)
- **validators**:
  - [NgxToolsValidators](src/lib/validators/ngx-tools.validators.ts)
- **general**: [deep copy](src/lib/functions.ts) function, [Roman numbers](src/lib/roman-number.ts) bidirectional converter.
