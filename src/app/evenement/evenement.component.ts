import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventLisComponent} from './event-lis/event-lis.component';
import {EvenmentService} from '../../providers/evenment.service';
import {Evenement} from '../../model/Evenement';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit, OnDestroy {
  evenement: Evenement[];
  subscription: Subscription;

  constructor(private eventService:  EvenmentService) {

    this.subscription =   this.eventService.getEvents().subscribe((res) => {
      console.log(res);
      this.evenement = res;

    });

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();


  }

}
