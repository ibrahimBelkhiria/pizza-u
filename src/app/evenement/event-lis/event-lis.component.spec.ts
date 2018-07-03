import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLisComponent } from './event-lis.component';

describe('EventLisComponent', () => {
  let component: EventLisComponent;
  let fixture: ComponentFixture<EventLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
