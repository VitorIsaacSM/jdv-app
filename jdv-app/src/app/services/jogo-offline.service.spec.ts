import { TestBed } from '@angular/core/testing';

import { JogoOfflineService } from './jogo-offline.service';

describe('JogoOfflineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JogoOfflineService = TestBed.get(JogoOfflineService);
    expect(service).toBeTruthy();
  });
});
