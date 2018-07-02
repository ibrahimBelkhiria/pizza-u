import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  auth: AuthenticationService;
  constructor(auth: AuthenticationService) {
     this.auth = auth;

  }



  doLogout(): void {
    this.auth.logout();
  }

  doLogin(): void {
    this.auth.login();
    // console.log(this.auth.currentUser);
  }


  ngOnInit() {
  }

}
