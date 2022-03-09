import { TestBed } from '@angular/core/testing';

import { AllUsersGuard } from './all-users.guard';

describe('AllUsersGuard', () => {
  let guard: AllUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
