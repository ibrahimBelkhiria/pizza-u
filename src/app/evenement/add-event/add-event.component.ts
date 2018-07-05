import { Component, OnInit } from '@angular/core';
import {EvenmentService} from '../../../providers/evenment.service';
import {Evenement} from '../../../model/Evenement';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {



  event: Evenement = {
      title: '',
      description: '',
      date : '',
      nbreDePlace: 0,
      reserved : 0
  };

  constructor(private evnetService: EvenmentService) { }

  ngOnInit() {
  }
  onSubmit() {

    console.log(this.event);
    this.evnetService.addEvent(this.event);

  }

}
