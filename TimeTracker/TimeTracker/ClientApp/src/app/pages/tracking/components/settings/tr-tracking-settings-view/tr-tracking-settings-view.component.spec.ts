import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingSettingsViewComponent } from './tr-tracking-settings-view.component';

describe('TrTrackingSettingsViewComponent', () => {
  let component: TrackingSettingsViewComponent;
  let fixture: ComponentFixture<TrackingSettingsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingSettingsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
