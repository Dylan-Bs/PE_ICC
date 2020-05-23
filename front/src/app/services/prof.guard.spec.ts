import { TestBed, async, inject } from '@angular/core/testing';

import { ProfGuard } from './prof.guard';

describe('ProfGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfGuard]
    });
  });

  it('should ...', inject([ProfGuard], (guard: ProfGuard) => {
    expect(guard).toBeTruthy();
  }));
});
