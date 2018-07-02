import { Component } from '@angular/core';
import {AuthenticationService} from '../providers/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {




  constructor() {
  }

/*
  doLogin(): void {
    this.auth.login();
    console.log(this.auth.currentUser);
  }

  doLogout(): void {
    this.auth.logout();
  }*/


}
