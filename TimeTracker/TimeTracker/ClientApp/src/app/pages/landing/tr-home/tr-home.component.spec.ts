import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrHomeComponent } from './tr-home.component';

describe('TrHomeComponent', () => {
  let component: TrHomeComponent;
  let fixture: ComponentFixture<TrHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
