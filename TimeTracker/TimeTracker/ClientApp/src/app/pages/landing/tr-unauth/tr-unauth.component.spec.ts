import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrUnauthComponent } from './tr-unauth.component';

describe('TrUnauthComponent', () => {
  let component: TrUnauthComponent;
  let fixture: ComponentFixture<TrUnauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrUnauthComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrUnauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
