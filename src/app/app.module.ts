import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AuthenticationService} from '../providers/authentication.service';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Route, RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AdminComponent } from './admin/admin.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';



const config = {
  apiKey: 'AIzaSyBl1CSb1CPwhTJxEIkTIROgBKRxIqRkp84',
  authDomain: 'proxym-u.firebaseapp.com',
  databaseURL: 'https://proxym-u.firebaseio.com',
  projectId: 'proxym-u',
  storageBucket: 'proxym-u.appspot.com',
  messagingSenderId: '1024337528763'
};


const appRoutes: Routes = [
  {path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]}

  ];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFirestoreModule
  ],
  providers: [AuthenticationService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
