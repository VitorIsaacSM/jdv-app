import { TestBed } from '@angular/core/testing';

import { GetTodosService } from './get-todos.service';

describe('GetTodosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTodosService = TestBed.get(GetTodosService);
    expect(service).toBeTruthy();
  });
});
