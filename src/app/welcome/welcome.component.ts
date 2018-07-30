import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../providers/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    user;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.auth.user$.subscribe(user => {
      //  console.log(user);
      this.user = user;
    });


  }

  // redirects to  the home page if the user is authenticated or the login page otherwise
  goHome() {
      console.log(this.user == null);
     // redirect to login page if the user is not login
    if (this.user == null) {
          this.router.navigate(['login']);
    } else {
      this.router.navigate(['home']);
    }

  }



  ngOnInit() {
  }

}
