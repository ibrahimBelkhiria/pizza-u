import { TestBed, inject } from '@angular/core/testing';

import { EvenmentService } from './evenment.service';
import {AngularFirestore} from 'angularfire2/firestore';

describe('EvenmentService', () => {
   /*let angularFireService: jasmine.SpyObj<AngularFirestore>;*/

  beforeEach(() => {
    // let eventService: EvenmentService;
      TestBed.configureTestingModule(
        {providers: [ EvenmentService]

      });
  });

  it('the service exist', () => {
    expect(TestBed.get(EvenmentService)).toBeTruthy();

  });




});
