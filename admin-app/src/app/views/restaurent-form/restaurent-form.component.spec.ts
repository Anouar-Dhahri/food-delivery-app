import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentFormComponent } from './restaurent-form.component';

describe('RestaurentFormComponent', () => {
  let component: RestaurentFormComponent;
  let fixture: ComponentFixture<RestaurentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
