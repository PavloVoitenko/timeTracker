import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrAuthComponent } from './tr-auth.component';

describe('TrAuthComponent', () => {
  let component: TrAuthComponent;
  let fixture: ComponentFixture<TrAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
