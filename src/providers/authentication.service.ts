import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
import {User} from '../model/User';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthenticationService {

  user$: Observable<User>;
  af: AngularFireAuth;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.af = this.afAuth;
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }



  getCurrentUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

 // return true if the user is authenticated
  get authenticated(): boolean {
   //  console.log(this.afAuth.auth.currentUser == null );
    return this.afAuth.auth.currentUser !== null;
  }

  ///// Login/Signup //////


  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log('user created!');
      this.googleLogin(email, password);
    }).catch((err) => {
      console.log(err);
    });
  }


  googleLogin(email: string, pass: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then((credential) => {
        this.updateUserData(credential.user).then(() => {
          this.router.navigate(['home']);
        });

      });
  }

 /* private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user).then(() => {
          this.router.navigate(['home']);
        });

      });
  }*/

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      console.log('logout');
      this.router.navigate(['']);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      roles: {
        subscriber: true,
        admin: user.email === 'ibrahim.belkhiria.info@gmail.com'
      }
    };
    return userRef.set(data, { merge: true });
  }


  ///// Role-based Authorization //////
  canRead(user: User): boolean {
    const allowed = ['admin', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true;
      }
    }
    return false;
  }

}
