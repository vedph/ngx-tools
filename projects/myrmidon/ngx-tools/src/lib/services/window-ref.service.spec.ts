import { TestBed } from '@angular/core/testing';

import { WindowRefService, languageFactory } from './window-ref.service';

describe('WindowRefService', () => {
  let service: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the global window object', () => {
    expect(service.getWindow()).toBe(window);
  });
});

describe('languageFactory', () => {
  it('should return the navigator language from the window reference', () => {
    const windowRefStub = {
      getWindow: () => ({ navigator: { language: 'it-IT' } }),
    } as WindowRefService;

    expect(languageFactory(windowRefStub)).toBe('it-IT');
  });
});
