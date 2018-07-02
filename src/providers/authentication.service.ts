import { Injectable } from '@angular/core';
import {auth} from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../model/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {

    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.currentUser = new User(user);
        console.log(user);
      } else {
        this.currentUser = null;
      }



    });

  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {

      /// console.log(result.additionalUserInfo.profile);

      this.router.navigate(['home']);

    });
  }
  logout() {
    this.afAuth.auth.signOut().then(()  => {
      console.log('logout ');
      this.router.navigate(['']);
    });
  }



}
