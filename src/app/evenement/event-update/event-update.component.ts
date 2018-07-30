import {Component, OnDestroy, OnInit} from '@angular/core';
import {Evenement} from '../../../model/Evenement';
import {ActivatedRoute, Router} from '@angular/router';
import {EvenmentService} from '../../../providers/evenment.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit, OnDestroy {


  event:  Evenement;
  id: string;
  subs: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private eventService: EvenmentService, private router: Router) {
    // get the event_id from the route with the activatedRoute
    this.activatedRoute.params.subscribe(params =>  this.id = params['event']  );
    // subscribe to getEvent method from eht eventService and store the returned value in the event variable
  this.subs =   this.eventService.getEvent(this.id).valueChanges().subscribe(value => { console.log(value);
        this.event = value;
     }
     );

  }
  // return back to the list if you change your mind and decide to not update the event !
  back() {
    this.router.navigate(['/events']);
  }

  // method that will call the service and update the event
  onSubmit() {
    this.eventService.updateEvent(this.event, this.id);
    this.router.navigate(['event-detail', this.id]);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
