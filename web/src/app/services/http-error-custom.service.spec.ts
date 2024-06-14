import { TestBed } from '@angular/core/testing';

import { HttpErrorCustomService } from './http-error-custom.service';

describe('HttpErrorCustomService', () => {
  let service: HttpErrorCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
