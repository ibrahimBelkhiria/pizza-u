import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Evenement} from '../model/Evenement';
import {EvenmentService} from './evenment.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable, Subscription} from 'rxjs';
import {EventUser} from '../model/Event_User';
import {forEach} from '@angular/router/src/utils/collection';
import {User} from '../model/User';
import {tick} from '@angular/core/testing';

@Injectable()
export class AttendingService implements OnDestroy {

  eUser: EventUser = {
    event_id : '',
    user_id : ''
  };
  eventUserCollection: AngularFirestoreCollection<EventUser>;
  eventUser: Observable<EventUser[]>;
  eventUserDoc: AngularFirestoreDocument<EventUser>;
  tab: EventUser[];
  subscription: Subscription[] = [];

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
      console.log(this.tab);
    });
  }

  // returns all events that a user had subscribed to
  getUserEvents(userId) {
    let events_users: EventUser[];
    const  userEvents: Evenement[] = [];
    console.log(this.tab);
    // loop over the event_user table and get the events of the user
    for (const v of this.tab) {

      if (v.user_id === userId) {
      this.subscription.push(this.eventService.getEvent(v.event_id).valueChanges().subscribe(value1 => userEvents.push(value1)));
      }

    }

   /* const eventssRef = this.afs.collection('event_user', ref => ref.where('user_id', '==', userId) );
     eventssRef.valueChanges().subscribe(value => {
        events_users = value; // console.log(events_users);

        for (const v of events_users) {
            this.eventService.getEvent(v.event_id).valueChanges().subscribe(value1 => userEvents.push(value1));
        }
      //  console.log(userEvents);


    });*/
     return userEvents;

  }

    // unsubscribe to  observables
    clear() {
      console.log(this.subscription.length);
      for (const sub of this.subscription) {

        sub.unsubscribe();
      }
      this.subscription = [];
    }


   // get all the participants for a certain event
  getAllUsersOfAGivenEvent(eventID) {
    let events_users: EventUser[];
    const  users: User[] = [];
    const eventssRef = this.afs.collection('event_user', ref => ref.where('event_id', '==', eventID) );
   return  eventssRef.valueChanges().map(value => {
      events_users = value; // console.log(events_users);
      // console.log(events_users);
      return this.getUsers(events_users, eventID);


    });


  }
  // return a user by id
  getUserById(userId) {
    // let user: User ;
     return  this.afs.doc<User>(`users/${userId}`).valueChanges().map(value => value );
     //  return user;
  }

  // get users
  getUsers(events_users_table: EventUser[], event_id) {
   const users: User[] = [];
    const userIDs: string[] = [];
    for (const v of events_users_table) {
      if (v.event_id === event_id) {
         userIDs.push(v.user_id);
      }
    }

    for (const v of userIDs) {
          this.getUserById(v).subscribe(value => users.push(value));
    }


        return users;
  }

 // get the id of an event_user object
  getEventUserId(userId, eventId) {



    for (const v of this.tab) {
      if (v.user_id === userId && v.event_id === eventId) {
        return v.id;
      }
    }


  }

  // attend the event,let the user subscribe to a certain event
  attend(event: Evenement, eUser: EventUser) {
    console.log('attending !');
    event.reserved++;
    // this.eUser.id = this.afs.createId();
    /*this.eUser.user_id = userid;
    this.eUser.event_id = event.id;*/
    this.eventUserCollection.add(eUser).then(() => {
      console.log('eventuser added !');
      this.eventService.updateEvent(event, event.id);
    });



  }

   // let the user unsubscribe from an event and delete his subscription
    deleteAttendence(eUser) {

      this.eventUserDoc = this.afs.doc(`event_user/${eUser}`);
/*
      this.eventUserDoc.valueChanges().subscribe(value => console.log(value));
*/

       return  this.eventUserDoc.delete();

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

  ngOnDestroy(): void {

     console.log(this.subscription.length);
    for (const sub of this.subscription) {

      sub.unsubscribe();
    }


  }





}
