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

## Using EnvService

The root-injected `EnvService` service includes a `Map` with environment settings (name=value pairs, both being strings). These settings get automatically loaded by this service on its initialization, from a specific data member named `__env` of the global window object, so that you can define all these settings in a separate, unbundled pure JS file.

This file is named `env.js` under folder `public` (or `src/assets` in older apps), included in the scripts of the `index.html` page of the Angular app. This way you can easily change settings without having to rebuild the app, especially when containerizing it as a Docker image. In this case you can use a volume bind, where the host-specific `env.js` from local file system replaces the one inside the container, providing all the settings for that specific server environment.

👉 To use this service:

1. add `env.js` to your app's `public` folder.
2. ensure this script is added to `angular.json` scripts (`env.js` under `architect/build/options/assets`); usually this is already implied by the default glob pattern including all the files in `public`.
3. ensure to include `env.js` in the `head` of your `index.html`, BEFORE any other script:

```html
<script src="env.js"></script>
```

The `env.js` file should include all your environment-dependent settings, e.g.:

```js
(function (window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'http://localhost:60200/api/';
  // ... etc.
}(this));
```

## History

### 1.0.3

- 2025-04-11: added dynamic focus service.

### 1.0.2

- 2025-03-12: added replace string pipe.

### 1.0.1

- 2024-12-19: ⚠️ use singleton for `EnvService` removing the need for `EnvServiceProvider`. This is strictly a breaking change, but in the end all what you need to do is just remove `EnvServiceProvider` from the `providers` array of your app. The rest of the code will work as before, because the same `EnvService` will be injected and also properly initialized.

### 0.0.3

- 2024-12-14: more color names.

#### 0.0.2

- 2024-12-13: `@myrmidon/ngx-tools`: improved `colorToContrast` and added `colorNameService`.
