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

 // get All participants of the event
  getAllParticipants(eventid) {
    // call the service and store the subscription so we can unsubscribe at ngOnDestroy
   this.attendingServSubs =   this.attendService.getAllUsersOfAGivenEvent(eventid).subscribe(value => {
       this.users = value;
       console.log(value);

     } );

  }


  ngOnInit() {
  }

  ngOnDestroy(): void {

    // unsubscribe from the observables
    this.eventServiceSubs.unsubscribe();
    if (this.attendingServSubs != null) {  this.attendingServSubs.unsubscribe(); }

  }

}
