import { TestBed, inject } from '@angular/core/testing';

import { AttendingService } from './attending.service';

describe('AttendingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendingService]
    });
  });

  it('should be created', inject([AttendingService], (service: AttendingService) => {
    expect(service).toBeTruthy();
  }));
});
