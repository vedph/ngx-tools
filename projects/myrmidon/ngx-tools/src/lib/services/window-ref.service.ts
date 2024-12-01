import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/53622230/angular-v4-datepipe-with-utc-datetime-as-local-time

/*
  This code can be used to dynamically provide the browser's language
  to Angular's LOCALE_ID, so that things like the date pipe behave
  according to the browser's locale. To this end, in app.module add
  the provider (under providers):
  {
    provide: LOCALE_ID,
    deps: [WindowRefService],
    useFactory: languageFactory
  }
  Alternatively, just add the locale string as the 3rd parameter of
  the date pipe (passing undefined to the others, if you don't want
  to specify them), e.g. myDate | date : 'medium' : undefined : 'de-DE'.
  If the date is UTC, you can convert it to locale by just appending
  'Z' to it before the pipe, e.g. myDate + 'Z' | date.
*/

/**
 * Window service provider.
 */
@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  public getWindow(): Window {
    return window;
  }
}

/**
 * Get the current language as set in the browser.
 *
 * @param windowRef A reference to window.
 * @returns Window's navigator language.
 */
export function languageFactory(windowRef: WindowRefService): string {
  return windowRef.getWindow().navigator.language;
}
