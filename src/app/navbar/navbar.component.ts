import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  auth: AuthenticationService;
  user;
  constructor(auth: AuthenticationService) {
     this.auth = auth;

     this.auth.user$.subscribe(user => {
       console.log(user);
       this.user = user;
     });


  }



  doLogout(): void {
    this.auth.signOut();
  }

  doLogin(): void {
    this.auth.googleLogin();
    // console.log(this.auth.currentUser);
  }


  ngOnInit() {
  }

}
