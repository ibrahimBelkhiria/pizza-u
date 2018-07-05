import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  auth: AuthenticationService;
  user;
  constructor(auth: AuthenticationService, private router: Router) {
     this.auth = auth;

     this.auth.user$.subscribe(user => {
     //  console.log(user);
       this.user = user;
     });


  }



  doLogout(): void {
    this.auth.signOut();
  }

  doLogin(): void {
    this.router.navigate(['login']);
    // console.log(this.auth.currentUser);
  }


  ngOnInit() {
  }

}
