import { Component, OnInit } from '@angular/core';
import {Evenement} from '../../../model/Evenement';
import {ActivatedRoute, Router} from '@angular/router';
import {EvenmentService} from '../../../providers/evenment.service';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {


  event:  Evenement;
  id: string;
  constructor(private activatedRoute: ActivatedRoute, private eventService: EvenmentService, private router: Router) {
    this.activatedRoute.params.subscribe(params =>  this.id = params['event']  );
     this.eventService.getEvent(this.id).valueChanges().subscribe(value => { console.log(value);
        this.event = value;
     }
     );

  }
  back() {
    this.router.navigate(['/events']);
  }

  onSubmit() {
    this.eventService.updateEvent(this.event, this.id);
    this.router.navigate(['/events']);
  }

  ngOnInit() {
  }




}
