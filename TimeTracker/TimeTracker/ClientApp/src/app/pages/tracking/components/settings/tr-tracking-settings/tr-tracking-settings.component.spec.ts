import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrTrackingSettingsComponent } from './tr-tracking-settings.component';

describe('TrTrackingSettingsComponent', () => {
  let component: TrTrackingSettingsComponent;
  let fixture: ComponentFixture<TrTrackingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrTrackingSettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrTrackingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
