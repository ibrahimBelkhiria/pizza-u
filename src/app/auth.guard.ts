import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../providers/authentication.service';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
// this is a guard for the routes that are accessible to only authenticated users
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return  this.authService.af.authState.map(auth => {
            if (isNullOrUndefined(auth)) {
              this.router.navigate(['login']);
              return false;
            } else {
              return true;
            }

      });






    /*if (this.authService.authenticated) {     return true; }

    console.log(this.authService.authenticated);
    console.log('acces denied');
     // this.router.navigate(['login']);
    return false;
*/

  }
}
