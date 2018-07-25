import { Component, OnInit } from '@angular/core';
import {AttendingService} from '../../providers/attending.service';
import {AuthenticationService} from '../../providers/authentication.service';
import {Evenement} from '../../model/Evenement';
import {EventUser} from '../../model/Event_User';
import {EvenmentService} from '../../providers/evenment.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events: Evenement[];
  events_users: EventUser[];
  subscription: Subscription;
  constructor(private attendingService: AttendingService, private authService: AuthenticationService
              , private eventService: EvenmentService, private router: Router) {
            const  uid = this.authService.getCurrentUserId();
           this.events =  this.attendingService.getUserEvents(uid);

  }

  detail(e) {
    this.router.navigate(['event-detail', e.id]).catch((error) => {
      console.log(error);
    });
  }

  unsubscribe(event: Evenement, eventId) {
     const   value  =  this.attendingService.getEventUserId(this.authService.getCurrentUserId(), eventId) ;

        console.log(value);
       this.attendingService.deleteAttendence(value).then(res => {
                      console.log(res);
         /*this.events.map((v, k) => {
           if (v.id === value) {
             this.events.splice(k, 1);
           }
         });*/


       }, err => {

       }); // there is a bug in this line
        console.log('somthing');
         if (event.reserved > 0) {
           event.reserved--;  // his line works fine
           this.eventService.updateEvent(event, eventId);  // this line works fine too
        }



  }


  ngOnInit() {
  }

}
