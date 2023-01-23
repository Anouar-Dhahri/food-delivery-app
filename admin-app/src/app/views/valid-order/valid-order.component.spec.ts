import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidOrderComponent } from './valid-order.component';

describe('ValidOrderComponent', () => {
  let component: ValidOrderComponent;
  let fixture: ComponentFixture<ValidOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
