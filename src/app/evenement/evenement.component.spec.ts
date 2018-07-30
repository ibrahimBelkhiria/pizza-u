import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementComponent } from './evenement.component';
import {EvenmentService} from '../../providers/evenment.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';

describe('EvenementComponent', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;
  let eventService;
  beforeEach(async(() => {
    eventService = jasmine.createSpyObj(['getEvents']);
    TestBed.configureTestingModule({
      declarations: [ EvenementComponent ],
      providers : [ {provide: EvenmentService, useValue: eventService} ],
      schemas : [NO_ERRORS_SCHEMA]
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementComponent);
    component = fixture.componentInstance;
    eventService = TestBed.get(EvenmentService);
    fixture.detectChanges();
  });

  it('should create', () => {
       eventService.getEvents.and.returnValue(of(true));
       expect(component).toBeTruthy();
  });
});
