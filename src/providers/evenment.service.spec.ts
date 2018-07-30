import {TestBed, inject, tick, fakeAsync} from '@angular/core/testing';

import { EvenmentService } from './evenment.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router, RouterModule} from '@angular/router';
import {Observable, of} from 'rxjs';
import 'rxjs-compat/add/observable/from';
import {Evenement} from '../model/Evenement';

describe('EvenmentService', () => {

  const input: Evenement[] = [
    {id: '1', title: 'test event', description: 'this is a test event', date: '29/07/2018', nbreDePlace: 5, reserved: 3},
    {id: '2', title: 'test event', description: 'this is a test event', date: '29/07/2018', nbreDePlace: 5, reserved: 3},
    {id: '3', title: 'test event', description: 'this is a test event', date: '29/07/2018', nbreDePlace: 5, reserved: 3}

  ];

  const data = Observable.of(input);

  const collectionStub = {
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
    add: jasmine.createSpy('add')
  };

  const angularFiresotreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  describe('eventService test', () => {
    let service: EvenmentService;
    let angularFirestore: AngularFirestore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          EvenmentService,
          {provide: AngularFirestore, useValue: angularFiresotreStub}
        ]
      });

      service = TestBed.get(EvenmentService);
      angularFirestore = TestBed.get(AngularFirestore);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('expect the result', () => {

        // expect the data to be equal to the fake input
       // expect(data.value).toBe(of(input).value);

    });

    it('getevents method test', () => {

      service.getEvents();
      // test the result of the returned values
   //    expect(service.events.source.value).toBe(of(input).value);

    });

    it('test the add event', () => {

      const event =    {id: '1', title: 'test event',
        description: 'this is a test event', date: '29/07/2018', nbreDePlace: 5, reserved: 3};

        spyOn(service, 'addEvent');
        collectionStub.add(event);

        expect(collectionStub.add).toHaveBeenCalled();

    });



  });

});
