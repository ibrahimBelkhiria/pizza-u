import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthenticationService} from '../../providers/authentication.service';
import {EvenmentService} from '../../providers/evenment.service';
import {AttendingService} from '../../providers/attending.service';
import {Evenement} from '../../model/Evenement';
import {Roles, User} from '../../model/User';
import {NO_ERRORS_SCHEMA} from '@angular/core';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let mockAuthService;
  let mockEvementService;
  let mockAttendService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{provide: AuthenticationService, useValue: mockAuthService},
        {provide: EvenmentService, useValue: mockEvementService},
        {provide: AttendingService , useValue: mockAttendService}

          ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const user: User = {
      uid : '1',
      email : 'ibrahim.belkhiria.info@gmail.com',
      username: 'brahim',
      roles: {}

    };
   const  evenements = [
      {id: 'test id', title: 'test event', description: 'test desc', date: 'test date', nbreDePlace: 6, reserved: 4},
     {id: 'sec test id', title: 'sec test event', description: 'sec test desc', date: 'sec test date', nbreDePlace: 5, reserved: 2},


   ];


    mockAttendService = jasmine.createSpyObj(['attend', 'UserisAlreadySubscribed']);
    mockEvementService = jasmine.createSpyObj(['getEvents']);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.user = user;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
