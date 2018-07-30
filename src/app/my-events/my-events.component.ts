import {Component, OnDestroy, OnInit} from '@angular/core';
import {AttendingService} from '../../providers/attending.service';
import {AuthenticationService} from '../../providers/authentication.service';
import {Evenement} from '../../model/Evenement';
import {EventUser} from '../../model/Event_User';
import {EvenmentService} from '../../providers/evenment.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {k, v} from '@angular/core/src/render3';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
// this is the myEvents component , it is responsible for showing the events that the current user has subscribed to
export class MyEventsComponent implements OnInit, OnDestroy {
  events: Evenement[];
  events_users: EventUser[];
  subscription: Subscription;
  constructor(private attendingService: AttendingService, private authService: AuthenticationService
              , private eventService: EvenmentService, private router: Router) {
          // get the uid of the current user
            const  uid = this.authService.getCurrentUserId();
            // get the events of the current user and store it in events
           this.events =  this.attendingService.getUserEvents(uid);

  }

  // this method will take us to the event-detail page
  detail(e) {
    this.router.navigate(['event-detail', e.id]).catch((error) => {
      console.log(error);
    });
  }

  // this method let the user unsubscribe from an event that he is subscribing to
  unsubscribe(event: Evenement, eventId) {
    /*
        value is the id for the event_user stored in firestore :
            event_user {   id (value) ,
                           user_id ,
                           event_id,
                       }
     */
     const   value  =  this.attendingService.getEventUserId(this.authService.getCurrentUserId(), eventId) ;

        console.log(value);
        // call the deleteAttendance method from the service to delete the event_user by value(id)
        this.attendingService.deleteAttendence(value).then(res => {
                      console.log(this.events);

           // the folowing code is for deleting from the view
          this.events.map((v, k) => {
            if (v.id === eventId ) {
              console.log(v.description);
              this.events.splice(k, 1);
            }

          });
          this.events.map((v, k) => {
            if (v.id === eventId ) {
              console.log(v.description);
              this.events.splice(k, 1);
            }

          });


       }, err => {

       });
        // update the event
         if (event.reserved > 0) {
           event.reserved--; // decrement the number of reserved places
           this.eventService.updateEvent(event, eventId); // update the event
        }



  }
  ngOnInit() {
  }


  ngOnDestroy() {
    // call the clear method from the service when the component is destroyed ,this method will unsubscribe to certain observables
    this.attendingService.clear();
    console.log('clear as cristal');

  }
}
