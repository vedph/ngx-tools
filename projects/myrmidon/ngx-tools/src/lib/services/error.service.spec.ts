import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a generic message for a client-side error', async () => {
    const error = new HttpErrorResponse({
      error: new ErrorEvent('offline', { message: 'network down' }),
      status: 0,
    });

    await expect(
      new Promise((_, reject) =>
        service.handleError(error).subscribe({ error: reject }),
      ),
    ).rejects.toBe('Something bad happened; please try again later.');
  });

  it('should emit a server-derived message for a backend error', async () => {
    const error = new HttpErrorResponse({
      error: 'Bad request',
      status: 400,
    });

    await expect(
      new Promise((_, reject) =>
        service.handleError(error).subscribe({ error: reject }),
      ),
    ).rejects.toBe('Server error: Bad request');
  });

  it('should log the error to the console', () => {
    const errorSpy = vi.spyOn(console, 'error');
    const error = new HttpErrorResponse({ error: 'Bad request', status: 400 });

    service.handleError(error).subscribe({ error: () => {} });

    expect(errorSpy).toHaveBeenCalled();
  });
});
