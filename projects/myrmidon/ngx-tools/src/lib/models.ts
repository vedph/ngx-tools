/**
 * Generic paging options.
 */
export interface PagingOptions {
  pageNumber: number;
  pageSize: number;
}

/**
 * A generic page of data returned from some service.
 */
export interface DataPage<T> extends PagingOptions {
  pageCount: number;
  total: number;
  items: T[];
}

/**
 * A wrapper for either a value or an optional error message.
 */
export interface ErrorWrapper<T> {
  value?: T;
  error?: string;
}

/**
 * Generic information about an error.
 */
export interface ErrorInfo {
  text: string;
  payload?: any;
}

/**
 * Interface implemented by client storage services. These are typically
 * used within the app to store settings and other shared data.
 */
export interface StorageService {
  /**
   * Retrieve the object with the specified key from the specified storage.
   * @param key key.
   * @param session true to use session instead of local storage.
   */
  retrieve<T>(key: string, session?: boolean): T | null;

  /**
   * Store the specified object with the specified key in the specified storage.
   * @param key key.
   * @param value object.
   * @param session true to use session instead of local storage.
   */
  store(key: string, value: any, session?: boolean): void;

  /**
   * Remove the object with the specified key from the specified storage.
   * @param key key.
   * @param session true to use session instead of local storage.
   */
  remove(key: string, session?: boolean): void;

  /**
   * Get all the stored entities keys starting with the specified prefix.
   * @param prefix key prefix.
   * @param session true to use session instead of local storage.
   */
  getKeys(prefix: string, session?: boolean): string[];

  /**
   * Remove all the entries whose key starts with the specified prefix.
   * @param prefix key prefix.
   */
  clear(prefix: string, session?: boolean): void;
}
