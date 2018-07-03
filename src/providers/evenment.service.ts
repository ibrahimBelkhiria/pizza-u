import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import {Observable} from 'rxjs';
import {Evenement} from '../model/Evenement';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EvenmentService {


  eventsCollection: AngularFirestoreCollection<Evenement>;
  events: Observable<Evenement[]>;
  eventDoc: AngularFirestoreDocument<Evenement>;



  constructor(public afs: AngularFirestore) {
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
      console.log('event added succes');
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteEvent(event: Evenement) {
    this.eventDoc = this.afs.doc(`items/${event.id}`);
    this.eventDoc.delete().then(() => {
      console.log('event deleted with succes');
    }).catch((err) => {
      console.log(err);
    });
  }

  updateEvent(event: Evenement) {
    this.eventDoc = this.afs.doc(`items/${event.id}`);
    this.eventDoc.update(event).then(() => {
      console.log('event updated with succes');
    }).catch((err) => {
      console.log(err);
    });
  }
}
