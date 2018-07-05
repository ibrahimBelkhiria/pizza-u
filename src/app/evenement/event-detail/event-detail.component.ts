import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Evenement} from '../../../model/Evenement';
import {EvenmentService} from '../../../providers/evenment.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {


  event:  Evenement;
  id: string;
  constructor(private activatedRoute: ActivatedRoute, private eventService: EvenmentService, private router: Router) {
    this.activatedRoute.params.subscribe(params =>  this.id = params['event']  );
    this.eventService.getEvent(this.id).valueChanges().subscribe(value => { console.log(value);
        this.event = value;
      }
    );

  }

  ngOnInit() {
  }

}
