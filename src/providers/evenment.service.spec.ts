import { TestBed, inject } from '@angular/core/testing';

import { EvenmentService } from './evenment.service';

describe('EvenmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvenmentService]
    });
  });

  it('should be created', inject([EvenmentService], (service: EvenmentService) => {
    expect(service).toBeTruthy();
  }));
});
