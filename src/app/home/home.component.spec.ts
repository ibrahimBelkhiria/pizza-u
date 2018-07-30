import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthenticationService} from '../../providers/authentication.service';
import {EvenmentService} from '../../providers/evenment.service';
import {AttendingService} from '../../providers/attending.service';
import {Evenement} from '../../model/Evenement';
import {Roles, User} from '../../model/User';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let mockAuthService;
  let mockEvementService;
  let mockAttendService;
  const routes: Routes = [];
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{provide: AuthenticationService, useValue: mockAuthService},
        {provide: EvenmentService, useValue: mockEvementService},
        {provide: AttendingService , useValue: mockAttendService}

      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule.withRoutes(routes)]
    }).compileComponents();


    fixture = TestBed.createComponent(HomeComponent);
    mockAuthService = TestBed.get(AuthenticationService);
    mockEvementService = TestBed.get(EvenmentService);
    mockAttendService = TestBed.get(AttendingService);

    component = fixture.componentInstance;
  });


  it('should create', () => {

  });
});
