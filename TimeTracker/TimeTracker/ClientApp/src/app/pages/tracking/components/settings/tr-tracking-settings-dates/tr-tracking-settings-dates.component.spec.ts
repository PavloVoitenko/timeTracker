import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingSettingsDatesComponent } from './tr-tracking-settings-dates.component';

describe('TrTrackingSettingsDatesComponent', () => {
  let component: TrackingSettingsDatesComponent;
  let fixture: ComponentFixture<TrackingSettingsDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingSettingsDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingSettingsDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
