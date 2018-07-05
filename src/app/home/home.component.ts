import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';
import {EvenmentService} from '../../providers/evenment.service';
import {Evenement} from '../../model/Evenement';
import {AttendingService} from '../../providers/attending.service';
import {strictEqual} from 'assert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: AuthenticationService;
  user ;
  events: Evenement[];
  constructor(auth: AuthenticationService, private eventService: EvenmentService, private attendService: AttendingService) {
    this.auth = auth ;
    this.user = auth.user$.subscribe( (user) => {
    this.user = user;
  });

  }

  ngOnInit() {
    this.eventService.getEvents().subscribe((res) => {
      console.log('loaded');
      this.events = res;
    }, (error1 => console.log(error1)));

  }

  attend(event: Evenement) {
         const  uid = this.auth.getCurrentUserId();
         this.attendService.attend(event, uid);

  }
}
