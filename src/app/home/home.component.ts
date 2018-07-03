import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: AuthenticationService;
  user ;

  constructor(auth: AuthenticationService) {
    this.auth = auth ;
    this.user = auth.user$.subscribe( (user) => {
    this.user = user;
  });
  }

  ngOnInit() {
  }



}
