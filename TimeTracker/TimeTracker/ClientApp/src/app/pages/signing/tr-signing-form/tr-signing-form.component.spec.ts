import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrSigningFormComponent } from './tr-signing-form.component';

describe('TrSigningFormComponent', () => {
  let component: TrSigningFormComponent;
  let fixture: ComponentFixture<TrSigningFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrSigningFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrSigningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
