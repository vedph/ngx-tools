import { Injectable } from '@angular/core';

import { StorageService } from '../models';

/**
 * RAM-based storage service. The session parameter is ignored.
 */
@Injectable({
  providedIn: 'root',
})
export class RamStorageService implements StorageService {
  private readonly _storage: { [key: string]: any } = {};

  /**
   * Retrieve the object with the specified key from the specified storage.
   * @param key key.
   * @param session true to use session instead of local storage.
   */
  public retrieve<T>(key: string, session: boolean = false): T | null {
    return this._storage[key] ?? null;
  }

  /**
   * Store the specified object with the specified key in the specified storage.
   * @param key key.
   * @param value object.
   * @param session true to use session instead of local storage.
   */
  public store(key: string, value: any, session: boolean = false) {
    this._storage[key] = value;
  }

  /**
   * Remove the object with the specified key from the specified storage.
   * @param key key.
   * @param session true to use session instead of local storage.
   */
  public remove(key: string, session: boolean = false) {
    delete this._storage[key];
  }

  /**
   * Get all the stored entities keys starting with the specified prefix.
   * @param prefix key prefix.
   * @param session true to use session instead of local storage.
   */
  public getKeys(prefix: string, session = false): string[] {
    const keys: string[] = [];
    for (const key in this._storage) {
      if (key.startsWith(prefix)) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Remove all the entries whose key starts with the specified prefix.
   * @param prefix key prefix.
   */
  public clear(prefix: string, session = false) {
    for (const key in this._storage) {
      if (key.startsWith(prefix)) {
        delete this._storage[key];
      }
    }
  }
}
