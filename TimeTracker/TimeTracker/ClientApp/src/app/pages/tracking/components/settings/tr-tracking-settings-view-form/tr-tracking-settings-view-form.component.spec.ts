import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingSettingsViewFormComponent } from './tr-tracking-settings-view-form.component';

describe('TrTrackingSettingsViewFormComponent', () => {
  let component: TrackingSettingsViewFormComponent;
  let fixture: ComponentFixture<TrackingSettingsViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingSettingsViewFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingSettingsViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
