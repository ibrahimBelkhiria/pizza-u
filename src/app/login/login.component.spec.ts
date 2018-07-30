import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthenticationService} from '../../providers/authentication.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthServ;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers : [{provide: AuthenticationService, useValue: mockAuthServ }],
      imports : [FormsModule],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockAuthServ = jasmine.createSpyObj(['googleLogin']);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockAuthServ = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login test', () => {
    component.login();
    const email = 'ibrahim@gmail.com';
    const pass = '123';

    mockAuthServ.googleLogin.and.returnValue();
    expect(mockAuthServ.googleLogin(email, pass)).toHaveBeenCalledWith(email, pass);



  });


});
