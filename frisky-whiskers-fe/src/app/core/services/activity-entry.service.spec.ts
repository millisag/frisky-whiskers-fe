import { TestBed } from '@angular/core/testing';

import { ActivityEntryService } from './activity-entry.service';

describe('ActivityEntryService', () => {
  let service: ActivityEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
