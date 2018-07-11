import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import {Observable} from 'rxjs';
import {Evenement} from '../model/Evenement';
import 'rxjs-compat/add/operator/map';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EvenmentService {


  eventsCollection: AngularFirestoreCollection<Evenement>;
  events: Observable<Evenement[]>;
  eventDoc: AngularFirestoreDocument<Evenement>;



  constructor(public afs: AngularFirestore, private router: Router) {
    // this.events = this.afs.collection('events').valueChanges();
    this.eventsCollection = this.afs.collection('events', ref => ref.orderBy('title', 'asc'));

    this.events = this.eventsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Evenement;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getEvents() {
    return this.events;
  }

  addEvent(event: Evenement) {
    this.eventsCollection.add(event).then(() => {
      console.log('event added success');
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteEvent(event: Evenement) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.delete().then(() => {
      console.log('event deleted with succes');
    }).catch((err) => {
      console.log(err);
    });
  }

  getEvent(evenetId) {
    return  this.afs.doc(`events/${evenetId}`);
  }




  updateEvent(event: Evenement, id) {
    this.eventDoc = this.afs.doc(`events/${id}`);
    this.eventDoc.update(event).then(() => {

      console.log('event updated with succes');
    }).catch((err) => {
      console.log(err);
    });
  }

}
