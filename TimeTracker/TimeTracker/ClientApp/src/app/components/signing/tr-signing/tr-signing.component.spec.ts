import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrSigningComponent } from './tr-signing.component';

describe('TrSigningComponent', () => {
  let component: TrSigningComponent;
  let fixture: ComponentFixture<TrSigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrSigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
