import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Evenement} from '../../../model/Evenement';
import {EvenmentService} from '../../../providers/evenment.service';
import {AttendingService} from '../../../providers/attending.service';
import {User} from '../../../model/User';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  users: User[] ;
  event:  Evenement;
  id: string;
  constructor(private activatedRoute: ActivatedRoute, private eventService: EvenmentService, private router: Router,
              private attendService: AttendingService) {
    this.activatedRoute.params.subscribe(params =>  this.id = params['event']  );
    this.eventService.getEvent(this.id).valueChanges().subscribe(value => { console.log(value);
        this.event = value;
      }
    );

  }


  getAllParticipants(eventid) {

     this.attendService.getAllUsersOfAGivenEvent(eventid).subscribe(value => {

      /* value.subscribe(value1 => console.log(value1));*/
       this.users = value;
       console.log(value);

     } );
    //  console.log(this.users);
  }


  ngOnInit() {
  }

}
