import { TestBed } from '@angular/core/testing';

import { IsUserGuard } from './isUser.guard';

describe('AuthGuard', () => {
  let guard: IsUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
