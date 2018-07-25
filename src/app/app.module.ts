import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AuthenticationService} from '../providers/authentication.service';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {Route, RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AdminComponent } from './admin/admin.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import { EvenementComponent } from './evenement/evenement.component';
import {FormsModule} from '@angular/forms';
import {EvenmentService} from '../providers/evenment.service';
import { AddEventComponent } from './evenement/add-event/add-event.component';
import { EventLisComponent } from './evenement/event-lis/event-lis.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EventUpdateComponent } from './evenement/event-update/event-update.component';
import { EventDetailComponent } from './evenement/event-detail/event-detail.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {AttendingService} from '../providers/attending.service';


const config = {
  apiKey: 'AIzaSyBl1CSb1CPwhTJxEIkTIROgBKRxIqRkp84',
  authDomain: 'proxym-u.firebaseapp.com',
  databaseURL: 'https://proxym-u.firebaseio.com',
  projectId: 'proxym-u',
  storageBucket: 'proxym-u.appspot.com',
  messagingSenderId: '1024337528763'
};

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'my-events', component: MyEventsComponent},
  {path: 'event-detail/:event', component: EventDetailComponent, canActivate: [AuthGuard] },
  {path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'events', component: EvenementComponent, canActivate: [AdminGuard] },
  {path: 'event-update/:event', component: EventUpdateComponent, canActivate: [AdminGuard] }


  ];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent,
    EvenementComponent,
    AddEventComponent,
    EventLisComponent,
    LoginComponent,
    SignupComponent,
    EventUpdateComponent,
    EventDetailComponent,
    MyEventsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthenticationService, AdminGuard, EvenmentService, AttendingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
