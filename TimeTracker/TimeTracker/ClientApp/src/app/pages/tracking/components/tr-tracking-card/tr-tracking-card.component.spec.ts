import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCardComponent } from './tr-tracking-card.component';

describe('TrTrackingCardComponent', () => {
  let component: TrackingCardComponent;
  let fixture: ComponentFixture<TrackingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
