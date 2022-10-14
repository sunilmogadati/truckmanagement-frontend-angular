import { TestBed } from '@angular/core/testing';

import { TruckingService } from './trucking.service';

describe('TruckingService', () => {
  let service: TruckingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
