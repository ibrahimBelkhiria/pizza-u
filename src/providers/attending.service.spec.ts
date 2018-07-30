import { TestBed, inject } from '@angular/core/testing';

import { AttendingService } from './attending.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Evenement} from '../model/Evenement';
import {Observable} from 'rxjs';
import {EventUser} from '../model/Event_User';
import {EvenmentService} from './evenment.service';

describe('AttendingService', () => {


  const input: EventUser[] = [
    {id: '1', event_id: 'some test event id', user_id: 'test user id'},
    {id: '2', event_id: 'some test event id', user_id: 'test user id'}

  ];

  const data = Observable.of(input);

  const collectionStub = {
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
    add: jasmine.createSpy('add')
  };

  const angularFiresotreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  let service: AttendingService;
  let angularFirestore: AngularFirestore;
  let eventService: EvenmentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendingService, {provide: AngularFirestore, useValue: angularFiresotreStub}, EvenmentService]
    });

    service = TestBed.get(AttendingService);
    angularFirestore = TestBed.get(AngularFirestore);
    eventService = TestBed.get(EvenmentService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('attend method test', () => {
    const event = {id: '2', event_id: 'some test event id', user_id: 'test user id'} ;
    const  eUser: EventUser = {
      event_id : '',
      user_id : ''
    };
    spyOn(service, 'attend');
     collectionStub.add(eUser);

    expect(collectionStub.add).toHaveBeenCalled();

  });


});
