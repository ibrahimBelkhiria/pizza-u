import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: AuthenticationService;
  username ;

  constructor(auth: AuthenticationService) {
    this.auth = auth ;
    console.log(this.auth.currentUser);
    this.username = this.auth.currentUser.displayName;
  }

  ngOnInit() {
  }



}
