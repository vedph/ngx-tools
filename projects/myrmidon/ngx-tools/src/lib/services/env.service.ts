import { Injectable } from '@angular/core';

/**
 * Environment variables service.
 * See https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/.
 *
 * To use this service:
 * 1. add `env.js` to your app's `public` folder.
 * 2. add this script to `angular.json` scripts (`env.js` under `architect/build/options/assets`);
 * 3. ensure to include `env.js` in the `head` of your `index.html`, BEFORE any other script:
 * ```html
 * <script src="env.js"></script>.
 *```
 * The env.js file should include all your environment-dependent settings,
 * e.g.:
 * ```js
 * (function (window) {
 *   window.__env = window.__env || {};
 *   window.__env.apiUrl = 'http://localhost:60200/api/';
 * }(this));
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class EnvService {
  private static instance: EnvService | null = null;
  private readonly _map!: Map<string, string>;
  private initialized = false;

  constructor() {
    // return existing instance if available
    if (EnvService.instance) {
      return EnvService.instance;
    }

    // initialize new instance
    this._map = new Map<string, string>();
    EnvService.instance = this;
    this.initialize();
  }

  private initialize(): void {
    if (this.initialized) {
      return;
    }

    console.log('EnvService initializing');

    // read environment variables from browser window
    const browserWindow = window as { __env?: Record<string, string> };
    const browserWindowEnv = browserWindow.__env || {};

    // assign environment variables from browser window to env
    Object.entries(browserWindowEnv).forEach(([key, value]) => {
      this._map.set(key, value);
    });

    this.initialized = true;
  }

  private ensureInit(): void {
    if (!this.initialized) {
      console.warn('EnvService accessed before initialization');
      this.initialize();
    }
  }

  /**
   * Get the value for the specified key. If the key is not found,
   * defValue will be returned.
   *
   * @param key The key.
   * @param defValue The default value to return if key is not found.
   */
  public get(key: string, defValue?: string): string | undefined {
    this.ensureInit();
    return this._map.get(key) ?? defValue;
  }

  /**
   * Enumerate all the keys in this store.
   */
  public getKeys(): IterableIterator<string> {
    this.ensureInit();
    return this._map.keys();
  }

  /**
   * Set a value with the specified key.
   *
   * @param key The key.
   * @param value The value.
   */
  public set(key: string, value: string): void {
    this.ensureInit();
    this._map.set(key, value);
  }

  /**
   * Delete the value with the specified key, if any.
   *
   * @param key The key.
   */
  public delete(key: string): void {
    this.ensureInit();
    this._map.delete(key);
  }

  /**
   * Clear this store.
   */
  public clear(): void {
    this.ensureInit();
    this._map.clear();
  }
}
