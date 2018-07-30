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
import {of} from 'rxjs';

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let mockEventservice;
    let mockAttendService;
    let mockAuthService;
  const  evenements = [
    {id: 'test id', title: 'test event', description: 'test desc', date: 'test date', nbreDePlace: 6, reserved: 4},
    {id: 'sec test id', title: 'sec test event', description: 'sec test desc', date: 'sec test date', nbreDePlace: 5, reserved: 2},


  ];
    const routes: Routes = [];
    beforeEach(async(() => {

      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        providers : [
                    {provide:  EvenmentService, useValue: mockEventservice},
                     {provide:  AttendingService , useValue: mockAttendService},
                    {provide:  AuthenticationService, useValue: mockAuthService}
                   ],
        imports : [RouterTestingModule.withRoutes(routes)],
        schemas: [NO_ERRORS_SCHEMA]


      }).compileComponents();

    }));


    beforeEach(async(() => {

      mockEventservice = jasmine.createSpyObj(['getEvents']);
      mockAuthService = jasmine.createSpyObj(['user$']);
      mockAttendService = jasmine.createSpyObj(['attend', 'UserisAlreadySubscribed']);

      fixture = TestBed.createComponent(HomeComponent);
      mockAttendService = TestBed.get(AttendingService);
      mockAuthService = TestBed.get(AuthenticationService);
      mockEventservice = TestBed.get(EvenmentService);


      component = fixture.componentInstance;
    }));


    it('should be created', () => {

      mockEventservice.getEvents.and.returnValue(of(true));
      fixture.detectChanges();
      mockAuthService.user$.and.returnValue(of(true));
      fixture.detectChanges();
      expect(component).toBeTruthy();


    });



});
  /*let component: HomeComponent;
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
    });


    fixture = TestBed.createComponent(HomeComponent);
    mockAuthService = TestBed.get(AuthenticationService);
    mockEvementService = TestBed.get(EvenmentService);
    mockAttendService = TestBed.get(AttendingService);

    component = fixture.componentInstance;
  });


  it('should create', () => {

  });*/

