import { TestBed } from '@angular/core/testing';

import { GameGeneralService } from './game-general.service';

describe('GameGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameGeneralService = TestBed.get(GameGeneralService);
    expect(service).toBeTruthy();
  });
});
