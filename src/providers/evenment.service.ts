import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import {Observable} from 'rxjs';
import {Evenement} from '../model/Evenement';
import 'rxjs-compat/add/operator/map';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable()
export class EvenmentService implements OnInit , OnDestroy {


  eventsCollection: AngularFirestoreCollection<Evenement>;
  events: Observable<Evenement[]>;
  eventDoc: AngularFirestoreDocument<Evenement>;

  ngOnInit(): void {

  }

  constructor(public afs: AngularFirestore) {
    // this.events = this.afs.collection('events').valueChanges();
    //  get an instance of the collection from firestore
    this.eventsCollection = this.afs.collection<Evenement>('events');
    // store the events from firestore to events variable
    this.events =  this.eventsCollection.snapshotChanges().pipe(
      map(changes =>  changes.map(a => {
        const data = a.payload.doc.data() as Evenement;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    ) ;

    console.log('///////////////////', this.events);
  }

  // returns an observable of events
  getEvents() {

    return this.events;
  }

   // add the event to the firestore
  addEvent(event: Evenement) {
    this.eventsCollection.add(event).then(() => {
      console.log('event added success');
    }).catch((err) => {
      console.log(err);
    });
  }

  // delete the event from the firestore
  deleteEvent(event: Evenement) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.valueChanges().subscribe(value => console.log(value));

    this.eventDoc.delete().then(() => {
      console.log('event deleted with succes');
    }).catch((err) => {
      console.log(err);
    });
  }

  // returns a single event;it takes the id of the event as a  parameter
  getEvent(evenetId) {
    return  this.afs.doc(`events/${evenetId}`);
  }



  // update the event in the firestore
  updateEvent(event: Evenement, id) {
     // this.eventDoc = this.afs.doc(`events/${id}`); //  before change
    this.getEvent(id).update(event).then(() => {

      console.log('event updated with succes');
    }).catch((err) => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {

  }

}
