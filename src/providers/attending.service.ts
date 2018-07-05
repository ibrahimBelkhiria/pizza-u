import { Injectable } from '@angular/core';
import {Evenement} from '../model/Evenement';
import {EvenmentService} from './evenment.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {EventUser} from '../model/Event_User';

@Injectable({
  providedIn: 'root'
})
export class AttendingService {

  eUser: EventUser = {
    event_id : '',
    user_id : ''
  };
  eventUserCollection: AngularFirestoreCollection<EventUser>;
  eventUser: Observable<EventUser[]>;
  eventUserDoc: AngularFirestoreDocument<EventUser>;

  constructor(private eventService: EvenmentService, public afs: AngularFirestore) {
    this.eventUserCollection = this.afs.collection('event_user');

    this.eventUser = this.eventUserCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as EventUser;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   // this.eventUser.subscribe(value => console.log(value));

  }



  attend(event: Evenement, userid: string) {
    console.log('attending !');
    event.reserved++;
    this.eUser.user_id = userid;
    this.eUser.event_id = event.id;
    this.eventUserCollection.add(this.eUser).then(() => {
      console.log('eventuser added !');
    });


    this.eventService.updateEvent(event, event.id);


  }



}
