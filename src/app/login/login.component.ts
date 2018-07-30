import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;
  constructor(private authServ: AuthenticationService) { }

  ngOnInit() {
  }

  // uses the authService and login the user
  login() {
    if (this.email !== '' && this.password !== '') {
   this.authServ.googleLogin(this.email, this.password).then(() => {
     console.log('logged in sucessfully');
   }).catch(err => {console.log(err); });
    }
  }
}
