import { TestBed } from '@angular/core/testing';

import { FoodmenuService } from './foodmenu.service';

describe('FoodmenuService', () => {
  let service: FoodmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
