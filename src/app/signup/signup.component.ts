import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  constructor(private authServ: AuthenticationService) { }


  ngOnInit() {
  }
  login() {
    this.authServ.signUp(this.email, this.password).then(() => {
      console.log('signed up  sucessfully');
    });
  }

}
