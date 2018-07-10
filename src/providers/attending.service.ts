import { Injectable } from '@angular/core';
import {Evenement} from '../model/Evenement';
import {EvenmentService} from './evenment.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {EventUser} from '../model/Event_User';
import {forEach} from '@angular/router/src/utils/collection';

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
  tab: EventUser[];
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
    this.eventUser.subscribe(value => {
      this.tab = value;
    });
  }

  // returns all events that a user had subscribed to
  getUserEvents(userId) {
    let events_users: EventUser[];
    const  userEvents: Evenement[] = [];
    const eventssRef = this.afs.collection('event_user', ref => ref.where('user_id', '==', userId) );
     eventssRef.valueChanges().subscribe(value => {
        events_users = value; // console.log(events_users);

        for (const v of events_users) {
            this.eventService.getEvent(v.event_id).valueChanges().subscribe(value1 => userEvents.push(value1));
        }
      //  console.log(userEvents);


    });
     return userEvents;

  }


  getEventUserId(userId, eventId) {
    let events_users: EventUser[];
    let eventUserId;
    const eventssRef = this.afs.collection('event_user', ref => ref.where('user_id', '==', userId) );
    eventssRef.valueChanges().subscribe(value => {
      events_users = value;  // console.log(events_users);
      //  console.log(userEvents);

      for (const v of events_users) {
        if (v.event_id === eventId) {
              eventUserId = v.id;
            console.log(eventUserId);


        }
      }

    });
    return eventUserId;


  }

  attend(event: Evenement, userid: string) {
    console.log('attending !');
    event.reserved++;
    this.eUser.id = this.afs.createId();
    this.eUser.user_id = userid;
    this.eUser.event_id = event.id;
    this.eventUserCollection.add(this.eUser).then(() => {
      console.log('eventuser added !');
    });

    this.eventService.updateEvent(event, event.id);

  }

    deleteAttendence(eUserId) {
    // event-reserved -- ;

      this.eventUserDoc = this.afs.doc(`event_user/${eUserId}`);
      this.eventUserDoc.delete().then(() => {
        console.log('subscription deleted with succes');
      }).catch((err) => {
        console.log(err);
      });

      //  this.eventUserDoc = this.afs.doc('event_user');

    }






  /// this method should return a boolean to make sure that the user had never subscribed or he did
   UserisAlreadySubscribed(event_id: string, user_id: string) {

     ///  console.log(this.tab.length);
     for (const v of this.tab) {

       if (v.user_id === user_id && v.event_id === event_id) {

         return true;

       }
     }
      return false;


  }


}
