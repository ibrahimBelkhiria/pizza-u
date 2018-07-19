import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';
import {EvenmentService} from '../../providers/evenment.service';
import {Evenement} from '../../model/Evenement';
import {AttendingService} from '../../providers/attending.service';
import {strictEqual} from 'assert';
import {EventUser} from '../../model/Event_User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: AuthenticationService;
  user ;
  events: Evenement[];
  constructor(auth: AuthenticationService, private eventService: EvenmentService, private attendService: AttendingService, private router: Router) {
    this.auth = auth ;
    this.user = auth.user$.subscribe( (user) => {
    this.user = user;
  });

  }
  detail(e) {
    this.router.navigate(['event-detail', e.id]).catch((error) => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.eventService.getEvents().subscribe((res) => {
      console.log('loaded');
      this.events = res;
    }, (error1 => console.log(error1)));

  }


  already(event: Evenement) {
     const  uid = this.auth.getCurrentUserId();
     // console.log(' subscribed: ' , this.attendService.UserisAlreadySubscribed(event.id, uid));
    return this.attendService.UserisAlreadySubscribed(event.id, uid);
  }


  attend(event: Evenement) {
         const  uid = this.auth.getCurrentUserId();

          const eventUser: EventUser = {
            user_id: uid,
            event_id : event.id

          };


          // this.attendService.UserisAlreadySubscribed(event.id, uid);
        //  console.log(this.attendService.UserisAlreadySubscribed(event.id, uid));
        this.attendService.attend(event, eventUser);

  }
}
