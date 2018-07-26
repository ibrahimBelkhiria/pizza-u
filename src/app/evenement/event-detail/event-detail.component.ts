import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Evenement} from '../../../model/Evenement';
import {EvenmentService} from '../../../providers/evenment.service';
import {AttendingService} from '../../../providers/attending.service';
import {User} from '../../../model/User';
import {Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  users: User[] ;
  event:  Evenement;
  id: string;
  eventServiceSubs: Subscription;
  attendingServSubs: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private eventService: EvenmentService, private router: Router,
              private attendService: AttendingService) {
    this.activatedRoute.params.subscribe(params =>  this.id = params['event']  );

  this.eventServiceSubs =  this.eventService.getEvent(this.id).valueChanges().subscribe(value => { console.log(value);
        this.event = value;
      }
    );


  }


  getAllParticipants(eventid) {

   this.attendingServSubs =   this.attendService.getAllUsersOfAGivenEvent(eventid).subscribe(value => {

      /* value.subscribe(value1 => console.log(value1));*/
       this.users = value;
       console.log(value);

     } );
    //  console.log(this.users);
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.eventServiceSubs.unsubscribe();
    if (this.attendingServSubs != null) {  this.attendingServSubs.unsubscribe(); }

  }

}
