import { Component, OnInit } from '@angular/core';
import {AttendingService} from '../../providers/attending.service';
import {AuthenticationService} from '../../providers/authentication.service';
import {Evenement} from '../../model/Evenement';
import {EventUser} from '../../model/Event_User';
import {EvenmentService} from '../../providers/evenment.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events: Evenement[];
  events_users: EventUser[];
  constructor(private attendingService: AttendingService, private authService: AuthenticationService, private eventService: EvenmentService) {
    const  uid = this.authService.getCurrentUserId();
           this.events =  this.attendingService.getUserEvents(uid);

  }



  unsubscribe(event: Evenement, eventId) {
    this.attendingService.getEventUserId(this.authService.getCurrentUserId(), eventId).subscribe(
      value => {
        this.attendingService.deleteAttendence(value);
        event.reserved--;
        this.eventService.updateEvent(event, eventId);

      }


    );
  }


  ngOnInit() {
  }

}
