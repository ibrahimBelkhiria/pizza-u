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
export class EventLisComponent  implements  OnInit {

    subscription: Subscription;
    @Input() evenement: Evenement[];
  constructor(private eventService: EvenmentService, private router: Router) {
    console.log('constructor log before  ' + this.evenement);

    console.log('constructor log after  ' + this.evenement);
  }



    updateEvent(e: Evenement) {
        console.log(e);
        this.router.navigate(['event-update', e.id]).catch((error) => {
          console.log(error);
        });
    }

    deleteEvent(e: Evenement) {
        if (confirm('are you sure ?')) {
             this.eventService.deleteEvent(e);
        }

    }

    getEvnetList() {


    }


  showEvent(e: Evenement) {
    this.router.navigate(['event-detail', e.id]).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {

  }



  /*ngOnDestroy() {
/!*
    this.subscription.unsubscribe();
*!/
  }*/
}
