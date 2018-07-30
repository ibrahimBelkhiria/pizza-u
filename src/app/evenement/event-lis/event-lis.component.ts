import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EvenmentService} from '../../../providers/evenment.service';
import {Evenement} from '../../../model/Evenement';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-event-lis',
  templateUrl: './event-lis.component.html',
  styleUrls: ['./event-lis.component.css']
})
// this component receives the list of events from his parent EvenementComponent and display it
export class EventLisComponent  implements  OnInit, OnDestroy {

    subscription: Subscription;
    // takes the events as a n iput from the parent component wich is EvenementComponent
    @Input() evenement: Evenement[];
  constructor(private eventService: EvenmentService, private router: Router) {
  }



     // takes us to update event page to update the selected event
    updateEvent(e: Evenement) {
        console.log(e);
        this.router.navigate(['event-update', e.id]).catch((error) => {
          console.log(error);
        });
    }

    // delete the selected event
    deleteEvent(e: Evenement) {
        if (confirm('are you sure ?')) {
             this.eventService.deleteEvent(e);
        }

    }

    getEvnetList() {


    }

// takes you to the event-detail page
  showEvent(e: Evenement) {
    this.router.navigate(['event-detail', e.id]).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {

  }



  ngOnDestroy() {
/*
    this.evenement = [];
*/
  }
}
