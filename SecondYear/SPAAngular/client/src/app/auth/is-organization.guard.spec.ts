import { TestBed } from '@angular/core/testing';

import { IsOrganizationGuard } from './is-organization.guard';

describe('IsOrganizationGuard', () => {
  let guard: IsOrganizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsOrganizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
