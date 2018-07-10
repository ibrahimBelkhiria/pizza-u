import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import {AuthenticationService} from '../providers/authentication.service';
import {AngularFireAuth} from 'angularfire2/auth';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, AuthenticationService, AngularFireAuth]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
