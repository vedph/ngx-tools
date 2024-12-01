import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

// https://angular.io/guide/http

/**
 * Error handler for services. To use this in your service, pipe a catchError
 * operator with its argument equal to the handleError method of this service.
 * Note: pipe this method after retry, if using it.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  /**
   * Handle the specified error response.
   * @param error The error response.
   */
  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // client-side or network error
      console.error('A client-side error occurred: ' + error.error.message);
    } else {
      // backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
      errorMessage = `Server error: ${error.error}`;
    }

    // log the error to the console
    console.error(error);

    // return an observable with a user-facing error message
    return throwError(() => errorMessage);
  }
}
