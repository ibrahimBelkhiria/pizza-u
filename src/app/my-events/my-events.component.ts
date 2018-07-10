import { Component, OnInit } from '@angular/core';
import {AttendingService} from '../../providers/attending.service';
import {AuthenticationService} from '../../providers/authentication.service';
import {Evenement} from '../../model/Evenement';
import {EventUser} from '../../model/Event_User';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events: Evenement[];
  events_users: EventUser[];
  constructor(private attendingService: AttendingService, private authService: AuthenticationService) {
    const  uid = this.authService.getCurrentUserId();
           this.events =  this.attendingService.getUserEvents(uid);

  }



  unsubscribe(eventId) {
    this.attendingService.getEventUserId(this.authService.getCurrentUserId(), eventId);
  }


  ngOnInit() {
  }

}
