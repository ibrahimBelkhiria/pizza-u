import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';
import {EvenmentService} from '../../providers/evenment.service';
import {Evenement} from '../../model/Evenement';
import {AttendingService} from '../../providers/attending.service';
import {strictEqual} from 'assert';
import {EventUser} from '../../model/Event_User';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  auth: AuthenticationService;
  user ;
  events: Evenement[];
  subscription: Subscription;

    day = new Date().getDate();
    month = new  Date().getUTCMonth() + 1;
    year = new Date().getFullYear();

  constructor(auth: AuthenticationService, private eventService: EvenmentService, private attendService: AttendingService,
              private router: Router) {
    this.auth = auth ;
    this.user = auth.user$.subscribe( (user) => {
    this.user = user;

  });

    this.subscription =   this.eventService.getEvents().subscribe((res) => {
      console.log(res);
      this.events = res;
    }, (error1 => console.log(error1)));

  }

 // this mehtod returns false if the event date not available and true otherwise
  compareDates(day, month, year): boolean {

    if (year < this.year) {
      return false;
    } else if (this.year === year && this.month < month) {
      return false;
    } else if ( this.year === year && this.month === month && this.day < day ) {
      return false;
    } else {
      return true;
    }

  }


  detail(e) {
    this.router.navigate(['event-detail', e.id]).catch((error) => {
      console.log(error);
    });
  }
  ngOnInit() {

     // this.events = [];


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

  ngOnDestroy(): void {

   this.subscription.unsubscribe();

  }

}
