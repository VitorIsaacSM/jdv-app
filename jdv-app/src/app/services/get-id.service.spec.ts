import { TestBed } from '@angular/core/testing';

import { GetIdService } from './get-id.service';

describe('GetIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetIdService = TestBed.get(GetIdService);
    expect(service).toBeTruthy();
  });
});
