import { TestBed } from '@angular/core/testing';

import { PersonService } from './estacion.service';

describe('EstacionService', () => {
  let service: EstacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
