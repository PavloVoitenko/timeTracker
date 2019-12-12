import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingContentComponent } from './tr-tracking-content.component';

describe('TrTrackingContentComponent', () => {
  let component: TrackingContentComponent;
  let fixture: ComponentFixture<TrackingContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
