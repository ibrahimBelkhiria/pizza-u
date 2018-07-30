import { Component } from '@angular/core';
import {AuthenticationService} from '../providers/authentication.service';
import {AttendingService} from '../providers/attending.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private  attend: AttendingService) {
  }


}
