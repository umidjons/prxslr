import { TestBed, async, inject } from '@angular/core/testing';

import { ErrorService } from './error.interceptor';

describe('ErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService]
    });
  });

  it('should ...', inject([ErrorService], (guard: ErrorService) => {
    expect(guard).toBeTruthy();
  }));
});
