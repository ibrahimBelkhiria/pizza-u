import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

xdescribe('AuthenticationService', () => {

  let service: AuthenticationService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });

    service = TestBed.get(AuthenticationService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
