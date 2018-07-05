import { Component, OnInit } from '@angular/core';
import {EvenmentService} from '../../../providers/evenment.service';
import {Evenement} from '../../../model/Evenement';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-lis',
  templateUrl: './event-lis.component.html',
  styleUrls: ['./event-lis.component.css']
})
export class EventLisComponent implements OnInit {

  evenement: Evenement[];
  constructor(private eventService: EvenmentService, private router: Router) {
    this.getEvnetList();
  }


  ngOnInit() {
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
    this.eventService.getEvents().subscribe((res) => {
      console.log(res);
      this.evenement = res;
    });

    }


  showEvent(e: Evenement) {
    this.router.navigate(['event-detail', e.id]).catch((error) => {
      console.log(error);
    });
  }
}
